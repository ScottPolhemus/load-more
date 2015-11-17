# Load More

Adds AJAX support to long, paginated lists as a replacement for standard URL-based pagination.

This assumes you have an existing back-end pagination approach, such as WordPress' built-in pagination.

## Usage

```html
<div class="articles" data-load-more>
  <article>Item #1</article>
  <article>Item #2</article>
  <article>Item #3</article>
  <article>Item #4</article>
  <article>Item #5</article>
  <article>Item #6</article>
  <div class="pagination">
    <a class="next-page" href="./page-2.html">Next Page</a>
  </div>
  <div class="load-more">
    <button data-load-more-button>Load More</button>
  </div>
</div>
```

```js
var LoadMore = require('load-more');
new LoadMore({
  container: '[data-load-more]',
  button: '[data-load-more-button]',
  link: 'a.next-page',
  remove: '.pagination, .load-more'
});
```

## Options

### container
Type: `String`
Default: `[data-load-more]`

Selector for the element containing the list to be paginated.

### button
Type: `String`
Default: `[data-load-more-button]`

Selector for the load more button element. Should be present in the load-more container on all pages except the last one.

### link
Type: `String`
Default: `[data-load-more-link]`

Selector for the anchor element to the next page. This element's href will be used to fetch the next page using AJAX.

### remove
Type: `String`
Default: Values of `link` and `button`, e.g. `[data-load-more-link], [data-load-more-button]`

Selector for elements within the load more container that should be removed before adding new content (e.g. pagination & load more controls for the previous page).
