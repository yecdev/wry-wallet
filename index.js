const Web3 = require('web3');
const fs = require('fs');
const WRY_CONTRACT_ABI = require('./wry_contract_abi.json');
const WRY_BSC_CONTRACT_ADDRESS = "0x4F0c54c06bC401D02Df557FD65eE30F622155cf6";
const GAS_PRICE = 10000000000; // 10 Gwei
const WRY_GAS_LIMIT = 75000; 
const NUM_WRY_DECIMALS = 8;

var WryWallet = function WryWallet(private_key_file_path, provider_url) {
  this.web3 = new Web3(provider_url);
  const private_key = fs.readFileSync(private_key_file_path).toString().trim();
  const account = this.web3.eth.accounts.privateKeyToAccount(private_key);
  this.account_address = account.address
  this.web3.eth.accounts.wallet.add(account);
  this.wry_contract = new this.web3.eth.Contract(WRY_CONTRACT_ABI, WRY_BSC_CONTRACT_ADDRESS);
}

WryWallet.prototype.send = async function (recipient_address, amount) {
  let amount_in_yoshis = this.web3.utils.toBN(this.web3.utils.toWei(amount.toFixed(8)).slice(0, -10));
    try {
      let tx_id = await this.wry_contract.methods.transfer(recipient_address, amount_in_yoshis).send({
          from: this.account_address,
          gasPrice: GAS_PRICE,
          gas: WRY_GAS_LIMIT
      });
      return tx_id.events.Transfer.transactionHash;
    } catch (err) {
      console.log(err, err.stack);
      return "";
    }
};

module.exports = WryWallet;