"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";

/** localStorage key holding the visitor's consent decision (scoped per domain). */
export const CONSENT_STORAGE_KEY = "fdk-consent";
/** Bump when the consent categories change so stored decisions are re-prompted. */
export const CONSENT_VERSION = 1;

export type ConsentCategories = {
  /** Statistics/analytics (Siteimprove). The only optional category today. */
  statistics: boolean;
};

export type ConsentState = ConsentCategories & {
  version: number;
  timestamp: string;
};

type ConsentContextValue = {
  /** Stored decision, or `null` when the visitor has not decided yet. */
  consent: ConsentState | null;
  /** Whether the banner should be shown (undecided, or reopened from the footer). */
  isBannerOpen: boolean;
  /** Persist a decision and close the banner. */
  saveConsent: (categories: ConsentCategories) => void;
  /** Reopen the banner so the visitor can change a previous decision. */
  openBanner: () => void;
  /** Close the banner without changing the stored decision. */
  closeBanner: () => void;
};

const noop = () => undefined;

// Non-throwing default so components rendered outside the provider (e.g. Storybook,
// isolated tests) stay inert instead of crashing.
const defaultValue: ConsentContextValue = {
  consent: null,
  isBannerOpen: false,
  saveConsent: noop,
  openBanner: noop,
  closeBanner: noop,
};

const ConsentContext = createContext<ConsentContextValue>(defaultValue);

const readStoredConsent = (): ConsentState | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    if (parsed.version !== CONSENT_VERSION || typeof parsed.statistics !== "boolean") return null;
    return { version: CONSENT_VERSION, statistics: parsed.statistics, timestamp: parsed.timestamp ?? "" };
  } catch {
    return null;
  }
};

export const ConsentProvider = ({ children }: PropsWithChildren) => {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [reopened, setReopened] = useState(false);
  // Consent is read from localStorage after mount to avoid an SSR/client mismatch.
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setConsent(readStoredConsent());
    setHydrated(true);
  }, []);

  const saveConsent = useCallback((categories: ConsentCategories) => {
    const next: ConsentState = {
      version: CONSENT_VERSION,
      statistics: categories.statistics,
      timestamp: new Date().toISOString(),
    };
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore write failures (e.g. storage disabled in the browser).
    }
    setConsent(next);
    setReopened(false);
  }, []);

  const openBanner = useCallback(() => setReopened(true), []);
  const closeBanner = useCallback(() => setReopened(false), []);

  const isBannerOpen = hydrated && (consent === null || reopened);

  const value = useMemo<ConsentContextValue>(
    () => ({ consent, isBannerOpen, saveConsent, openBanner, closeBanner }),
    [consent, isBannerOpen, saveConsent, openBanner, closeBanner],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
};

export const useConsent = (): ConsentContextValue => useContext(ConsentContext);
