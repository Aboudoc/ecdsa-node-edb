const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");
require("dotenv").config();
const secp = require("ethereum-cryptography/secp256k1");

(async () => {
  const privateKey = process.env.PRIVATE_KEY;

  let message = {
    from: "2389b7f886556fdb64cb6b1dafa54eace6a596e8",
    to: "051ab6c5e5b2c2023c2ce3c2a5c8adf0cf3c9ed7",
    amount: "1",
  };
  console.log("Message: ", message);
  console.log("Private Key: ", privateKey);

  const msgHash = toHex(keccak256(utf8ToBytes(JSON.stringify(message))));
  console.log("Message Hashed: ", msgHash);

  const [signature, recoveryBit] = await secp.sign(msgHash, privateKey, {
    recovered: true,
  });

  console.log("Signature: ", toHex(signature));

  console.log("RecoveryBit: ", recoveryBit);
})();
