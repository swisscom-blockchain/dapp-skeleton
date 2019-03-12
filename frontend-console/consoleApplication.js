var fs = require('fs');
/*
 * https://web3js.readthedocs.io/en/1.0/
 * This is Web3 version 1.x. It's not compatible with the version 0.2x which is used by Truffle
 * 
 * REQUIRED: "web3": "^1.0.0-beta.38"
 */
const Web3 = require('web3');

//const RPC_ENDPOINT = 'http://localhost:8545';
const CONTRACT_ADDRESS = '0xef3809748F4Cea51aA3322815F015BbBE6e6F65B'
const ABI_STRING = fs.readFileSync('./helloWorld.abi.json', 'UTF-8');
const CONTRACT_ABI = JSON.parse(ABI_STRING);

// ganache-cli -m "venture truth carry onion picnic wrong youth purchase injury cloud security danger"
// account[0] is 0xf04ccf7ee1726fcdfc5d1b88210a36a247a09c7ac12c78561e6c211907f97511
const ganacheAddr0 = "0xa61391a90d17b4fa2d525714f322aa138afa8c71";

const privateKeyBob = "dfbf2c51e6fc3db565ccba01de53644f4470cfb6c23b7ee02a5d333aec064748";
const privateKeyAlice = "c56c343fb8db3c1b4ad66e22eb7b3327bb3e7dbf6727a1c3afe9da2ff6320860";

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
async function createAccount(web3, privateKey) {
    const account = web3.eth.accounts.privateKeyToAccount('0x' + privateKey);
    web3.eth.accounts.wallet.add(account);
    web3.eth.defaultAccount = account.address;

    console.log("Address is: " + account.address);

    var value = web3.utils.toWei('1', 'Ether');
    await web3.eth.sendTransaction({
        from: ganacheAddr0, 
        to: account.address, 
        value: value 
    });
    return account.address;
}

async function writeMessage(contractInstance, sender, message) {
    await contractInstance.methods.setMessage(message).send({ 
        from: sender, 
        gas: 900000
    });
}

async function run() {

    var wsProvider = new Web3.providers.WebsocketProvider('ws://localhost:8545');
    const web3 = new Web3(wsProvider);
    const contractInstance = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    contractInstance.events.allEvents(eventCallback); // this only works with websocket 'ws://..' connection

    var bob = await createAccount(web3, privateKeyBob);
    var alice = await createAccount(web3, privateKeyAlice);

    console.log("Write message");
    await writeMessage(contractInstance, bob, "Hello Alice!");
    await writeMessage(contractInstance, alice, "Hi Bob!");

    var message = await contractInstance.methods.message().call();
    console.log("Read message: " + message);
}

run();


