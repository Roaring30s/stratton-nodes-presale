import Image from "./Image";
import { usePresale } from "../util/presale";
import presaleInterface from '../core/contracts/presale.json';
import daiInterface from '../core/contracts/dai.json';
import { PRESALE_ADDRESS, DAI_ADDRESS, PBWD_PRICE } from "../core/constants";

export default function PresaleInactive() {
  const { initialized, available, presaleStarted, presaleEnded } = usePresale({ 
    presaleInterface, 
    presaleAddress: PRESALE_ADDRESS,
    daiInterface, 
    daiAddress: DAI_ADDRESS
  });
  const template = (text, subtext) => {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <Image
          width="200"
          height="250"
          src="/logo-white.svg"
          alt="Stratton Logo"
        />
        <p className="text-center text-3xl w-80 mt-8">{text}</p>
        <p className="text-center w-96 mt-4">{subtext}</p>
      </div>
    );
  };

  if(!available && initialized) {
    return (
      <div className="w-[36rem] h-[37rem] mx-auto mt-8 border-2 border-white/30 rounded-[24px] bg-opacity-25 bg-presale-purple p-5 text-white">
        {!presaleStarted &&
          template(
            "The Stratton Presale is coming soon!",
            "This page will update when it begins."
          )}
        {presaleEnded &&
          template(
            "The Stratton Presale has ended.",
            "Follow us on Twitter & Discord for updates."
          )}
      </div>
    );
  } else {
    return null;
  }

}
