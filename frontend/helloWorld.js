
document.write("This text comes from an external script.");

var web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
console.log(web3);
var contractInstance; 

init = function() {
    var address = document.getElementById('address').value;
    console.log("Smart contract address:", address);
    contractInstance = new web3.eth.Contract(helloWorldABI, address, {
        from: '0xA61391a90d17b4Fa2d525714f322Aa138afa8C71', // default from address
        gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
    });

    contractInstance.events.allEvents(eventCallback);
    console.dir(contractInstance);
}

eventCallback = function(error, result) {
    console.log("error:", error)
    console.log("result:", result)
}

writeMessage = function() {
    console.log("Write Message Clicked");
    var message = document.getElementById('message').value;
    contractInstance.methods.setMessage(message).send().then(function(receipt){
        console.log(receipt);
    });
}

readMessage = function() {
    console.log("Read Message Clicked");
    var message = contractInstance.methods.message().call(function(error, result){
        var msg;
        if(error) msg = error;
        if(result) msg = result;
        document.getElementById('message').value = msg;
        console.log("error:", error)
        console.log("result:", result)
    });
}

clearMessage = function() {
    console.log("Clear Message Clicked");
    document.getElementById('message').value = "";
}