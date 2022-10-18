import { useMetamask, switchOrAddChain } from "../util/metamask";
import { CHAIN } from "../core/constants";
import WarningIcon from "@mui/icons-material/Warning";
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import { toHex } from "../util";

const SwitchNetwork = () => {
    const handleSwitchNetworkClick = async () => {
        await switchOrAddChain(toHex(CHAIN.chainId), {
            chainId: toHex(CHAIN.chainId),
            chainName: CHAIN.name,
            nativeCurrency: {
              name: CHAIN.nativeCurrency.name,
              symbol: CHAIN.nativeCurrency.symbol,
              decimals: CHAIN.nativeCurrency.decimals,
            },
            rpcUrls: CHAIN.rpc,
            blockExplorerUrls: [ ((CHAIN.explorers && CHAIN.explorers.length > 0 && CHAIN.explorers[0].url) ? CHAIN.explorers[0].url : CHAIN.infoURL) ]
         });
    };

    return (
        <button
            type="button"
            className="flex items-center hover:transition-all duration-300 ease-in-out mx-1 hover:text-discord-purple border-2 border-white hover:bg-white font-medium rounded-lg text-sm pl-4 pr-5 mb-2 bg-discord-purple text-white h-full"
            onClick={handleSwitchNetworkClick}>
            <WarningIcon className="mr-1" />
            <span>Switch Network</span>
        </button>
    );
}

const DisplayNetwork = () => {
    return (
        <button
            type="button"
            className="flex items-center hover:transition-all duration-300 ease-in-out mx-1 hover:text-discord-purple border border-white hover:bg-white font-medium rounded-lg text-sm pl-4 pr-5 mb-2 bg-discord-purple text-white h-full">
            <ChangeHistoryIcon className="mr-1" />
            <span>{CHAIN.shortName}</span>
        </button>
    );
}

export const Network = () => {
    const { status, chainId } = useMetamask();
    const desiredChainId = toHex(CHAIN.chainId);

    if (status !== 'connected') {
        return <></>;
    }

    return chainId === desiredChainId 
        ? <DisplayNetwork />
        : <SwitchNetwork />
}