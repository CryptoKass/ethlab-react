"use client";

import { Flowbite } from "flowbite-react";
import { FC, PropsWithChildren } from "react";
import { ethlabTheme } from "./theme";

const FlowbiteContext: FC<PropsWithChildren> = function ({ children }) {
  return <Flowbite theme={{ theme: ethlabTheme }}>{children}</Flowbite>;
};

export default FlowbiteContext;
