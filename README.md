# Load More

Adds AJAX support to long, paginated lists as a replacement for standard URL-based pagination.

This assumes you have an existing back-end pagination approach, such as WordPress' built-in pagination.

## Usage

```js
var ScrollIn = require('load-more');
new LoadMore({
  container: '[data-load-more]',
  button: '[data-load-more-button]',
  link: 'a.next-page',
  remove: '.pagination, .load-more'
});
```

## Options

### container
Type: 'String'
Default: '[data-load-more]'

Selector for the element containing the list to be paginated.

### button
Type: 'String'
Default: '[data-load-more-button]'

Selector for the "load more" button element. Should be present in the load-more container on all pages but the last.

### link
Type: 'String'
Default: '[data-load-more-link]'

Selector for the anchor element to the next page. This element's href will be used to fetch the next page using AJAX.

### remove
Type: 'String'
Default: ''

Elements within the load more container that should be removed before adding new content (e.g. pagination & load more controls for the previous page).