The viewport controls how your webpage is rendered on mobile devices. If no viewport is specified mobile devices will try to render with typical desktop width for compatibility which breaks user experience.

To avoid problems with screen sizes it's not recommended to specify explicit widths for the viewport, rather use relative sizes such as percentage.

When checking for the viewport we expect to see the following:

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

in the `<head>` of your page. This will render pages optimised to display well on mobile devices with the full width of the device viewport.

The viewport detected on the page was empty, which could cause unexpected behaviour as various devices and browsers default to their own settings.

# How do I fix this ?

Fixed by ensuring that the expected viewport is supplied to render optimised pages correctly on mobile devices.

# Accessibility

For accessibility avoid using `minimum-scale`, `maximum-scale` and `user-scalable` as this may restrict people from viewing your site.

# Resources

* [Google Pagespeed Insights](https://developers.google.com/speed/docs/insights/ConfigureViewport?hl=en)
* [Configure the Viewport](https://varvy.com/mobile/configure-viewport.html)
