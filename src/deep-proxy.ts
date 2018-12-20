// rewrite from flusso
import _ from './util'

export enum ProxyActionType {
    Set, Delete, Define,
}

export type ProxyPath = string[]

export interface Modify {
    (type: ProxyActionType, target, path: ProxyPath, val): void
}

export default function deepProxy (obj, cb: Modify, path: ProxyPath) {
    if (_.isObjectLike(obj) && !_.isDate(obj)) {
        if (obj.__zlpProxy) return obj

        if (Array.isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
                obj[i] = deepProxy(obj[i], cb, <ProxyPath> path.concat(i.toString()))
            }
        } else if (_.isSet(obj) || _.isMap(obj)) {
            throw new TypeError('Set and Map is not allowed')
        } else if (_.isPlainObject(obj)) {
            // tslint:disable-next-line:forin
            for (const key in obj) {
                obj[key] = deepProxy(obj[key], cb, <ProxyPath> path.concat(key))
            }
        }

        Object.defineProperty(obj, '__zlpProxy', {
            configurable: false,
            enumerable: false,
            value: true,
        })

        return new Proxy(obj, {
            set (target, name: string, val) {
                const subPath = path.concat(name)
                target[name] = deepProxy(val, cb, subPath)
                cb(ProxyActionType.Set, target, subPath, val)
                return true
            },

            deleteProperty (target, name: string) {
                cb(ProxyActionType.Delete, target, path.concat(name), undefined)
                return delete target[name]
            },

            defineProperty (target, name: string, desc) {
                const subPath = path.concat(name)
                Object.defineProperty(target, name, Object.assign({}, desc, {
                    value: deepProxy(desc.value, cb, subPath),
                }))
                cb(ProxyActionType.Define, target, subPath, desc)
                return target
            },
        })
    } else {
        return obj
    }
}
