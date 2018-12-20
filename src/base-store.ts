
class BaseStore {
    store: {
        [props: string]: any
    } = {}

    private subscribes: {
        [props: string]: any[]
    } = {}

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
        const subscribers = this.subscribes[event]
        if (!subscribers) {
            return
        }
        for (const subscriber of subscribers) {
            subscriber()
        }
    }
}

export default BaseStore
