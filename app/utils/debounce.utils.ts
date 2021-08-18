export default function debounce(callback: Function, wait: number, immediate = false) {
    let timeout: any = null;

    return (...args: any[]) => {
        const callNow = immediate && !timeout;
        const next = () => callback.apply(this, args);

        clearTimeout(timeout);
        timeout = setTimeout(next, wait);

        if (callNow) {
            next();
        }
    }
}