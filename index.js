'use strict'

const observer = require('./observer')

const reformCosts = {
    livingRoom: 2000,
    bedroom: 1000,
    kitchen: 3000
}

const breakdown = {
    taxesPercent: .20,
    taxes: 0,
    baseTotal: 0,
    total: 0
}

const observerTotalCb = (newVal, oldVal) => {
    breakdown.baseTotal += ( newVal - oldVal )
    breakdown.total = breakdown.baseTotal * ( 1 + breakdown.taxesPercent )
}
const observerTaxesCb = () => {
    breakdown.taxes = breakdown.total - breakdown.baseTotal
}
const options = {
    immediate: true
}

for ( let prop in reformCosts ) {
    observer(reformCosts, prop, observerTotalCb, options)
    observer(reformCosts, prop, observerTaxesCb, options)
}

function reformCostsValues() {
    const obj = {}

    for ( let key in reformCosts ) {
        obj[key] = reformCosts[key]
    }

    return obj
}

