var _ = require('lodash');
module.exports = patchJQLite;

function patchJQLite (ngElement){
  function after (element, newElement) {
    var index = element, parent = element.parentNode;
    if(!parent) return;
    newElement = new ngElement(newElement);

    for (var i = 0, ii = newElement.length; i < ii; i++) {
      var node = newElement[i];
      parent.insertBefore(node, index.nextSibling);
      index = node;
    }
  }

  function chain(fn, name) {
    /**
     * chaining functions
     */
    ngElement.prototype[name] = function(arg1, arg2, arg3) {
      var value;

      for (var i = 0, ii = this.length; i < ii; i++) {
        if (_.isUndefined(value)) {
          value = fn(this[i], arg1, arg2, arg3);
          if (!_.isUndefined(value)) {
            // any function which returns a value needs to be wrapped
            value = ngElement(value);
          }
        } else {
          jqLiteAddNodes(value, fn(this[i], arg1, arg2, arg3));
        }
      }
      return !_.isUndefined(value) ? value : this;
    };
  }

  chain(after, 'after');
}

// AngularJS core code
function jqLiteAddNodes(root, elements) {
  // THIS CODE IS VERY HOT. Don't make changes without benchmarking.

  if (elements) {

    // if a Node (the most common case)
    if (elements.nodeType) {
      root[root.length++] = elements;
    } else {
      var length = elements.length;

      // if an Array or NodeList and not a Window
      if (typeof length === 'number' && elements.window !== elements) {
        if (length) {
          for (var i = 0; i < length; i++) {
            root[root.length++] = elements[i];
          }
        }
      } else {
        root[root.length++] = elements;
      }
    }
  }
}

