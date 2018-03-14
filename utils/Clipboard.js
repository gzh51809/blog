"use strict"

function copyToClipboard(text) {
	// 创建一个临时的 textArea
	let textArea = document.createElement('textarea')
	// 将元素移出屏幕外（水平方向）
	textArea.style.position = 'absolute'
	textArea.style.left = '-9999px'
	// 垂直方向移动元素
	let yPosition = window.pageYOffset || document.documentElement.scrollTop
	textArea.style.top = yPosition + 'px'
	// "readonly" 用来禁止键盘弹出
	textArea.setAttribute('readonly', '')
	textArea.value = text
	// 插入文本到 textArea 中
	document.body.appendChild(textArea)
	// Selects all the textArea contents
	textArea.select()
	textArea.setSelectionRange(0, textArea.value.length)

	let successful
	try {
		// Executes the copy and show message if successful
		successful = document.execCommand('copy')
	} catch (err) {
		// Not to handle it now
	}
	document.body.removeChild(textArea)
	return successful
}

module.exports = {
	copyToClipboard
}
