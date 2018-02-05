## zlp

非常简单的 react 数据流工具

## 使用

```js
// /store/a.js

import { Store } from 'zlp'

class A extends Store {
    // 在 store 属性里管理数据
    store = {
        data: {
            first: 'hello'
        }
    }

    init () {
        this.setStore('data.first', 'hello world')
    }
}

export default new A()

// /view/a.jsx

import { connect } from 'zlp'
import a from '/store/a'

// 一个组件可以绑定多个 store
@connect([a])
class Index extends React.Component {
    render () {
        return (
            <div>
                <h1>{a.store.data.first}</h1>
                <button
                    onClick = {() => a.init()}
                >click</button>
            </div>
        )
    }
}


// 如果不支持修饰符可以用以下使用方式
export default connect([a])(Index)

```