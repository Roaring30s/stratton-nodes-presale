import EastIcon from "@mui/icons-material/East";
import getPresaleDateStrings from "../util/presaleDates";
import presaleInterface from '../core/contracts/presale.json';
import daiInterface from '../core/contracts/dai.json';
import { PRESALE_ADDRESS, DAI_ADDRESS, PBWD_PRICE } from "../core/constants";
import { usePresale } from "../util/presale";


export default function PresaleInfo({ presaleTarget }) {
  const { totalRaisedDAI, userRemainingAllocation, available } = usePresale({
    presaleInterface,
    presaleAddress: PRESALE_ADDRESS,
    daiInterface,
    daiAddress: DAI_ADDRESS
  });
  const [presaleStart, presaleEnd] = getPresaleDateStrings();

  const dollarfy = (amount) => {
    amount = parseFloat(amount).toFixed(0);
    amount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); let f = '$' + amount; return f;
  }

  return (
    <div className="min-w-fit mx-auto flex flex-col mx-auto lg:pr-4 justify-between">
      <div className="mt-12">
        <h1 className="text-5xl font-semibold text-white">
          Stratton Public Presale
        </h1>
        <p className="text-white mt-4">
          An opportunity to invest in Stratton Nodes early.
        </p>
        <div className="mt-12 mb-36">
          <a
            className="hover:transition-all duration-300 ease-in-out bg-lime border-lime hover:bg-white text-landing-black hover:text-primary font-bold py-3 px-7 border border-primary hover:border-transparent rounded-lg"
            target="_blank"
            rel="noreferrer"
            href="https://discord.gg/strattonnodes"
          >
            Join Discord
          </a>

          <a
            className="hover:transition-all duration-300 ease-in-out bg-transparent hover:bg-secondary text-lime font-semibold hover:text-white py-3 px-7 ml-6 border-lime border-2 hover:border-transparent rounded-lg"
            target="_blank"
            rel="noreferrer"
            href="https://stratton-nodes.gitbook.io/main/"
          >
            Learn More
          </a>
        </div>
      </div>

      <div className="text-white border-2 border-white/30 rounded-[24px] bg-opacity-25 bg-presale-purple p-5">
        <p>The Stratton Public Presale will be held from:</p>
        <div className="mt-5">
          <span className="bg-secondary py-2 px-3 rounded-lg border border-secondary">
            {presaleStart}
          </span>
          <EastIcon className="mb-1 ml-1 mr-1" />
          <span className="bg-secondary py-2 px-3 rounded-lg border border-white">
            {presaleEnd}
          </span>
        </div>
        <div className="mt-10 flex flex-row justify-between">
          <div>
            <p className="text-white text-xl">
              {(available && "Amount Raised") || "Target Raise"}
            </p>
            {available && (
              <p className="text-gray-500	">Initial Target: $1,000,000</p>
            )}
          </div>
          <p className="text-white text-4xl mt-15">
            {(available && dollarfy(totalRaisedDAI)) || "-"}
          </p>

        </div>
      </div>
    </div>
  );
}
