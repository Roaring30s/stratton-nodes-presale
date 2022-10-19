export const CHAIN = {
    name: "Avalanche Fuji Testnet",
    chain: "AVAX",
    network: "testnet",
    rpc: ["https://api.avax-test.network/ext/bc/C/rpc"],
    faucets: ["https://faucet.avax-test.network/"],
    nativeCurrency: { name: "Avalanche", symbol: "AVAX", decimals: 18 },
    infoURL: "https://cchain.explorer.avax-test.network",
    shortName: "Fuji",
    chainId: 43113,
    networkId: 1,
    explorers: [{ name: "snowtrace", url: "https://testnet.snowtrace.io/", standard: "EIP3091", }],
};

export const SUPPORTED_NETWORKS = {
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

export const CHAIN_NAME = 'fuji';

export const PRESALE_ADDRESS = '0x00ee61986eB02c6565E0BaeC3D520AfD47ce012a';
export const DAI_ADDRESS = '0x0d0C035763d5BD6e0AfAC6edf0235b8B1F5Df251';
export const DAI_TOKEN_DECIMALS = 18;

export const PBWD_PRICE = 50;
export const PBWD_TOKEN_ADDRESS = "0xDD954214aA3eEa2390e4EB7A379e0B536f8cC5e0";
export const PBWD_TOKEN_SYMBOL = "pBWD";
export const PBWD_TOKEN_DECIMALS = 18;
export const PBWD_TOKEN_IMAGE = "https://secureservercdn.net/160.153.137.163/c1l.a64.myftpupload.com/wp-content/uploads/2022/02/Token-1.svg";

export const MAX_TOKEN_ALLOCATION = 50;
export const PRESALE_RAISE_TARGET = 1000000;
export const MAX_TOKEN_TARGET = 20000;
export const PROVIDER_URL = "https://eth-mainnet.g.alchemy.com/v2/tjP-6hyyZqZsg35yXTFwOQjZGL_Qc-Zt";