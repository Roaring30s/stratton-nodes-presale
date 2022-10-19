import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import styles from "../styles/Index.module.css";
import { ThemeProvider } from "@mui/system";
import customTheme from "../themes/custom";
import Navigation from "../components/Navigation";
import Presale from "../components/Presale";
import Countdown from "../components/Countdown";
import Community from "../components/Community";
import "@fontsource/plus-jakarta-sans";
import { MetamaskProvider } from "../util/metamask/MetamaskProvider";

const presaleStartConfig = new Date(process.env.presaleStart);
const presaleEndConfig = new Date(process.env.presaleEnd);

const calculatePresaleStatus = () => {
  const differenceStartDate = +presaleStartConfig - +new Date();
  const differenceEndDate = +presaleEndConfig - +new Date();

  const status = {
    state: {
      presaleStarted: differenceStartDate <= 0,
      presaleEnded: differenceEndDate <= 0,
    },
    timeUntilStart: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    timeUntilEnd: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
  };

  if (differenceStartDate > 0) {
    status.timeUntilStart = {
      days: Math.floor(differenceStartDate / (1000 * 60 * 60 * 24)),
      hours: Math.floor((differenceStartDate / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((differenceStartDate / 1000 / 60) % 60),
      seconds: Math.floor((differenceStartDate / 1000) % 60),
    };
  }

  if (differenceEndDate > 0) {
    status.timeUntilEnd = {
      days: Math.floor(differenceEndDate / (1000 * 60 * 60 * 24)),
      hours: Math.floor((differenceEndDate / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((differenceEndDate / 1000 / 60) % 60),
      seconds: Math.floor((differenceEndDate / 1000) % 60),
    };
  }
  return status;
};

const handleDisconnect = () => {
  // TODO: Implement me
  console.log("disconnect clicked");
  //Sebastian
};

export default function Index() {

  const address = '0x5B7692f2ea5653F4e4EEc8697dD4D7B2532B2F4a';
  const onboarding = useRef();
  const [networkStatus, setNetworkStatus] = useState("Switch Network");
  const [showNavigation, setShowNavigation] = useState(false);
  const [presaleStatus, setPresaleStatus] = useState({
    state: {
      presaleStarted: false,
      presaleEnded: false,
    },
    timeUntilStart: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    timeUntilEnd: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
  });

  useEffect(() => {
    const status = calculatePresaleStatus();
    setPresaleStatus(status);

    const interval = setInterval(() => {
      setPresaleStatus(calculatePresaleStatus());
    }, 1000);
    setShowNavigation(true);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='min-w-[46rem] bg-gradient-to-b from-[#48247c] to-[#241070]'>
      <Head>
        <title>Stratton Public Presale</title>
        <meta
          name="description"
          content="Public presale event page for Stratton Nodes"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MetamaskProvider>
        <ThemeProvider theme={customTheme}>
          <nav>
            {showNavigation && (
              <Navigation />
            )}
          </nav>
          <main className={styles.main}>
            <Presale
              presaleStarted={presaleStatus.state.presaleStarted}
              presaleEnded={presaleStatus.state.presaleEnded}
              handleDisconnect={handleDisconnect}
            />
            <Countdown
              started={presaleStatus.state.presaleStarted}
              timeLeft={
                !presaleStatus.state.presaleStarted
                  ? presaleStatus.timeUntilStart
                  : presaleStatus.timeUntilEnd
              }
            />
          </main>

          <footer className={styles.footer}>
            <Community />
          </footer>
        </ThemeProvider>
      </MetamaskProvider>
    </div>
  );
}
