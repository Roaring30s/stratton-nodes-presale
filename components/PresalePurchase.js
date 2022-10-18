import * as React from 'react';
import { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { usePresale } from "../util/presale";
import daiInterface from '../core/contracts/dai.json';
import { PRESALE_ADDRESS, DAI_ADDRESS, PBWD_PRICE, MAX_TOKEN_ALLOCATION, CHAIN, MAX_TOKEN_TARGET } from "../core/constants";
import { useMetamask } from "../util/metamask";
import PresalePurchaseMaxAllocation from "./PresalePurchaseMaxAllocation";
import { toHex } from "../util";
import presaleInterface from '../core/contracts/presale.json';
import Alertbox from "./Alertbox";

const SliderMin = 10;

const marks = [
  {
    value: 10,
    label: "10",
  },
  {
    value: 20,
    label: "20",
  },
  {
    value: 30,
    label: "30",
  },
  {
    value: 40,
    label: "40",
  },
  {
    value: 50,
    label: "50",
  },
];

const getValueText = (value) => value.toString();

const valueLabelFormat = (value) =>
  marks.findIndex((mark) => mark.value === value) + 1;

const Loading = () => {
  return (
    <div className="w-[36rem] h-[37rem] mx-auto mt-8  border-2 border-white/30 rounded-[24px] bg-opacity-25 bg-presale-purple p-5 text-white text-center text-2xl flex justify-center items-center">
      Loading...
    </div>
  );
}

const SwitchNetworkMessage = () => {
  return (
    <div className="w-[36rem] h-[37rem] mx-auto mt-8  border-2 border-white/30 rounded-[24px] bg-opacity-25 bg-presale-purple p-5 text-white text-center text-2xl	flex justify-center items-center">
      Please switch networks...
    </div>
  );

}

const ConnectWalletMessage = () => {
  return (
    <div className="w-[36rem] h-[37rem] mx-auto mt-8  border-2 border-white/30 rounded-[24px] bg-opacity-25 bg-presale-purple p-5 text-white text-center text-2xl	flex justify-center items-center">
      Please connect your wallet...
    </div>
  );
}

const PresaleNotAvailable = () => {
  return (
    <div className="w-[36rem] h-[37rem] mx-auto mt-8  border-2 border-white/30 rounded-[24px] bg-opacity-25 bg-presale-purple p-5 text-white">
      Presale not available at the moment.
    </div>
  );
}

export default function PresalePurchase({
  handlePurchase
}) {
  const { initialized, requireApprove, loadButton, presaleStarted, daiBalance, presaleEnded, totalSupply, userRemainingAllocation, approveSpending, deposit, setLoadButton } = usePresale({
    presaleInterface,
    presaleAddress: PRESALE_ADDRESS,
    daiInterface,
    daiAddress: DAI_ADDRESS
  });

  const { status, disconnect, chainId } = useMetamask();

  const [purchaseAmount, setPurchaseAmount] = useState(10);
  const [showError, setShowError] = useState(true);
  const onPurchaseAmountChanged = (event, value, activeThumb) => {
    setPurchaseAmount(value);
  };

  const onBuyClick = () => {
    deposit(purchaseAmount).then(result => {
      if (result) {
        setLoadButton(result);
        handlePurchase(purchaseAmount);
      }
    })
  }
  const onApproveClick = () => {
    approveSpending();
  }

  const handleDisconnectClick = () => {
    disconnect();
  }
  const desiredChainId = toHex(CHAIN.chainId);



  /*
  *TEMPORARILY DISABLED FOR PORTFOLIO VIEWING
  *Note: userRemainingAllocation has been swapped for 50 for non-wallet users to view
  *Note: initialized variable in presale if statement deleted
  *Note: showError disabled on ~line 293
    if (!initialized) {
      if (status === "notConnected") {
        return <ConnectWalletMessage />
      }
      if (desiredChainId !== chainId) {
        return <SwitchNetworkMessage />
      } else {
        return <Loading />
      }
    }
  */
  console.log("Presale Started: ", presaleStarted);
  console.log("Presale End: ", presaleEnded);
  if (!presaleStarted && !presaleEnded && (50 > 0)) {
    return (
      <div className="w-[36rem] h-[37rem] mx-auto mt-8  border-2 border-white/30 rounded-[24px] bg-opacity-30 bg-presale-purple p-5 text-white">
        <div className="grid grid-cols-6">
          <div className="col-start-2 col-span-4">
            <h3 className="text-3xl font-semibold text-white text-center">
              Purchase pBWD*
            </h3>
          </div>

          <div className="col-start-1 col-span-2 pt-3">
            <p className="text-xs">Remaining Allocation</p>
          </div>
          <div className="col-start-4 col-span-1 pt-3">
            <p className="text-xs text-center">{50}/50</p>
          </div>
          <div className="col-span-1 pt-3"></div>
          <div className="col-start-6 col-span-1 pt-3">
            <p className="text-xs text-center">pBWD</p>
          </div>

          <div className="col-start-1 col-span-3 bg-white px-5 py-4 rounded-l my-3 content-center">
            <p className="text-md text-discord-purple font-semibold">Price</p>
          </div>

          <div className="col-start-4 col-span-1 bg-white px-5 py-4 my-3 align-middle">
            <p className="text-md text-center text-presale-blue font-semibold">
              $50
            </p>
          </div>
          <div className="col-span-1 bg-white px-5 py-3 my-3"></div>
          <div className="col-start-6 col-span-1 bg-white px-5 py-3 rounded-r my-3">
            <p className="text-sm text-center font-semibold bg-presale-blue text-white h-full pt-[0.4rem] rounded">
              DAI
            </p>
          </div>

          <div className="col-start-1 col-span-3 bg-white px-5 py-4 rounded-l my-3">
            <p className="text-md text-discord-purple font-semibold">Amount</p>
          </div>
          <div className="col-start-4 col-span-1 bg-white px-5 py-4 my-3">
            <p className="text-md text-center text-presale-blue font-semibold">
              {purchaseAmount}
            </p>
          </div>
          <div className="col-span-1 bg-white px-5 py-3 my-3"></div>
          <div className="col-start-6 col-span-1 bg-white px-5 py-3 rounded-r my-3">
            <p className="text-xs text-center bg-presale-blue text-white h-full pt-2 rounded font-semibold">
              pBWD
            </p>
          </div>

          <div className="col-start-2 col-end-6">
            <Box sx={{ width: "100%" }}>
              <Slider
                aria-label="Restricted values"
                onChange={onPurchaseAmountChanged}
                value={purchaseAmount}
                valueLabelFormat={valueLabelFormat}
                getAriaValueText={getValueText}
                step={null}
                marks={marks.filter((x) => x.value <= (MAX_TOKEN_TARGET - totalSupply < 50 ? MAX_TOKEN_TARGET - totalSupply : 50))}
                min={SliderMin}
                max={MAX_TOKEN_TARGET - totalSupply < 50 ? MAX_TOKEN_TARGET - totalSupply : 50}
                sx={{
                  color: "white",
                  textColor: "white",
                  "& .MuiSlider-markLabel": {
                    color: "#CBFB01",
                    fontFamily: "Plus Jakarta Sans",
                    userSelect: "none",
                  },
                  "& .MuiSlider-markLabelActive": {
                    color: "#FFFFFF",
                  },
                  "& .MuiSlider-mark": {
                    color: "#CBFB01",
                    width: "0.7rem",
                    height: "0.7rem",
                    marginLeft: "-0.35rem",
                    borderRadius: "50%",
                  },
                  "& .MuiSlider-rail": {
                    color: "#CBFB01",
                    opacity: 1,
                    height: "2px",
                  },
                  "& .MuiSlider-track": {
                    color: "#FFFFFF",
                    opacity: 1,
                    height: "2px",
                  },
                }}
              />
            </Box>
          </div>

          <div className="col-start-1 col-span-3 bg-white px-5 py-4 rounded-l my-3">
            <p className="text-md text-discord-purple font-semibold">Total</p>
          </div>
          <div className="col-start-4 col-span-1 bg-white px-5 py-4 my-3">
            <p className="text-md text-center text-presale-blue font-semibold">
              ${purchaseAmount * PBWD_PRICE}
            </p>
          </div>
          <div className="col-span-1 bg-white px-5 py-3 my-3"></div>
          <div className="col-start-6 col-span-1 bg-white px-5 py-3 rounded-r my-3">
            <p className="text-sm text-center bg-presale-blue text-white h-full rounded pt-[0.4rem] font-semibold">
              DAI
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-center mt-10">
          <button
            className="hover:transition-all duration-300 ease-in-out bg-transparent hover:bg-secondary text-white font-semibold hover:text-blue py-4 px-6 border border-white hover:border-transparent font-medium rounded-lg"
            onClick={handleDisconnectClick}
          >
            Disconnect
          </button>
          {requireApprove && !loadButton && (
            <button
              className="hover:transition-all duration-300 ease-in-out bg-white hover:bg-blue-500 hover:text-white text-discord-purple font-bold py-4 px-6 border border-white hover:border-transparent rounded-lg ml-3 w-[10rem]"
              onClick={onApproveClick}
            >
              Approve DAI
            </button>
          )}
          {!requireApprove && !loadButton && (
            <button
              className={purchaseAmount * PBWD_PRICE > daiBalance ?
                "hover:transition-all duration-300 ease-in-out bg-discord-purple text-white font-bold py-4 px-6 rounded-lg ml-3 w-[10rem]"
                :
                "hover:transition-all duration-300 ease-in-out bg-lime hover:bg-green-500 hover:text-white text-landing-black font-bold py-4 px-6 border border-lime hover:border-transparent rounded-lg ml-3 w-[10rem]"
              }
              onClick={onBuyClick}
              disabled={purchaseAmount * PBWD_PRICE > daiBalance ? true : false}
            >
              {purchaseAmount * PBWD_PRICE > daiBalance ? "Insufficient DAI" : `Buy ${purchaseAmount} pBWD`}
            </button>
          )}
          {loadButton && (
            <button
              className="animate-bounce hover:transition-all duration-300 ease-in-out bg-white hover:bg-green-500 hover:text-white text-discord-purple font-bold py-4 px-6 border border-white hover:border-transparent rounded-lg ml-3 w-[10rem]"
              disabled
            >
              Processing...
            </button>
          )}


        </div>

        <div className="mt-5">
          <p className="text-xs text-center">
            *pBWD is our Public Presale Token.
          </p>
          <p className="text-xs text-center mt-3">
            The token will give the holder the option to purchase a BWD node when
            the Stratton Nodes dApp goes live.
          </p>
        </div>
        <div className="w-full mt-3">
          {/*showError && (
            <Alertbox
              time={200}
              color={"error"}
              title={"Error"}
              message={"Transaction Failed! We just sold out of pBWD tokens."}
              class={"p-2 m-2"}
            />
          )*/}
        </div>
      </div>

    );
  } else {
    return (
      <PresalePurchaseMaxAllocation
        handleDisconnect={handleDisconnectClick}
        amountPurchased={MAX_TOKEN_ALLOCATION}
      />
    )
  }

}
