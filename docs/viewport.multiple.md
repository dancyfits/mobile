The viewport controls how your webpage is rendered on mobile devices. If no viewport is specified mobile devices will try to render with typical desktop width for compatibility which breaks user experience.

To avoid problems with screen sizes it's not recommended to specify explicit widths for the viewport, rather use relative sizes such as percentage.

When checking for the viewport we expect to see the following:

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

And not:

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="viewport" content="width=320">
```

# How do I fix this ?

To target various screen sizes it is recommended to use the code above. While using the meta tag, `@viewport` is being added to the CSS standard as part of the CSS Device Adaption specification. While `@viewport` is being finalized and support may vary, it is recommended to use both methods.

The following terms should be noted:

**Initial viewport**

>This refers to the viewport before any UA (User Agent) or author styles have overridden the viewport given by the window or viewing area of the UA. Note that the initial viewport size will change with the size of the window or viewing area.


**Actual viewport**

>This is the viewport you get after the cascaded viewport descriptors, and the following constraining procedure have been applied.

Procedure for applying CSS rules:

1. Cascade all `@viewport` rules using the initial viewport size for values and evaluations which rely on viewport size
2. Compute the actual viewport from the cascaded viewport descriptors
3. Cascade all other rules using the actual viewport size

You would be adding the following to your CSS files:

```css
@viewport {
    width: auto;
}
```
Or
```css
/*The green color should be applied to a div because the initial viewport
width is used to evaluate the media query for the second @viewport rule,
but the actual viewport is used for evaluating the media query when applying style
rules.*/

@viewport {
    width: 397px;
}

@media screen and (width: 397px) {
    @viewport {
        width: 500px;
    }
}

@media screen and (width: 397px) {
    div { color: green; }
}
```

# Resources

* [CSS Device Adaptation Module Level 1](https://drafts.csswg.org/css-device-adapt/#intro)
* [Thinking Ahead: CSS Device Adaptation With @viewport](http://blog.teamtreehouse.com/thinking-ahead-css-device-adaptation-with-viewport)
* [Using the viewport meta tag to control layout on mobile browsers](https://developer.mozilla.org/en/docs/Mozilla/Mobile/Viewport_meta_tag)
* [Configure the Viewport](https://developers.google.com/speed/docs/insights/ConfigureViewport?hl=en)
