export class NotExistsError extends Error {
    constructor(key: string | symbol | number, message?: string) {
        super(message ?? `target object has not key ${String(key)}`)
    }
}

const keys = <T extends Record<string, unknown>>(obj: T): (keyof T)[] => {
    return Object.keys(obj)
}

const omit = <T extends Record<string, unknown>, K extends keyof T>(
    target: T,
    omitFields: readonly K[]
) => {
    const targetKeys = Object.keys(target) as K[]
    const filteredFields = targetKeys.filter(key => !omitFields.includes(key))

    return Object.fromEntries(
        filteredFields.map(key => {
            if (!(key in target)) {
                throw new NotExistsError(key)
            }

            return [key, target[key]]
        })
    ) as unknown as Omit<T, K>
}

const pick = <T extends Record<string, unknown>, K extends keyof T>(
    target: T,
    pickFields: readonly K[]
) => {
    return Object.fromEntries(
        pickFields.map(key => {
            if (!(key in target)) {
                throw new NotExistsError(key)
            }

            return [key, target[key]]
        })
    ) as unknown as Pick<T, K>
}

const object = {
    keys,
    omit,
    pick,
}

export default object
