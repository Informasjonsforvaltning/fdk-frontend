'use client';

import React, { createContext, useContext, PropsWithChildren } from 'react';

interface ClientsideEnvironmentVariables {
  FDK_BASE_URI: string;
  FDK_DATASET_PREVIEW_API_KEY: string;
}

const EnvironmentVariablesContext = createContext<ClientsideEnvironmentVariables | undefined>(undefined);

interface EnvironmentVariablesProviderProps {
  vars: ClientsideEnvironmentVariables;
}

export const EnvironmentVariablesProvider = ({ children, vars }: EnvironmentVariablesProviderProps & PropsWithChildren) => {
  return (
    <EnvironmentVariablesContext.Provider value={vars}>
      {children}
    </EnvironmentVariablesContext.Provider>
  );
}

// Custom hook to use the server environment variables

export const useEnvironmentVariables = (): ClientsideEnvironmentVariables => {
  const context = useContext(EnvironmentVariablesContext)
  if (context === undefined) {
    throw new Error('useEnvironmentVariables must be used within an EnvironmentVariablesProvider');
  }
  return context
}
