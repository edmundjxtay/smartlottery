const contractAddress = "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8";
const abi = smartlotteryjson.abi;
 
let contract;
let web3;
let accounts;
 
window.addEventListener('load', async () => {
    if(window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
            initApp();
        } catch (error) {
            console.error("Access to your Ethereum account rejected.");
        }
    } else {
        console.error("Please install MetaMask!");
    }
});
 
function initApp() {
    contract = new web3.eth.Contract(abi, contractAddress);
 
    document.getElementById('connectWallet').addEventListener('click', async () => {
        accounts = await web3.eth.getAccounts();
        console.log("Connected account:", accounts[0]);
    });
 
    document.getElementById('enterLottery').addEventListener('click', () => {
        contract.methods.enter().send({ from: accounts[0], value: web3.utils.toWei("0.01", "ether") })
        .then(() => console.log("Entered the lottery!"))
        .catch(console.error);
    });
 
    document.getElementById('pickWinner').addEventListener('click', () => {
        contract.methods.pickWinner().send({ from: accounts[0] })
        .then(() => console.log("Winner picked!"))
        .catch(console.error);
    });
 
    // Fetch and display participants
    contract.methods.getParticipants().call()
    .then(displayParticipants)
    .catch(console.error);
}
 
function displayParticipants(participants) {
    const participantsList = document.getElementById('participantsList');
    participantsList.innerHTML = participants.map(address => `<li>${address}</li>`).join('');}
