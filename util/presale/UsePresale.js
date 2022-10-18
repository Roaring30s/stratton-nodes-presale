import { useMetamask } from "../metamask";
import { toHex } from "../";
import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import { CHAIN, PRESALE_ADDRESS, PBWD_PRICE, PBWD_TOKEN_ADDRESS, PBWD_TOKEN_DECIMALS, DAI_TOKEN_DECIMALS, PROVIDER_URL } from "../../core/constants";
import pBWDInterface from '../../core/contracts/pbwd.json';

export const usePresale = ({ presaleInterface, presaleAddress, daiInterface, daiAddress }) => {
    const { account, chainId, status } = useMetamask();
    const [initialized, setIsInitialized] = useState(false);
    const [available, setIsAvailable] = useState(false);
    const [requireApprove, setRequireApprove] = useState(false);
    const [userRemainingAllocation, setUserRemainingAllocation] = useState(0);
    const [totalRaisedDAI, setTotalRaisedDAI] = useState(0);
    const [presaleStarted, setStarted] = useState(false);
    const [presaleEnded, setEnded] = useState(false);
    const [loadButton, setLoadButton] = useState(false);
    const [pbwdBalance, setPBWDBalance] = useState(0);
    const [daiBalance, setDaiBalance] = useState(0);
    const [totalSupply, setTotalSupply] = useState(0);

    let provider;
    if (!!window.ethereum && window.ethereum.isMetaMask) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
    } else {
        provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);
    }
    const presaleContract = new ethers.Contract(
        presaleAddress,
        presaleInterface,
        provider.getSigner()
    );
    const daiContract = new ethers.Contract(
        daiAddress,
        daiInterface,
        provider.getSigner()
    );

    const pbwdContract = new ethers.Contract(
        PBWD_TOKEN_ADDRESS,
        pBWDInterface,
        provider.getSigner()
    );

    useEffect(() => {
        setIsInitialized(false);
        if (status !== 'connected' || chainId !== toHex(CHAIN.chainId)) { return; }

        const fetchContractStatus = async () => {
            const contractPaused = await presaleContract
                .contractPaused();

            const ended = await presaleContract
                .ended();
            setEnded(ended);

            const started = await presaleContract
                .started();
            setStarted(started);

            setIsAvailable(!contractPaused && !ended && !!started);
        }

        const fetchApproveStatus = async () => {
            const response = await daiContract
                .allowance(account, presaleAddress);

            setRequireApprove(response <= 0);
        };

        const fetchUserRemainingAllocation = async () => {
            const response = await presaleContract
                .getUserRemainingAllocation(account);

            setUserRemainingAllocation(response / Math.pow(10, 18));
        }

        const fetchTotalSupply = async () => {
            const mintedSupply = await pbwdContract
                .totalSupply();

            const parseSupply = parseInt(ethers.utils.formatUnits(mintedSupply, PBWD_TOKEN_DECIMALS));

            setTotalSupply(parseSupply);

            //COME BACK TO ME
        }

        const fetchTotalRaised = async () => {
            const response = await presaleContract
                .totalRaisedDAI();

            setTotalRaisedDAI(response / Math.pow(10, 18));
        }

        const initialize = async () => {
            await fetchContractStatus();
            await fetchApproveStatus();
            await fetchUserRemainingAllocation();
            await fetchTotalRaised();
            await retrievepBWDBalance();
            await retrieveDaiBalance();
            await fetchTotalSupply();

            setIsInitialized(true);
        };

        initialize();
    }, [status, account, chainId, presaleAddress]);


    const approveSpending = useCallback(async () => {
        try {
            setLoadButton(true);
            const transaction = await daiContract.approve(PRESALE_ADDRESS, ethers.constants.MaxUint256);
            await transaction.wait();
            setRequireApprove(false);
            setLoadButton(false);
        } catch (err) {
            setLoadButton(false);
        }

    }, [account, presaleAddress, daiAddress]);

    const retrievepBWDBalance = useCallback(async () => {
        const signerAddress = await provider.getSigner().getAddress();
        const bigNumBalance = await pbwdContract.balanceOf(signerAddress);
        const userTokenBalance = parseInt(ethers.utils.formatUnits(bigNumBalance, PBWD_TOKEN_DECIMALS));
        setPBWDBalance(userTokenBalance);
    }, [account, totalRaisedDAI]);

    const retrieveDaiBalance = useCallback(async () => {
        const signerAddress = await provider.getSigner().getAddress();
        const bigNumBalance = await daiContract.balanceOf(signerAddress);
        const userTokenBalance = parseInt(ethers.utils.formatUnits(bigNumBalance, DAI_TOKEN_DECIMALS));
        setDaiBalance(userTokenBalance);
    }, [account, totalRaisedDAI]);

    const deposit = useCallback(async (amount) => {
        try {
            setLoadButton(true);
            amount = amount * PBWD_PRICE;
            amount = amount.toString();
            let final = ethers.utils.parseUnits(amount);
            const transaction = await presaleContract.deposit(final._hex);
            await transaction.wait();
            setLoadButton(false);
            setUserRemainingAllocation(allocation => allocation - amount);
            return true;
        } catch (err) {
            setLoadButton(false);
            return false;
        }
    }, [account, presaleAddress]);

    return { initialized, available, pbwdBalance, daiBalance, totalSupply, loadButton, requireApprove, userRemainingAllocation, totalRaisedDAI, presaleStarted, presaleEnded, approveSpending, deposit, setLoadButton };
}
