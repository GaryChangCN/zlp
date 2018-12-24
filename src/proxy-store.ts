import * as set from 'lodash.set'
import deepProxy from './deep-proxy'
import BaseStore from './base-store'


class ProxyStore extends BaseStore {
    constructor () {
        super ()
        const self = this

        return new Proxy(this, {
            set (target, name, val) {
                if (name === 'store') {
                    target[name] = deepProxy(val, (type, t, p, v) => {
                        self.emit('change')
                    }, [])
                } else {
                    target[name] = val
                }
                return true
            },
        })
    }
}

export default ProxyStore
