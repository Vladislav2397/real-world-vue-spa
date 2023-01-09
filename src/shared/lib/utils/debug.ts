const delay = async (ms = 1000) => {
    return new Promise(resolve => {
        const timeout = setTimeout(() => {
            resolve(null)
            clearTimeout(timeout)
        }, ms)
    })
}

const debug = {
    delay,
}

export default debug
