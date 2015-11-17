/**
 * Creates a LoadMore instance.
 * @constructor
 * @param {Object} opts - Plugin options.
 */
function LoadMore(opts) {
  this.containerSelector = opts.container || '[data-load-more]';
  this.buttonSelector = opts.button || '[data-load-more-button]';
  this.linkSelector = opts.link || '[data-load-more-link]';
  this.removeSelector = opts.remove || this.linkSelector+', '+this.buttonSelector;

  this.container = document.querySelector(this.containerSelector);
  this.container.setAttribute('data-load-more-active', '');

  this.loading = false;
  this.complete = false;

  var button = this.container.querySelector(this.buttonSelector);

  if(button) {
    this.setupButton(button);
  }
}

/**
 * Binds the click event for a "load more" button
 * @param {Object} buttonEl - Button element
 */
LoadMore.prototype.setupButton = function(buttonEl) {
  buttonEl.addEventListener('click', this.fetchMoreContent.bind(this));
}

/**
 * Fetch the new page content using XMLHttpRequest
 */
LoadMore.prototype.fetchMoreContent = function() {
  if(this.loading || this.complete) {
    return;
  }

  this.loading = true;

  var link = this.container.querySelector(this.linkSelector);
  var url = link.getAttribute('href');

  var request = new XMLHttpRequest();
  request.open('GET', url, true);

  request.onload = function() {
    if(request.status >= 200 && request.status < 400) {
      this.handleResponse(request.responseText);
    } else {
      this.die();
    }
  }.bind(this);

  request.onerror = this.die.bind(this);

  request.send();
}

/**
 * Handle the HTML response from the load more request
 */
LoadMore.prototype.handleResponse = function(responseText) {
  var responseDoc = document.createElement('html');
  responseDoc.innerHTML = responseText;

  var container = responseDoc.querySelector(this.containerSelector);
  this.appendContent(container.innerHTML);
}

/**
 * Append the new content
 */
LoadMore.prototype.appendContent = function(newContent) {
  // Remove controls from previous page
  this.removePrevious();

  // Add new content to end of container
  this.container.insertAdjacentHTML('beforeend', newContent);

  var button = this.container.querySelector(this.buttonSelector);

  if(button) {
    this.setupButton(button);
  } else {
    this.complete = true;
  }

  this.loading = false;
}

/**
 * Remove leftover elements from previous page
 */
LoadMore.prototype.removePrevious = function() {
  var itemsToRemove = this.container.querySelectorAll(this.removeSelector);

  for(var i = 0; i < itemsToRemove.length; i++) {
    itemsToRemove[i].parentNode.removeChild(itemsToRemove[i]);
  }
}

/**
 * Fall back to non-ajax appearance on error
 */
LoadMore.prototype.die = function() {
  this.loading = false;
  this.complete = true;
  this.container.removeAttribute('data-load-more-active');
}

module.exports = LoadMore;
