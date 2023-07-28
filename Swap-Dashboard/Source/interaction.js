const contractAddress = "0xf5c9e57e177B4F5CCfCb13b18e4154774E917401";
const ABI = window.abi;
let account;
let netID;
let LoggedIn = false;
let Ethprice;
fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd') .then(response => response.json()) .then(data => Ethprice = data.ethereum.usd) .then(() => console.log(Ethprice));


let EthBalanceNum = document.getElementById("EtherBalance");
let MiniEthBalance1 = document.getElementById("MiniEthBalance1");
loginWithEth();

async function loginWithEth(){
    if(LoggedIn == false){
    if(window.ethereum){
        await ethereum.request({ method: 'eth_requestAccounts' });
        window.web3 = await new Web3(ethereum);
        await getID();
        if (netID != 1){ //Change and fix
            console.log("The current Metamask/Web3 network is not Ethereum, switch connect to the Ethereum Mainnet."); 
            alert("The current Metamask/Web3 network is not Ethereum, please switch to the Ethereum Mainnet.");
            return("Failed to connect")
        }
        accountarray = await web3.eth.getAccounts();
        contract = new window.web3.eth.Contract(window.SaleContractABI, contractAddress, window.web3);
        account = accountarray[0];
        console.log('Logged In')
        await getEtherBalance();
        LoggedIn = true;
    } else { 
        alert("No ETHER Wallet available")
    }
    }
}

async function getID(){
    let idhex = web3.eth._provider.chainId;
    netID = parseInt(idhex, 16);
    return(netID);
}

async function getEtherBalance() {
    let balance = await web3.eth.getBalance(account);
    let balanceInEther = web3.utils.fromWei(balance, 'ether');
    let roundedDownBalance = Math.floor(parseFloat(balanceInEther) * 1000) / 1000;
    EthBalanceNum.innerText = roundedDownBalance;
    MiniEthBalance1.innerText = roundedDownBalance;
    
    return roundedDownBalance;
}

async function Update(inputtype){
    if(inputtype == 1){
        document.getElementById("VLND").value = document.getElementById("ETH").value * 100;
    } else if(inputtype == 2){
        document.getElementById("ETH").value = document.getElementById("VLND").value / 100;
    }

    document.getElementById("DollarValueOne").innerText = (document.getElementById("ETH").value * Ethprice).toLocaleString(undefined, { maximumFractionDigits: 2 });
    document.getElementById("DollarValueTwo").innerText = (document.getElementById("ETH").value * Ethprice).toLocaleString(undefined, { maximumFractionDigits: 2 });
    document.getElementById("%").innerText = (((0.03)*((100)*(1000000))/(document.getElementById("ETH").value * Ethprice) * 100)).toLocaleString(undefined, { maximumFractionDigits: 2 });
}

async function Maximise(){
    
}
