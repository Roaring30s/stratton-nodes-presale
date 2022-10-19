import { useMetamask } from "../util/metamask";
import { useEffect, useState } from "react";
import { MAX_TOKEN_ALLOCATION, PRESALE_RAISE_TARGET } from "../core/constants";
import Circles from "./Circles";
import PresaleInactive from "./PresaleInactive";
import PresaleInfo from "./PresaleInfo";
import PresalePurchase from "./PresalePurchase";
import PresalePurchaseSuccess from "./PresalePurchaseSuccess";

export default function Presale({ presaleStarted, presaleEnded }) {
  const { disconnect } = useMetamask();
  const handleDisconnectClick = () => {
    disconnect();
    setShowPurchaseSuccess(false);
  };

  const [showPresaleInfo, setShowPresaleInfo] = useState(false);
  const [showPresalePurchase, setShowPresalePurchase] = useState(false);
  const [showPresaleInactive, setShowPresaleInactive] = useState(false);
  const [showPresaleSuccess, setShowPresaleSuccess] = useState(false);
  /*
  Allow Presale Hook to connect to the PresaleInfo but first making component
  render after the hook is done
  */
  useEffect(() => {
    setShowPresaleInfo(true);
    setShowPresaleInactive(true);
    setShowPresalePurchase(true);
    setShowPresaleSuccess(true);
  }, [])

  const [remainingAllocation, setRemainingAllocation] =
    useState(MAX_TOKEN_ALLOCATION);

  const [lastAmountPurchased, setLastAmountPurchased] =
    useState(MAX_TOKEN_ALLOCATION);

  const [showPurchaseSuccess, setShowPurchaseSuccess] = useState(false);

  const handlePurchase = (amount) => {
    setLastAmountPurchased(amount);
    setRemainingAllocation(remainingAllocation - amount);
    setShowPurchaseSuccess(true);
  };

  const closePresalePurchaseSuccess = () => {
    setShowPurchaseSuccess(false);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center relative">
      <Circles />
      <div className="pt-10 pb-16 px-10 flex flex-wrap relative z-10">
        {showPresaleInfo ? (
          <PresaleInfo
            presaleStarted={presaleStarted}
            presaleTarget={PRESALE_RAISE_TARGET}
          />
        ) : (
          ""
        )}

        {showPurchaseSuccess && (
          <PresalePurchaseSuccess
            handleBack={closePresalePurchaseSuccess}
            handleDisconnect={handleDisconnectClick}
            amountPurchased={lastAmountPurchased}
          />
        )}

        {!showPurchaseSuccess && showPresalePurchase && (
          <PresalePurchase
            handlePurchase={handlePurchase}
            handleDisconnect={handleDisconnectClick}
          />
        )}

        {
          showPresaleInactive ?
            <PresaleInactive

            />
            :
            null
        }
      </div>
    </div>
  );
}
