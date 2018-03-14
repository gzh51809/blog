'use strict'

// CSS Required:

// body.noscroll {
// 	position: relative;
// 	overflow: hidden;
// }

function scrollIntoView(el, {
	duration = 300,
	extraOffsetTop = 0
} = {}) {
	let offsetTop = el.offsetTop
	while (el.offsetParent && el.nodeName !== 'BODY') {
		offsetTop += el.offsetParent.offsetTop
		el = el.offsetParent
	}
	$('html,body').animate({ scrollTop: (offsetTop - extraOffsetTop) + 'px' }, duration)
}

function fixedBody() {
	$('html,body').toggleClass('noscroll', true)
	$('html,body').on('touchmove', (event) => {
		event.preventDefault()
	})
}

function looseBody() {
	$('html,body').toggleClass('noscroll', false)
	$('html,body').off('touchmove')
}

module.exports = {
	scrollIntoView,
	fixedBody,
	looseBody
}
