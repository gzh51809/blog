function split(str, key = '```') {
	let lines = str.split('\n')
	let result = [];
	let idx = 0;

	function setContent(line, isMatch) {
		if (!result[idx]) {
			result[idx] = {}
		}
		result[idx].content = (result[idx].content || '') + line + '\n'
		if (isMatch) {
			result[idx].match = true
		}
	}

	function isOdd(num) {
		return num % 2 !== 0
	}

	let keyCount = 0

	for(let line of lines) {
		if (line.indexOf(`${key}`) === -1) {
			setContent(line)
			break
		}
		keyCount++
		if (isOdd(keyCount)) {
			if (result[idx]) {
				idx++
			}
			setContent(line, true)
		} else {
			setContent(line, true)
			idx++
		}
	}
	return result
}