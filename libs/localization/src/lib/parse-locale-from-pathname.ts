import type { LocaleCodes } from "./types";

const VALID_LOCALES: readonly LocaleCodes[] = ["nb", "nn", "en"];

export const parseLocaleFromPathname = function (pathname: string): LocaleCodes {
  const segment = pathname.split("/").filter(Boolean)[0];
  if (segment && (VALID_LOCALES as readonly string[]).includes(segment)) return segment as LocaleCodes;
  return "nb";
};
