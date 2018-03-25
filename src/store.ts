import * as set from 'lodash.set'

class Store {
    store: {
        [props: string]: any
    } = {}

    private subscribes: {
        [props: string]: any[]
    } = {}

    protected setStore (path, value) {
        set(this.store, path, value)
        this.store[path] = value
        this.emit('change')
    }

    subscribe (event: string, handle: () => void) {
        if (!this.subscribes[event]) {
            this.subscribes[event] = [ handle ]
        } else {
            this.subscribes[event].push(handle)
        }
    }

    unsubscribe (event: string, handle: () => void) {
        const arr = this.subscribes[event]
        arr.splice(arr.indexOf(handle), 1)
    }

    protected emit (event: string) {
        for (const events of this.subscribes[event]) {
            events()
        }
    }
}

export default Store
