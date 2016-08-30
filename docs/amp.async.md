The [AMP](https://www.ampproject.org/) project from Google allows content based websites such as News sites to be loaded almost instantly using caching servers from Google.

This new standard opens up the possiblity for providers such as Google to list the websites in a carousal (amongst other features) and integrate more deeply in their services.

The script tag include on the page to load the [AMP](https://www.ampproject.org/) library does not have the `async` tag configured which is a requirement from the project, see (AMP Validation Errors)[https://www.ampproject.org/docs/reference/validation_errors.html#mandatory-tag-missing]

# How do I fix this ?

The script tag to load the library must present like the following, take note of the `async` tag:

```
<script async src="https://cdn.ampproject.org/v0.js"></script>
```

Find and ensure that the tag on the page given contains a `async` attribute.

# Resources

* (AMP Validation Errors)[https://www.ampproject.org/docs/reference/validation_errors.html#mandatory-tag-missing]