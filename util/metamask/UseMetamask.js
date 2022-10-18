import React from "react";
import { MetamaskContext } from "./MetamaskContext";

export const useMetamask = () => {
  const context = React.useContext(MetamaskContext);

  if (!context) {
    throw new Error("`useMetamask` should be used within a `MetamaskProvider`");
  }

  return context;
};
