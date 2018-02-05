"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_set_1 = require("lodash.set");
class Store {
    constructor() {
        this.store = {};
        this.subscribes = {};
    }
    setStore(path, value) {
        lodash_set_1.default(this.store, path, value);
        this.store[path] = value;
        this.emit('change');
    }
    subscribe(event, handle) {
        if (!this.subscribes[event]) {
            this.subscribes[event] = [handle];
        }
        else {
            this.subscribes[event].push(handle);
        }
    }
    unsubscribe(event, handle) {
        const arr = this.subscribes[event];
        arr.splice(arr.indexOf(handle), 1);
    }
    emit(event) {
        for (const events of this.subscribes[event]) {
            events();
        }
    }
}
exports.default = Store;
