# wry-wallet

## Installation:

`npm install wry-wallet`

Put BSC private key in local file.

## Usage:

```
const WryWallet = require('wry-wallet');
const wallet = new WryWallet('.bsc_private_key', 'https://bsc-dataseed1.binance.org:443');
wallet.send('0xD971BdC3F2F161B297A8e2EEd1776cf4a824C29C', 1.01).then(console.log);
```
