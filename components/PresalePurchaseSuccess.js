import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import presaleInterface from '../core/contracts/presale.json';
import daiInterface from '../core/contracts/dai.json';
import { PRESALE_ADDRESS, DAI_ADDRESS, PBWD_PRICE, MAX_TOKEN_ALLOCATION } from "../core/constants";
import { usePresale } from "../util/presale";

export default function PresalePurchaseSuccess({
  handleBack,
  handleDisconnect,
  amountPurchased
}) {
  const { initialized, presaleEnded, userRemainingAllocation } = usePresale({ 
    presaleInterface, 
    presaleAddress: PRESALE_ADDRESS,
    daiInterface, 
    daiAddress: DAI_ADDRESS
  });
  const onBackClick = () => handleBack();
  const onDisconnectClick = () => handleDisconnect();

  const normalise = (amount) => (amount * 100) / MAX_TOKEN_ALLOCATION;

  if(!presaleEnded) {
    return (
      <div className="w-[36rem] h-[37rem] mx-auto mt-8 border-2 border-white/30 rounded-[24px] bg-opacity-25 bg-presale-purple p-5 text-white">
        <div className="flex flex-col justify-center items-center h-full">
          <p className="text-center text-3xl w-[23rem]">
            Success! Your purchase of {amountPurchased} pBWD is complete.
          </p>
          { initialized ?
            <div className="relative mt-8 mb-6">
            <CircularProgress
              variant="determinate"
              value={normalise(MAX_TOKEN_ALLOCATION-userRemainingAllocation)}
              size={160}
              color="inherit"
            />
            <div className="flex flex-col justify-center text-center absolute top-0 left-0 w-[10rem] h-[10rem]">
              <span className="font-semibold text-2xl">
                {MAX_TOKEN_ALLOCATION-userRemainingAllocation}
              </span>
              <span className="font-light">Out of {MAX_TOKEN_ALLOCATION}</span>
            </div>
          </div>
          :
          <p className="text-center text-1xl w-[23rem]">Loading your remaining allocation...</p>
          }

          {(MAX_TOKEN_ALLOCATION-userRemainingAllocation) === MAX_TOKEN_ALLOCATION && (
            <p>You&apos;ve purchased your full allocation.</p>
          )}
          <div className="mt-8">
            {(MAX_TOKEN_ALLOCATION-userRemainingAllocation) !== MAX_TOKEN_ALLOCATION && (
              <button
                className="hover:transition-all duration-300 ease-in-out bg-primary hover:bg-white text-white hover:text-primary font-bold py-3 px-7 mr-6 border border-primary hover:border-transparent rounded-lg"
                onClick={onBackClick}
              >
                Go back
              </button>
            )}
  
            <button
              className="hover:transition-all duration-300 ease-in-out bg-transparent hover:bg-secondary text-white font-semibold hover:text-white py-3 px-7 border hover:border-transparent rounded-lg"
              onClick={onDisconnectClick}
            >
              Disconnect
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
