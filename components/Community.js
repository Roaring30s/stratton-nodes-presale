import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import DiscordIcon from "./DiscordIcon";
import DocsIcon from "./DocsIcon";
import Image from 'next/image'
//"linear-gradient(to right, #241070, transparent, #200464), url('/logo-only.svg')"
//bg-black w-full bg-[url('/logo-only.svg')]
export default function Community() {
  return (
    <div className="w-full bg-[url('/logo-only.svg')] bg-no-repeat bg-footer bg-footer-pos">
      <div className="flex flex-col items-center relative -mt-community z-10">
        <div className="text-white mb-8">
          <h3 className="text-5xl">Join Our Community</h3>
        </div>
        <div className="mb-2">
          <p className="text-discord-purple text-2xl">Buy. Win. Degen.</p>
        </div>
        <div className="flex flex-row flex-wrap justify-center mb-32 text-white">
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="flex flex-col h-35 w-48 border-2 border-white/70 rounded-[24px] py-2 px-4 mx-4 mt-8 items-center hover:transition-all duration-300 ease-in-out hover:text-landing-black bg-gradient-to-b from-discord-purple/70 to-primary/50 hover:bg-none hover:bg-lime hover:border-landing-black"
          >
            <div>
              <TwitterIcon
                className="mb-6 mt-3 ml-1 mr-1"
                style={{ fontSize: 50 }}
              />
              <p>Twitter</p>
            </div>
          </a>
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="flex flex-col h-35 w-48 border-2 border-white/70 rounded-[24px] py-2 px-4 mx-4 mt-8 items-center hover:transition-all duration-300 ease-in-out hover:text-landing-black fill-white hover:fill-landing-black bg-gradient-to-b from-discord-purple/70 to-primary/50 hover:bg-none hover:bg-lime hover:border-landing-black"
          >
            <div className="mb-6 mt-3 ml-1 mr-1">
              <DiscordIcon width="50" height="50" />
            </div>
            <p>Discord</p>
          </a>
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="flex flex-col h-36 w-48 border-2 border-white/70 rounded-[24px] py-2 px-4 mx-4 mt-8 items-center hover:transition-all duration-300 ease-in-out hover:text-landing-black bg-gradient-to-b from-discord-purple/70 to-primary/50 hover:bg-none hover:bg-lime hover:border-landing-black"
          >
            <GitHubIcon
              className="mb-6 mt-3 ml-1 mr-1"
              style={{ fontSize: 50 }}
            />
            <p>GitHub</p>
          </a>
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="flex flex-col h-36 w-48 border-2 border-white/70 rounded-[24px] py-2 px-4 mx-4 mt-8 items-center hover:transition-all duration-300 ease-in-out hover:text-landing-black fill-white hover:fill-landing-black bg-gradient-to-b from-discord-purple/70 to-primary/50 hover:bg-none hover:bg-lime hover:border-landing-black"
          >
            <div className="mb-6 mt-3 ml-1 mr-1">
              <DocsIcon width="50" height="50" />
            </div>
            <p>Docs</p>
          </a>
        </div>
        <div className="relative -mt-community">
          <Image
            src="/static/img/stratton_partnership.svg"
            alt="Stratton x Avalanche"
            width="450"
            height="225"
          />
        </div>
        <p className="text-center font-light text-sm text-slate-400 relative -mt-4 mb-8 px-8">
          Only non-US persons will be eligible to participate. By participating
          in the Stratton pBWD presale you acknowledge and agree to the &nbsp;
          <a
            className="underline"
            target="_blank"
            rel="noreferrer"
            href="#"
          >
            pBWD token sale terms
          </a>
        </p>
      </div>
    </div>
  );
}
