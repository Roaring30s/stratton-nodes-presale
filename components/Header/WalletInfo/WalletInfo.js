import clsx from "clsx";
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { useMetamaskUtils } from "../../../util/metamask/MetamaskUtils";

const sharedClasses = 'flex items-center text-md text-white rounded-xl';
const BWD_TOKEN_NAME = 'pBWD'
export const WalletInfo = ({ status, account, userBalance = 0.0 }) => {
  const { formatWalletId } = useMetamaskUtils();
  const formattedAccount = formatWalletId(account);

  const walletConnected = status === "connected";
  const jazzIcon = walletConnected && <div className="ml-2">
    <Jazzicon diameter={20} seed={jsNumberForAddress(account)} />
  </div>;

  const inner = <div
    className={clsx(
      'justify-center pl-4 pr-4 py-2 bg-indigo-500 border border-indigo-500 h-max',
      walletConnected && 'ml-4',
      sharedClasses
    )}
  >
    <span>
      {walletConnected && formattedAccount}
      {!walletConnected && <span className="whitespace-nowrap">No wallet detected</span>}
    </span>
    {jazzIcon}
  </div>;

  return (
    <div
      className={clsx(
        'transition-width duration-300 w-min justify-between bg-indigo-400 h-full mx-1',
        walletConnected && 'pl-4',
        sharedClasses
      )}
    >
      {walletConnected && <span className="whitespace-nowrap">{userBalance} {BWD_TOKEN_NAME}</span>}
      {inner}
    </div>
  );
};
