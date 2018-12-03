var fs = require('fs');
/*
 * https://web3js.readthedocs.io/en/1.0/
 * This is Web3 version 1.x. It's not compatible with the version 0.2x which is used by Truffle
 */
const Web3 = require('web3');

//const RPC_ENDPOINT = 'http://localhost:8545';
const CONTRACT_ADDRESS = '0xfcbcde1df4bcc3a65bb0b842b9fb5b5a7b8e277f'
const ABI_STRING = fs.readFileSync('./helloWorld.abi.json', 'UTF-8');
const CONTRACT_ABI = JSON.parse(ABI_STRING);

// ganache-cli -m "venture truth carry onion picnic wrong youth purchase injury cloud security danger"
// account[0] is 0xf04ccf7ee1726fcdfc5d1b88210a36a247a09c7ac12c78561e6c211907f97511
const addr0 = "0xa61391a90d17b4fa2d525714f322aa138afa8c71";

eventCallback = function (error, result) {
    if (error) console.error("error:", error)
    if (result) {
        var from = result.returnValues.from;
        var event = result.event;
        var msg = result.returnValues[1];
        var message = "Event, from: " + from + ", event: " + event + ", msg: " + msg;
        console.log(message);
    }
}

// Creates a new account and adding some ether.
async function createAccount(web3) {
    var privateKey = 'dfbf2c51e6fc3db565ccba01de53644f4470cfb6c23b7ee02a5d333aec064748';
    const account = web3.eth.accounts.privateKeyToAccount('0x' + privateKey);
    web3.eth.accounts.wallet.add(account);
    web3.eth.defaultAccount = account.address;

    console.log("Address is: " + account.address);

    var value = web3.utils.toWei('1', 'Ether');
    await web3.eth.sendTransaction({from:addr0, to:account.address, value: value});
    return account.address;
}

async function run() {

    var wsProvider = new Web3.providers.WebsocketProvider('ws://localhost:8545');
    const web3 = new Web3(wsProvider);
    const contractInstance = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    contractInstance.events.allEvents(eventCallback); // this only works with websocket 'ws://..' connection

    var newAddress = await createAccount(web3);
    var message = "Hello smart contract!";
    console.log("Write message: " + message);
    await contractInstance.methods.setMessage(message).send({from: newAddress, gas: 1000000});

    var message = await contractInstance.methods.message().call();
    console.log("Read message: " + message);
}

run();


