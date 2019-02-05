---
title: "Keyboard Input in VR"
published: 2019-02-05T20:37:11+13:00

image: https://crookm.ams3.cdn.digitaloceanspaces.com/media/2019/keyboard-input-in-vr--3a712a06-acda-4604-989d-22c3e448966b.jpg

tags: [ "xr", "dev", "csharp",]
---

It's unusually difficult to get text input in a virtual reality application using Unity, but there are a few tools that make it easier.

One of these tools is the [Mixed Reality Toolkit for Unity](https://github.com/Microsoft/MixedRealityToolkit-Unity) by Microsoft. This SDK is great for working with the Windows Mixed Reality, which I do.

If this is the extent of your toolset, then all you need to do is pop the Keyboard playfab (located: `Assets/HoloToolkit/UX/Prefabs/Keyboard.prefab`) into the hierarchy and summon the keyboard when you click an InputField like so:

```csharp
private void Update()
{
    if (!keyboardIsActive)
    {
        if (someInput.isFocused)
        {
            keyboardIsActive = true;
            
            // update the text input field
            Keyboard.Instance.OnTextUpdated += HandleUpdate;
        }
    }
    else Keyboard.Instance.PresentKeyboard();
}

private void HandleUpdate(string text)
{
    if (!string.IsNullOrEmpty(text))
        someInput.text = text;
}
```

Should you also be using the VRTK, you will need to modify the keyboard prefab with a `VRTK_UICanvas` component. This will prevent the laser pointer from going directly through the keyboard.

You can then use the InputField as you would normally:

```csharp
someInput.onEndEdit.AddListener((string text) =>
{
    string myResult = text; // 🔥 do what you want with the result!
    
    keyboardIsActive = false; // reset the state
    
    // remove event handler before close to prevent blanking the InputField
    Keyboard.Instance.OnTextUpdated -= HandleUpdate;
    Keyboard.Instance.Close(); // close the keyboard
});
```

*Header image:* <a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@fantasyflip?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Philipp Katzenberger"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span><span style="display:inline-block;padding:2px 3px">Philipp Katzenberger</span></a>
