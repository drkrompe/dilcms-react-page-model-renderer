export default function () {
    return Array.from(arguments).reduce((acc, cur) => {
        if (typeof cur === 'string') {
            return acc + ' ' + cur
        } else {
            return acc
        }
    }, "");
}