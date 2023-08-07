const contractAddress = "0x493fD82D18a17cF90a357aaD6A4c5B3D352427b0";
const ABI = window.abi;
let account;
let netID;
let LoggedIn = false;
let Ethprice;
let HyperLaneLink;
fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd') .then(response => response.json()) .then(data => Ethprice = data.ethereum.usd) .then(() => console.log(Ethprice));

document.getElementById("VLND").value = 0;
document.getElementById("ETH").value = 0;

let EthBalanceNum = document.getElementById("EtherBalance");
let ConfirmationUSD = document.getElementById("ConfirmationUSD");
let ConfirmationUSD2 = document.getElementById("ConfirmationUSD2");
let MiniEthBalance1 = document.getElementById("MiniEthBalance1");
let ConectedGreen = document.getElementById("ConectedGreen");
let WalletButton = document.getElementById("WalletButton");
let BuyButton = document.getElementById("BuyButton");
let youpay = document.getElementById("youpay");
let youreceive = document.getElementById("youreceive");
let disconnectbtn = document.getElementById("disconnectbtn");
let GasFee = document.getElementById("GasFee");
ConectedGreen.style.display = "none";
disconnectbtn.style.display = "none";


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
        ConectedGreen.style.display = "";
        let firstFive = account.slice(0, 5);
        let lastFive = account.slice(-4);
        WalletButton.innerText = " "+ firstFive + "..." + lastFive;
        BuyButton.disabled = false;
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

async function EstimateGas(){
    fetch("https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=IUG1CY88MY4BZ9XDA2P1S9HJCU1T27WD8D")
            .then(response => response.json())
            .then(data => {
                // Check if the API response contains the ProposeGasPrice data
                if (data.status === "1" && data.result && data.result.ProposeGasPrice) {
                    const proposeGasPrice = data.result.ProposeGasPrice;
                    console.log("ProposeGasPrice:", proposeGasPrice);
                    GasFee.innerText = (((proposeGasPrice * 110000 / 1000) * Ethprice)).toLocaleString(undefined, { maximumFractionDigits: 2 });
                } else {
                    console.log("Unable to fetch ProposeGasPrice.");
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
}

async function UpdatePercent(){
    document.getElementById("%").innerText = (((0.03)*((document.getElementById("millions").value)*(1000000))/(document.getElementById("ethers").value * Ethprice) * 100)).toLocaleString(undefined, { maximumFractionDigits: 2 });
}

async function Update(inputtype){
    if(inputtype == 1){
        document.getElementById("VLND").value = document.getElementById("ETH").value * 100;
    } else if(inputtype == 2){
        document.getElementById("ETH").value = document.getElementById("VLND").value / 100;
    }

    document.getElementById("DollarValueOne").innerText = (document.getElementById("ETH").value * Ethprice).toLocaleString(undefined, { maximumFractionDigits: 2 });
    document.getElementById("DollarValueTwo").innerText = (document.getElementById("ETH").value * Ethprice).toLocaleString(undefined, { maximumFractionDigits: 2 });
    document.getElementById("%").innerText = (((0.03)*((document.getElementById("millions").value)*(1000000))/(document.getElementById("ethers").value * Ethprice) * 100)).toLocaleString(undefined, { maximumFractionDigits: 2 });
    let gas = await contract.methods.Deposit().estimateGas({from: account, value: web3.utils.toWei(document.getElementById("ETH").value, 'ether')});
    document.getElementById("GasFee").innerText = (gas * 0.000000021 * Ethprice).toLocaleString(undefined, { maximumFractionDigits: 2 });
}

async function UpdateConfirmation(){
    youpay.innerText = document.getElementById("ETH").value;
    youreceive.innerText = document.getElementById("VLND").value;
    ConfirmationUSD.innerText = (document.getElementById("ETH").value * Ethprice).toLocaleString(undefined, { maximumFractionDigits: 2 });
    ConfirmationUSD2.innerText = (document.getElementById("ETH").value * Ethprice).toLocaleString(undefined, { maximumFractionDigits: 2 });
}

async function Buy(){
    let gas = await contract.methods.Deposit().estimateGas({from: account, value: web3.utils.toWei(document.getElementById("ETH").value, 'ether')});
    let tx = await contract.methods.Deposit().send({from: account, value: web3.utils.toWei(document.getElementById("ETH").value, 'ether'), gas: gas});

    console.log(tx);
    EtherScanLaneLink = "https://etherscan.io/tx/" + tx.transactionHash;
    return(tx);
}

async function Maximise(){
    document.getElementById("ETH").value = await getEtherBalance();
    Update(1);
    console.log(await getEtherBalance())
}

