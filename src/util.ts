import * as isObjectLike from 'lodash.isobjectlike'
import * as isPlainObject from 'lodash.isplainobject'

export default {
    isObjectLike,
    isPlainObject,
    isDate (input: any) {
        return input instanceof Date
    },
    isSet (input: any) {
        return input instanceof Set
    },
    isMap (input: any) {
        return input instanceof Map
    }
}
