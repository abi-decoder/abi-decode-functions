declare function require(x: string): any

const utils = require('ethereumjs-utils')
const parser = require('truffle-code-utils')
const FUNCTION_SELECTOR_OPCODES = JSON.stringify(['DUP1', 'PUSH4', 'EQ', 'PUSH2', 'JUMPI'])
const FUNCTION_SELECTOR_OPCODES_OPTIMISED_FIRST = JSON.stringify(['AND','PUSH4','DUP2','EQ','PUSH2'])

interface FunctionInfo {
  id: string
  pc: number
}

/**
 * The AbiFunctions class managing about SmartContract functions information.
 */
export default class AbiFunctions {
  opcodes: string
  selectors: any

  /**
   * constructor
   * @param {string} opcodes is bytecodes of SmartContract
   */
  public constructor(opcodes = '') {
    this.opcodes = opcodes
    this.selectors = []
    if (opcodes && opcodes.length > 0) {
      this.selectors = this._parseCode(opcodes)
    }
  }

  /**
   * get function ids from opcode.
   * @return {string[]}
   */
  public getFunctionIds(): string[] {
    return this.selectors.map((s: FunctionInfo) => s.id)
  }

  /**
   * If functionId is exists, then return program counter of function start point.
   * @param {string} functionId
   * @return {number} The program counter of function start position
   */
  public findProgramCounter(functionId: string): number | null {
    // PUSH2 is function position
    if (this.selectors.length === 0) {
      return null
    } else {
      const pc = this.selectors.filter((s: FunctionInfo) => s.id === functionId)
        .map((s: any) => utils.toBuffer(s.pc).readInt16BE(0))[0]
      return pc ? pc : null
    }
  }

  /**
   * Extract function ids from header part
   * @param {string} opcodes
   * @return {Array<any>}
   * @private
   */
  private _parseCode(opcodes: string): Array<FunctionInfo> {
    const inspections = parser.parseCode(opcodes)
    const push4Indexes = inspections.map((e: any, i: number) => e.name === 'PUSH4' ? i : -1).filter((i: number) => i > -1)
    const expections = push4Indexes.map((i: number) => inspections.slice(i - 1, i + 4))

    // inspections.forEach(((e: any) => console.log(e)))
    return expections.filter((e: any) => this._isFunctionSelector(e)).map((s: any) => {
      return {
        id: s.filter((e: any) => e.name === 'PUSH4').map((e: any) => e.pushData)[0],
        pc: s.filter((e: any) => e.name === 'PUSH2').map((e: any) => e.pushData)[0]
      }
    })
  }

  private _isFunctionSelector(opcodes: any): boolean {
    const names = JSON.stringify(opcodes.map((o: any) => o.name))
    return names === FUNCTION_SELECTOR_OPCODES || names === FUNCTION_SELECTOR_OPCODES_OPTIMISED_FIRST
  }
}
