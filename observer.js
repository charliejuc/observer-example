'use strict'

const observersKey = Symbol('observers')

function setObserversKey(obj, prop) {
    if ( ! obj[observersKey] ) {
        obj[observersKey] = {}
    }

    if ( ! obj[observersKey][prop] ) {
        obj[observersKey][prop] = []
    }
}

module.exports = function observer(obj, prop, cb, options) {
    options = options || {}
    setObserversKey(obj, prop)

    obj[observersKey][prop].push(cb)

    let baseValue = obj[prop]

    if ( options.immediate ) {
        cb(baseValue, baseValue.constructor())
    }

    Object.defineProperty(obj, prop, {
        get() {
            return baseValue
        },
        set(newVal) {
            const oldVal = baseValue
            baseValue = newVal

            obj[observersKey][prop]
                .forEach(cb => cb(newVal, oldVal))
        }
    })
}