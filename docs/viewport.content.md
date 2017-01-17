The viewport controls how your webpage is rendered on mobile devices. If no viewport is specified mobile devices will try to render with typical desktop width for compatibility which breaks user experience.

To avoid problems with screen sizes it's not recommended to specify explicit widths for the viewport, rather use relative sizes such as percentage.

When checking for the viewport we expect to see the following:

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

in the `<head>` of your page. This will render pages optimised to display well on mobile devices with the full width of the device viewport.

# How do I fix this ?

Fixed by ensuring that the expected viewport is supplied to render optimised pages correctly on mobile devices.

# Resources

* [Google Pagespeed Insights](https://developers.google.com/speed/docs/insights/ConfigureViewport?hl=en)
