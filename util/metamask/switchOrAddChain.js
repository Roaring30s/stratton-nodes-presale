/**
 * Switch or Add Fuji Mainnet is nonexistent in EOA
 * @param {string} chainId - Chain Id denominated in 0x...
 * @param {object} chainParams - Contains decimal, symbol, rpc etc
 */
export const switchOrAddChain = async (chainId, chainParams) => {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId }],
        });
    }
    catch (err) {
        if (err.code === 4902) {
            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{ ...chainParams, chainId }],
            });
        }
    }
};