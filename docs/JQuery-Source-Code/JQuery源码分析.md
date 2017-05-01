# JQuery Source Code Analysis

## Overall Structure

The overall structure of recent JQuery version (2.1.1) is show as follows:

```javascript
;(function(global, factory) {
    factory(global);
}(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
    var jQuery = function( selector, context ) {
		return new jQuery.fn.init( selector, context );
	};
	jQuery.fn = jQuery.prototype = {};
	// Core method
	// Callback
	// Asynchronous Quene
	// Data Cache
	// Quene Operation
	// Selector
	// Attribute Operation
	// Node Traversal
	// Document Processing
	// Style Operation
	// Event System
	// AJAX Interaction
	// Animation Engine
	return jQuery;
}));


jQuery.each( [ "get", "post" ], function( i, method ) {
    jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type     = type || callback;
			callback = data;
			data     = undefined;
		}
		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});
```

In my opinion, jQuery is divided into 5 parts: Selector、DOM Operation、Event、Ajax and Animation.

So why there are 13 modules? Because the most favorite thing that JQuery likes to do is taking out common features, and make them modular.

