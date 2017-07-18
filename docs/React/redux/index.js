export default function warning(message) {
    /* eslint-disable no-console */
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
        console.log(message)
    }
    /* eslint-enable no-console */
    try {
        throw new Error(message)
    } catch (err) { }
}