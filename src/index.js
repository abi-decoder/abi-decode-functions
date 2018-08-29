const parser = require('truffle-code-utils')

const FUNCTION_SELECTOR_OPCODES = JSON.stringify(['DUP1', 'PUSH4', 'EQ', 'PUSH2', 'JUMPI'])
module.exports = {
  getFunctionIds: function(opcodes) {
    const selectors = this._parseCode(opcodes)
    return selectors.map(s => s[1].pushData)
  },
  _parseCode: function(opcodes) {
    const inspections = parser.parseCode(opcodes)
    const push4Indexes = inspections.map((e, i) => e.name === 'PUSH4' ? i : -1).filter(i => i > -1)
    const expections = push4Indexes.map(i => inspections.slice(i - 1, i + 4))
    return expections.filter(e => this._isFunctionSelector(e))
  },
  _isFunctionSelector: function(opcodes) {
    const names = opcodes.map(o => o.name)
    return JSON.stringify(names) === FUNCTION_SELECTOR_OPCODES
  }
}
