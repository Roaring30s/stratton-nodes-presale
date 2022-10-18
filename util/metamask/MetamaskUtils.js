export const useMetamaskUtils = () => {
    const formatWalletId = (walletId) => {
      // check we have at least 11 chars, otherwise there's no need to shorten
      if (walletId.length <= 11) {
        return walletId;
      }
      const start = walletId.substring(0, 6);
      const end = walletId.substring(walletId.length-4);
      return `${start}...${end}`;
    };
    
    return {
        formatWalletId
    }


};