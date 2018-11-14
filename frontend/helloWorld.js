

var web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
console.log(web3);
var contractInstance; 
var eventCounter = 0;

init = function() {
    var address = document.getElementById('address').value;
    console.log("Smart contract address:", address);
    contractInstance = new web3.eth.Contract(helloWorldABI, address, {
        from: '0xA61391a90d17b4Fa2d525714f322Aa138afa8C71', // default from address
        gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
    });

    contractInstance.events.allEvents(eventCallback);
}

eventCallback = function(error, result) {
    if(error) console.error("error:", error)
    if(result) {
        var from = result.returnValues.from;
        var event = result.event;
        var msg = result.returnValues[1];
        var message = "EventNbr: " + eventCounter++ + ", from: " + from + ", event: " + event + ", msg: " + msg;
        console.log(message)

        var node = document.createElement("div");
        node.className = "alert alert-success";
        var textnode = document.createTextNode(message);
        node.appendChild(textnode);    
        var list = document.getElementById("events");
        list.insertBefore(node, list.childNodes[0]);
    }
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


writeNumber = function() {
    console.log("Write Number Clicked");
    var message = document.getElementById('number').value;
    contractInstance.methods.setNumber(message).send().then(function(receipt){
        console.log(receipt);
    });
}

readNumber = function() {
    console.log("Read Number Clicked");
    var message = contractInstance.methods.number().call(function(error, result){
        var msg;
        if(error) msg = error;
        if(result) msg = result;
        document.getElementById('number').value = msg;
        console.log("error:", error)
        console.log("result:", result)
    });
}

clearNumber = function() {
    console.log("Clear Number Clicked");
    document.getElementById('number').value = "";
}