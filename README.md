# DApp Skeleton

Very simple application. It contains two parts:

- The hello world smart contract
- A pure HTML+JS frontend

## Requirements

### Smart Contract

It's a truffle project

```bash
# Ganache CLI is required
# You can start it with a specific mnemonic
# You can use an other one too. If you use MetaMask make sure you initialize MM with the same Mnemonic
ganache-cli -m "venture truth carry onion picnic wrong youth purchase injury cloud security danger"

# Test the smart contracts
truffle test

# Deploy the smart contracts
truffle deploy

# Retriev the addresses from deployed contracts
truffle networks
```

### Frontend

You can just open the index.html. In that case it will use the accounts from ganache-cli.

You can serve the frontend through a simple web-server `frontend/start-webserver.sh` (Python required). And access it through `http://localhost:8000`