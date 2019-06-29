---
title: "Keyboard Input in VR"
published: 2019-02-05T20:37:11+13:00

tags: [ "xr", "dev",]
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
