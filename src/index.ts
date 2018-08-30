declare function require(x: string): any

const parser = require('truffle-code-utils')
const FUNCTION_SELECTOR_OPCODES = JSON.stringify(['DUP1', 'PUSH4', 'EQ', 'PUSH2', 'JUMPI'])

export function getFunctionIds(opcodes: string) {
  const selectors = this._parseCode(opcodes)
  return selectors.map((s: any) => s[1].pushData)
}

export function _parseCode(opcodes: string): Array<any> {
  const inspections = parser.parseCode(opcodes)
  const push4Indexes = inspections.map((e: any, i: number) => e.name === 'PUSH4' ? i : -1).filter((i: number) => i > -1)
  const expections = push4Indexes.map((i: number) => inspections.slice(i - 1, i + 4))
  return expections.filter((e: any) => this._isFunctionSelector(e))
}

export function _isFunctionSelector(opcodes: any): boolean {
  const names = opcodes.map((o: any) => o.name)
  return JSON.stringify(names) === FUNCTION_SELECTOR_OPCODES
}