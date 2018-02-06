/**
 * Get children
 * @returns {Array}
 */
exports.children = function children() {
  var children = [];
  for (var i = this.children.length; i--;) {
    // Skip comment nodes on IE8
    if (this.children[i].nodeType != 8)
      children.unshift(this.children[i]);
  }
  return children;
}