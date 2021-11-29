
export default function (fun, durction) {
    let timer = null;
    return (...arg) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fun(...arg)
        }, durction)
    }
}