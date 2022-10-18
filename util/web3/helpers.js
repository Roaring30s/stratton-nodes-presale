const modifyWalletAddr = walletAddr => {
    let modAddr = '';
    modAddr += walletAddr.substring(0, 5)+'...'+walletAddr.slice(-4);
    return modAddr;
}

export default modifyWalletAddr;