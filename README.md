[![Build Status](https://travis-ci.org/abi-decoder/abi-decode-functions.svg?branch=master)](https://travis-ci.org/abi-decoder/abi-decode-functions)

# abi-decode-functions
Extract and list up function ids from opcodes.

## Installation

```
$ npm install --save abi-decode-functions
```

## Usage

```
const dcoder = require('abi-decode-functions')
const opcodes = getContractOpcodes()
const functionIds = dcoder.getFunctionIds(opcodes)
```

## NOTE
This tools also get get-function of public storage variable.
