import * as set from 'lodash.set'
import BaseStore from './base-store';

class Store extends BaseStore {

    protected setStore (path, value) {
        set(this.store, path, value)
        this.emit('change')
    }

}

export default Store
