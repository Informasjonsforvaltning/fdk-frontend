import "server-only";

import { getProfile } from "@fdk-frontend/utils/server";
import type { Profile } from "@fdk-frontend/types";

const sites = {
  "data.norge": {
    name: "data.norge.no",
    origin: "https://data.norge.no",
  },
  transportportal: {
    name: "Transportportal.no",
    origin: "https://transportportal.no",
  },
} as const satisfies Record<Profile, { name: string; origin: string }>;

export type Site = {
  profile: Profile;
  name: string;
  origin: string;
};

export const getSite = async (): Promise<Site> => {
  const profile = await getProfile();
  return { profile, ...sites[profile] };
};

export const absoluteUrl = (origin: string, pathname: string) => {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${origin}${path}`;
};
