---
title: Verify Signed Executables in .NET
slug: verify-signed-executables-in-dotnet
published: 2019-08-24T22:00:00+12:00

toc: true

tags: [ "dev",]
---

When distributing executable setup files for your Windows application, it's a great idea to use code signing so that the user knows it's from you - via a UAC alert they can see you or your organisation's name as a verified publisher.

![Windows user account control popup displaying the verified publisher of the notepad program as Microsoft Windows](https://assets.crookm.com/media/2019/verify-signed-executables-in-dotnet--c4177d33-c00c-4104-bcfd-46da6bdc22cb.png)

But if your application implements an automatic update feature to keep things fresh in the backend, the execution of the setup file needs to be done silently so the user isn't bothered. So how do you verify your signed executable programatically?

This can be accomplished through [P/Invoke of the wintrust library](https://www.pinvoke.net/default.aspx/wintrust.winverifytrust), standard with Windows - which is a lot more trustworthy than some random library from NuGet. The drawback to this is that you have to include a wrapper in your code to access it, and you also have to make use of a lot of enums to keep the system calls and responses human-readable.

Just a sidenote on P/Invoke: this is accessible in .NET Framework as well as .NET Core, but since we are making a call to Windows-specific system libraries here, it's only usable on Windows.

# The code
The structure I like to follow is to have the main wrapper in one file, and then the internal enums and other helpers in another file.

All of this code is available on [GitHub](https://github.com/crookm/sigverify), if you would rather peruse that.

## Enums and Helpers
This is how I have my `WinTrustHelper.cs` setup:

```cs
using System;
using System.Runtime.InteropServices;

namespace sigverify
{
    #region internal enums
    internal enum WinTrustDataUIChoice : uint
    {
        All = 1,
        None = 2,
        NoBad = 3,
        NoGood = 4
    }

    internal enum WinTrustDataChoice : uint
    {
        File = 1,
        Catalog = 2,
        Blob = 3,
        Signer = 4,
        Certificate = 5
    }

    internal enum WinTrustDataStateAction : uint
    {
        Ignore = 0x00000000,
        Verify = 0x00000001,
        Close = 0x00000002,
        AutoCache = 0x00000003,
        AutoCacheFlush = 0x00000004
    }

    [FlagsAttribute]
    internal enum WinTrustDataProvFlags : uint
    {
        UseIe4TrustFlag = 0x00000001,
        NoIe4ChainFlag = 0x00000002,
        NoPolicyUsageFlag = 0x00000004,
        RevocationCheckNone = 0x00000010,
        RevocationCheckEndCert = 0x00000020,
        RevocationCheckChain = 0x00000040,
        RevocationCheckChainExcludeRoot = 0x00000080,
        SaferFlag = 0x00000100,
        HashOnlyFlag = 0x00000200,
        UseDefaultOsverCheck = 0x00000400,
        LifetimeSigningFlag = 0x00000800,
        CacheOnlyUrlRetrieval = 0x00001000 // affects CRL retrieval and AIA retrieval
    }

    internal enum WinTrustDataUIContext : uint
    {
        Execute = 0,
        Install = 1
    }
    #endregion

    #region helpers
    [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
    class WinTrustFileInfo
    {
        uint structSize = (uint)Marshal.SizeOf(typeof(WinTrustFileInfo));
        IntPtr pszFilePath; // required, file name to be verified
        IntPtr hFile = IntPtr.Zero; // optional, open handle to FilePath
        IntPtr pgKnownSubject = IntPtr.Zero; // optional, subject type if it is known

        public WinTrustFileInfo(String _filePath)
        {
            pszFilePath = Marshal.StringToCoTaskMemAuto(_filePath);
        }

        ~WinTrustFileInfo()
        {
            Marshal.FreeCoTaskMem(pszFilePath);
        }
    }

    [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
    class WinTrustData
    {
        uint structSize = (uint)Marshal.SizeOf(typeof(WinTrustData));
        IntPtr policyCallbackData = IntPtr.Zero;
        IntPtr sIPClientData = IntPtr.Zero;

        // required opts
        WinTrustDataUIChoice uIChoice = WinTrustDataUIChoice.None;
        WinTrustDataRevocationChecks revocationChecks = WinTrustDataRevocationChecks.WholeChain;
        WinTrustDataChoice unionChoice = WinTrustDataChoice.File; // structure being passed in

        // individual file
        IntPtr fileInfoPtr;
        WinTrustDataStateAction stateAction = WinTrustDataStateAction.Ignore;
        IntPtr stateData = IntPtr.Zero;
        string uRLReference;
        WinTrustDataProvFlags provFlags = WinTrustDataProvFlags.SaferFlag;
        WinTrustDataUIContext uIContext = WinTrustDataUIContext.Execute;

        // constructor for silent WinTrustDataChoice.File check
        public WinTrustData(String _fileName, WinTrustDataRevocationChecks revocationChecks)
        {
            this.revocationChecks = revocationChecks;
            WinTrustFileInfo wtfiData = new WinTrustFileInfo(_fileName);
            fileInfoPtr = Marshal.AllocCoTaskMem(Marshal.SizeOf(typeof(WinTrustFileInfo)));
            Marshal.StructureToPtr(wtfiData, fileInfoPtr, false);
        }

        ~WinTrustData()
        {
            Marshal.FreeCoTaskMem(fileInfoPtr);
        }
    }
    #endregion
}
```

## Main Wrapper
This is the part that you would call when you actually want to verify a signed executable. Here's how my `WinTrust.cs` file is set up:

```cs
using System;
using System.Runtime.InteropServices;

namespace sigverify
{
    public enum WinTrustDataRevocationChecks : uint
    {
        None = 0x00000000,
        WholeChain = 0x00000001
    }

    public enum WinVerifyTrustResult : uint
    {
        Success = 0,
        ProviderUnknown = 0x800b0001, // Trust provider is not recognized on this system
        ActionUnknown = 0x800b0002, // Trust provider does not support the specified action
        SubjectFormUnknown = 0x800b0003, // Trust provider does not support the form specified for the subject
        SubjectNotTrusted = 0x800b0004, // Subject failed the specified verification action
        FileNotSigned = 0x800B0100, // TRUST_E_NOSIGNATURE - File was not signed
        SubjectExplicitlyDistrusted = 0x800B0111, // Signer's certificate is in the Untrusted Publishers store
        SignatureOrFileCorrupt = 0x80096010, // TRUST_E_BAD_DIGEST - file was probably corrupt
        SubjectCertExpired = 0x800B0101, // CERT_E_EXPIRED - Signer's certificate was expired
        SubjectCertificateRevoked = 0x800B010C, // CERT_E_REVOKED Subject's certificate was revoked
        UntrustedRoot = 0x800B0109 // CERT_E_UNTRUSTEDROOT - A certification chain processed correctly but terminated in a root certificate that is not trusted by the trust provider.
    }

    public sealed class WinTrust
    {
        private static readonly IntPtr INVALID_HANDLE_VALUE = new IntPtr(-1);

        // guid of the action to perform
        public static readonly Guid DRIVER_ACTION_VERIFY = new Guid("{F750E6C3-38EE-11d1-85E5-00C04FC295EE}");
        public static readonly Guid HTTPSPROV_ACTION = new Guid("{573E31F8-AABA-11d0-8CCB-00C04FC295EE}");
        public static readonly Guid OFFICESIGN_ACTION_VERIFY = new Guid("{5555C2CD-17FB-11d1-85C4-00C04FC295EE}");
        public static readonly Guid WINTRUST_ACTION_GENERIC_CERT_VERIFY = new Guid("{189A3842-3041-11d1-85E1-00C04FC295EE}");
        public static readonly Guid WINTRUST_ACTION_GENERIC_CHAIN_VERIFY = new Guid("{fc451c16-ac75-11d1-b4b8-00c04fb66ea0}");
        public static readonly Guid WINTRUST_ACTION_GENERIC_VERIFY_V2 = new Guid("{00AAC56B-CD44-11d0-8CC2-00C04FC295EE}");
        public static readonly Guid WINTRUST_ACTION_TRUSTPROVIDER_TEST = new Guid("{573E31F8-DDBA-11d0-8CCB-00C04FC295EE}");

        [DllImport("wintrust.dll", ExactSpelling = true, SetLastError = false, CharSet = CharSet.Unicode)]
        static extern WinVerifyTrustResult WinVerifyTrust(
            [In] IntPtr hwnd,
            [In] [MarshalAs(UnmanagedType.LPStruct)] Guid pgActionID,
            [In] WinTrustData pWVTData
        );

        // Verify embedded file signature
        // - fileName must be the absolute path
        // - guidAction is usually WinTrust.WINTRUST_ACTION_GENERIC_VERIFY_V2
        // - revocationChecks is usually WinTrustDataRevocationChecks.WholeChain
        //
        // - returns WinVerifyTrustResult
        public static WinVerifyTrustResult VerifyEmbeddedSignature(string fileName, Guid guidAction, WinTrustDataRevocationChecks revocationChecks)
        {
            WinTrustData data = new WinTrustData(fileName, revocationChecks);
            return WinVerifyTrust(INVALID_HANDLE_VALUE, guidAction, data);
        }

        private WinTrust() { }
    }
}
```

## Usage
After your wrapper is set up, you can simply pass an absolute path to the file, the desired wintrust action, and whether or not you want to check for revocations, to the `WinTrust.VerifyEmbeddedSignature` method:

```cs
var filePath = Path.GetFullPath("example.exe");
if (File.Exists(inputFile)) {
    var winTrustRes = WinTrust.VerifyEmbeddedSignature(
        inputFile,
        WinTrust.WINTRUST_ACTION_GENERIC_VERIFY_V2,
        WinTrustDataRevocationChecks.WholeChain);
    
    if (!winTrustRes.Equals(WinTrustRes.Success))
        Console.WriteLine($"Sig NOT trusted: {winTrustRes}");
    else
        Console.WriteLine("Sig is trusted!");
}
```

### Additional Verification
It doesn't have to stop there! The above will tell you that the executable was *signed*, but not by *who*. You can do that after the signature is verified as trusted with the following:

```cs
var cert = X509Certificate.CreateFromSignedFile(inputFile);
if (!cert.Subject.Contains("O=My Organisation"))
    Console.WriteLine("Certificate is NOT owned by My Organisation!!!");
else
    Console.WriteLine("Certificate is owned by My Organisation.");
```