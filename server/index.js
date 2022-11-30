const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");

app.use(cors());
app.use(express.json());

const balances = {
  "2389b7f886556fdb64cb6b1dafa54eace6a596e8": 100,
  "051ab6c5e5b2c2023c2ce3c2a5c8adf0cf3c9ed7": 50,
  f867c894f121a2e01d6a35f00c86f471dbe85634: 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  // get a signature from the client-side application
  // recover the public address from the signature
  const { recoveryBit, signature, recipient, amount } = req.body;

  const recoveredPublicKey = secp.recoverPublicKey(
    message,
    signature,
    recoveryBit
  );
  const sender = keccak256(recoveredPublicKey).slice(-20);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
