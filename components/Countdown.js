import React from "react";
import CountdownNumber from "./CountdownNumber";

const getDigits = (num) => {
  var digits = [];
  digits.push(num % 10);
  num = Math.trunc(num / 10);
  digits.push(num % 10);
  digits.reverse();
  return digits;
};

export default function Countdown({ started, timeLeft }) {
  const [d1, d2] = getDigits(timeLeft.days);
  const [h1, h2] = getDigits(timeLeft.hours);
  const [m1, m2] = getDigits(timeLeft.minutes);
  const [s1, s2] = getDigits(timeLeft.seconds);

  return (
    <div className="w-full bg-countdown bg-hero bg-no-repeat h-[31rem] flex justify-center items-center">
      <div className="w-fit -mt-[2.5rem]">
        <div className="text-3xl text-white text-center -mt-[1rem]">
          {(!started && "Starting in:") || "Ending in:"}
        </div>
        <div className="flex flex-row mt-[2.5rem]">
          <div className="flex flex-col mr-6">
            <div className="flex flex-row">
              <CountdownNumber number={d1} />
              <CountdownNumber number={d2} digitTwo />
            </div>
            <div className="text-lg text-white text-center mt-3">Days</div>
          </div>
          <div className="flex flex-col mr-6">
            <div className="flex flex-row">
              <CountdownNumber number={h1} />
              <CountdownNumber number={h2} digitTwo />
            </div>
            <div className="text-lg text-white text-center mt-3">Hours</div>
          </div>
          <div className="flex flex-col mr-6">
            <div className="flex flex-row">
              <CountdownNumber number={m1} />
              <CountdownNumber number={m2} digitTwo />
            </div>
            <div className="text-lg text-white text-center mt-3">Minutes</div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row">
              <CountdownNumber number={s1} isSecond />
              <CountdownNumber number={s2} digitTwo isSecond />
            </div>
            <div className="text-lg text-white text-center mt-3">Seconds</div>
          </div>
        </div>
      </div>
    </div>
  );
}
