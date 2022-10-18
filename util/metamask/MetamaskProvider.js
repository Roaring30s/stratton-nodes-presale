import React, { useEffect, useMemo, useState, useCallback } from "react";
import { MetamaskContext } from "./MetamaskContext";
import { ethers } from "ethers";
import { SUPPORTED_NETWORKS } from "../../core/constants";


const LOCALSTORAGE_DISCONNECT_KEY = "stcs";

export const MetamaskProvider = (props) => {
    const [status, setStatus] = useState("initializing");
    const [account, setAccount] = useState();
    const [chainId, setChainId] = useState();
    const [userBalance, setUserBalance] = useState();

    const isConnected = status === "connected";
    const isAvailable = status !== "unavailable" && status !== "initializing";
    let isMetamaskAvailable = false;

    const initialize = async () => {
        //const isMetamaskAvailable = !!window.ethereum && window.ethereum.isMetaMask;
        if (!isMetamaskAvailable) {
            setStatus("unavailable");
            return;
        }

        const chainId = await window.ethereum.request({ method: "eth_chainId" });
        setChainId(chainId);

        const isDisconnected = !!localStorage.getItem(LOCALSTORAGE_DISCONNECT_KEY);

        if (isDisconnected) {
            setStatus("notConnected");
            return;
        }

        const accessibleAccounts = await window.ethereum.request({
            method: "eth_accounts",
        });

        if (accessibleAccounts.length === 0) {
            setStatus("notConnected");
        } else {
            setAccount(accessibleAccounts[0]);
            setStatus("connected");
        }
    };

    const connectAndGetAccounts = async () => {
        if (!!window.ethereum && window.ethereum.isMetaMask) {
            setStatus("connecting");

            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });

                const chainId = await window.ethereum.request({ method: "eth_chainId" });

                setAccount(accounts[0]);
                setChainId(chainId);
                setStatus("connected");
                return accounts;
            } catch (err) {
                setStatus("notConnected");
                // Ignore 4001 ('request was rejected by the user') errors
                if (err?.code !== 4001) {
                    throw err;
                }
            }
        }
    };

    const getUserBalance = async () => {
        if (!!window.ethereum && window.ethereum.isMetaMask) {
            const balance = await window.ethereum.request({ method: 'eth_getBalance', params: [account, 'latest'] });
            setUserBalance(ethers.utils.formatEther(balance));
        }
    }

    const changeNetwork = async (networkName) => {
        if (!!window.ethereum && window.ethereum.isMetaMask) {
            try {
                if (!window.ethereum) throw new Error("No wallet found!")
                await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [
                        {
                            ...SUPPORTED_NETWORKS[networkName]
                        }
                    ]
                });
            } catch (err) {
                console.log("NO WALLET DETECTED", err.message);
            }
        }
    }

    useEffect(() => {
        if (status !== "initializing") {
            return;
        }

        initialize();
    }, []);

    useEffect(() => {
        if (!!window.ethereum && window.ethereum.isMetaMask) {
            if (!isConnected) return;

            const onAccountsChanged = (accounts) => {
                if (accounts.length === 0) {
                    setStatus('notConnected');
                    setAccount(null);
                    setUserBalance(null);
                } else {
                    setAccount(accounts[0]);
                }
            }
            window.ethereum.on("accountsChanged", onAccountsChanged);

            return () => {
                window.ethereum.removeListener("accountsChanged", onAccountsChanged);
            };
        }
    }, [isConnected]);

    useEffect(() => {
        if (!!window.ethereum && window.ethereum.isMetaMask) {
            const onAccountsChanged = (accounts) => {
                // Time to reload your interface with accounts[0]!
                setAccount(accounts[0]);
            }
            window.ethereum.on("accountsChanged", onAccountsChanged);
            return () => window.ethereum.off("accountsChanged", onAccountsChanged);
        }
    }, []);


    useEffect(() => {
        if (!!window.ethereum && window.ethereum.isMetaMask) {
            if (!isConnected) return;

            // https://docs.metamask.io/guide/ethereum-provider.html#chainchanged
            // We strongly recommend reloading the page on chain changes, unless you have good reason not to.
            const onChainChanged = () => window.location.reload();
            window.ethereum.on('chainChanged', onChainChanged);

            return () => {
                window.ethereum.removeListener("chainChanged", onChainChanged);
            };
        }
    }, [isConnected]);

    useEffect(() => {
        if (!!window.ethereum && window.ethereum.isMetaMask) {
            if (!isConnected) return;
            getUserBalance();
        }
    }, [isConnected, account]);


    const connect = useCallback(() => {
        if (!!window.ethereum && window.ethereum.isMetaMask) {
            if (!isAvailable) {
                console.warn(
                    "`connect` method has been called while MetaMask is not available or initializing."
                );
                return Promise.resolve([]);

            }
            localStorage.removeItem(LOCALSTORAGE_DISCONNECT_KEY);

            return connectAndGetAccounts();
        }
    }, [isAvailable]);

    const disconnect = useCallback(() => {
        if (!!window.ethereum && window.ethereum.isMetaMask) {
            setStatus('notConnected');
            setAccount(null);
            setUserBalance(null);

            // persist some value to localstorage in order to `pretend` a disconnected status
            localStorage.setItem(LOCALSTORAGE_DISCONNECT_KEY, "1");
        }
    }, []);

    const addToken = useCallback(({ address, symbol, decimals, image }) => {
        if (!!window.ethereum && window.ethereum.isMetaMask) {
            return ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address,
                        symbol,
                        decimals,
                        image
                    },
                },
            });
        }
    }, []);

    const value = useMemo(
        () => ({
            status,
            account,
            chainId,
            userBalance,
            connect,
            disconnect,
            addToken,
            changeNetwork
        }),
        [status, account, chainId, userBalance, connect, disconnect, addToken, changeNetwork]
    );

    return <MetamaskContext.Provider value={value} {...props} />;
};