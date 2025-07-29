/**
 * @param map Record<string, [zh, en]>
 */
const createLocale = (map: Record<string, [string, string]>) => {
    return Object.keys(map).reduce(
        (obj, key) => {
            Reflect.set(obj.zh, key, map[key][0])
            Reflect.set(obj.en, key, map[key][1])
            return obj
        },
        { zh: {}, en: {} }
    )
}

export default createLocale
