import * as React from 'react'
import BaseStore from './base-store'

interface ConnectStore {
    store: BaseStore
    handle?: () => void
}


export default function connect (stores: any | BaseStore[]): any {
    let arr: BaseStore[] = []
    if (Array.isArray(stores)) {
        arr = stores
    } else {
        arr = Array.from(stores)
    }
    return function (Component: React.ReactType) {
        const list: ConnectStore[] = []
        for (const store of arr) {
            if (store instanceof BaseStore) {
                list.push({ store })
            } else {
                throw new Error(`connect first arguments is array of Store's instance`)
            }
        }

        return class extends React.Component<any, any> {
            constructor (props) {
                super (props)
            }

            componentWillMount () {
                for (const item of list) {
                    item.handle = () => {
                        this.setState({})
                    }
                    item.store.subscribe('change', item.handle)
                }
            }

            componentWillUnmount () {
                for (const item of list) {
                    item.store.unsubscribe('change', item.handle)
                }
            }

            render () {
                return <Component {...this.props} />
            }
        }
    }
}
