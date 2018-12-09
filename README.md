[![Build Status](https://travis-ci.org/abi-decoder/abi-decode-functions.svg?branch=master)](https://travis-ci.org/abi-decoder/abi-decode-functions)

# abi-decode-functions
Extract and list up function ids from opcodes.

## Installation

```
$ npm install --save abi-decode-functions
```

## Usage

```
const AbiFunctions = require('abi-decode-functions').default
// or 
// import AbiFunctions from 'abi-decode-functions'
const opcodes = getContractOpcodes()
const decoder = new AbiFunctions(opcodes)
const functionIds = decoder.getFunctionIds()
// find function start position on program counter
const pc = decoder.findProgramCounter('0x2c022289')
```

## NOTE
This tools also get get-function of public storage variable.
