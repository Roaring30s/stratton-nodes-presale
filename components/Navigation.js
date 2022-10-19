import React from "react";
import Image from 'next/image';
import { useMetamask } from "../util/metamask";
import { Network } from "./Network";
import { PBWD_TOKEN_ADDRESS, PBWD_TOKEN_SYMBOL, PBWD_TOKEN_DECIMALS, PBWD_TOKEN_IMAGE, PRESALE_ADDRESS, DAI_ADDRESS } from '../core/constants';
import { WalletInfo } from "./Header/WalletInfo";
import { usePresale } from "../util/presale";
import daiInterface from '../core/contracts/dai.json';
import presaleInterface from '../core/contracts/presale.json';

export default function Navigation(props) {

  const { status, account, connect, disconnect, addToken } = useMetamask();

  const { pbwdBalance } = usePresale({
    presaleInterface,
    presaleAddress: PRESALE_ADDRESS,
    daiInterface,
    daiAddress: DAI_ADDRESS
  });

  const handleConnectClick = () => {
    connect();
  }

  const handleDisconnectClick = () => {
    disconnect();
  }

  const handleAddPBWDToken = async () => {
    await addToken({
      address: PBWD_TOKEN_ADDRESS,
      symbol: PBWD_TOKEN_SYMBOL,
      decimals: PBWD_TOKEN_DECIMALS,
      image: PBWD_TOKEN_IMAGE
    });
  }

  return (
    <div className="text-white relative z-100">
      <div className="flex justify-between items-center p-2">
        <div className="flex justify-between w-full">
          <Image
            src="/static/img/logo-with-text.svg"
            alt="Stratton Nodes Logo"
            width="317"
            height="55"
          />
        </div>

        <div className="grid grid-flow-col auto-cols-max relative z-20">
          <Network />
          {/*Wallet*/}
          {account && status == "connected" && (
            <WalletInfo
              account={account}
              status={status}
              userBalance={pbwdBalance}
              className="h-full"
            />
          )}
          {account && status == "notConnected" && (
            <WalletInfo status={status} />
          )}
          {/*Add pBWD Token*/}
          <button
            type="button"
            className="flex items-center mx-1 p-1 mb-2 text-sm font-medium text-white bg-discord-purple rounded-lg border-2 border-white justify-center px-3 h-full"
            onClick={handleAddPBWDToken}
          >
            <div className="mr-1 mt-1">
              <Image
                src="/static/img/logo.svg"
                alt="Stratton Logo"
                width="20"
                height="20"
              />
            </div>
            <span className="mb-0.15">Add pBWD</span>
          </button>
          {status !== 'connected' ? (
            <>
              {/* Connect */}
              <button
                type="button"
                className="hover:transition-all duration-300 ease-in-out mx-1 p-1 text-landing-black bg-lime font-semibold rounded-lg text-sm px-5 text-center mb-2 shadow-sm shadow-lime/50 h-full"
                onClick={handleConnectClick}
              >
                Connect Wallet
              </button>
            </>
          ) : (
            <>
              {/* Disconnect */}
              <button
                type="button"
                className="hover:transition-all duration-300 ease-in-out mx-1 p-1 text-landing-black bg-lime font-semibold rounded-lg text-sm px-5 text-center mb-2 shadow-sm shadow-lime/50 h-full"
                onClick={handleDisconnectClick}
              >
                Disconnect Wallet
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
