"use client";
import { useEffect, useRef, useState } from "react";

const DEBOUNCE_MS = 200;

type Settled<T> = {
  query: string;
  reloadKey: string;
  data: T | undefined;
};

export const isTrayRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

export const fetchTrayJson = async (url: string, signal: AbortSignal, init?: RequestInit): Promise<unknown> => {
  const response = await fetch(url, { ...init, signal });
  if (!response.ok) return undefined;
  try {
    return await response.json();
  } catch {
    return undefined;
  }
};

const isAbortError = (err: unknown): boolean => err instanceof Error && err.name === "AbortError";

/**
 * Debounces one tray request. `fetcher` is read from a ref so a new function
 * identity does not restart the timer. Change `query` or `reloadKey` to refetch.
 * A thrown error settles as no data. An abort leaves the previous result in place
 * until a newer request settles.
 */
export const useDebouncedTrayFetch = <T>(
  query: string,
  reloadKey: string,
  fetcher: (query: string, signal: AbortSignal) => Promise<T>,
): { ready: boolean; data: T | undefined } => {
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;
  const [settled, setSettled] = useState<Settled<T>>();

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) return;

    const controller = new AbortController();
    const timer = setTimeout(() => {
      void (async () => {
        try {
          const data = await fetcherRef.current(trimmed, controller.signal);
          if (controller.signal.aborted) return;
          setSettled({ query: trimmed, reloadKey, data });
        } catch (err) {
          if (controller.signal.aborted || isAbortError(err)) return;
          setSettled({ query: trimmed, reloadKey, data: undefined });
        }
      })();
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, reloadKey]);

  const ready = settled?.query === query.trim() && settled.reloadKey === reloadKey;
  return { ready, data: ready ? settled.data : undefined };
};
