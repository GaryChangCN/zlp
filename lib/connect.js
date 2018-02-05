"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const store_1 = require("./store");
function connect(stores, Component) {
    const list = [];
    for (const store of stores) {
        if (store instanceof store_1.default) {
            list.push({ store });
        }
        else {
            throw new Error(`connect first arguments is array of Store's instance`);
        }
    }
    return class extends React.Component {
        constructor(props) {
            super(props);
        }
        componentWillMount() {
            for (const item of list) {
                item.handle = () => {
                    this.setState({});
                };
                item.store.subscribe('change', item.handle);
            }
        }
        componentWillUnmount() {
            for (const item of list) {
                item.store.unsubscribe('change', item.handle);
            }
        }
        render() {
            return React.createElement(Component, Object.assign({}, this.props));
        }
    };
}
exports.default = connect;
