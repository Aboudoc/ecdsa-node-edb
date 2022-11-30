const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp.utils.randomPrivateKey();

console.log("Private key:", toHex(privateKey));

const publicKey = secp.getPublicKey(privateKey);

console.log("Public key:", toHex(publicKey));

// Doing like ethereum does
const address = keccak256(publicKey).slice(-20);

console.log("Address: ", toHex(address));

//Generate signature
const privateK = "0x";
const transaction = {};
const transactionHash = keccak256(transaction);
const signTransaction = secp.sign(transactionHash, privateK, {
  recovered: true,
});

console.log("Signed transaction: ", signTransaction);
