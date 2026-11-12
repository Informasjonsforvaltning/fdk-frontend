"use client";

import { createContext, useContext, type PropsWithChildren } from "react";
import { DEFAULT_DATA_NORGE_PUBLIC_ORIGIN } from "@fdk-frontend/utils/data-norge-origin";

const DataNorgeOriginContext = createContext(DEFAULT_DATA_NORGE_PUBLIC_ORIGIN);

export const DataNorgeOriginProvider = ({ origin, children }: PropsWithChildren<{ origin: string }>) => (
  <DataNorgeOriginContext.Provider value={origin || DEFAULT_DATA_NORGE_PUBLIC_ORIGIN}>
    {children}
  </DataNorgeOriginContext.Provider>
);

export const useDataNorgeOrigin = (): string => useContext(DataNorgeOriginContext);
