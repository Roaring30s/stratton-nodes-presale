import Web3 from "web3";


export const handleNetworkSwitch = async (networkName) => {
    await changeNetwork({ networkName });
}
const changeNetwork = async ({ networkName }) => {
    try {
        if (!window.ethereum) throw new Error("No wallet found!")
        await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
                {
                    ...networks[networkName]
                }
            ]
        });
    } catch (err) {
        console.log("NO WALLET DETECTED", err.message);
    }
}
const networks = {
    avalanche: {
        chainId: `0x${Number(43114).toString(16)}`,
        chainName: "Avalanche Mainnet",
        nativeCurrency: {
            name: "Avalanche",
            symbol: "AVAX",
            decimals: 18
        },
        rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
        blockExplorerUrls: ["https://snowtrace.io"]
    },
    fuji: {
        chainId: `0x${Number(43113).toString(16)}`,
        chainName: "Avalanche Fuji Testnet",
        nativeCurrency: {
            name: "Avalanche",
            symbol: "AVAX",
            decimals: 18
        },
        rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
        blockExplorerUrls: ["https://testnet.snowtrace.io"]
    }
}

export const loadWeb3 = () => {
    window.ethereum.request({ method: "eth_requestAccounts" });
 
    const web3 = new Web3(window.ethereum);
    
    return web3
}


