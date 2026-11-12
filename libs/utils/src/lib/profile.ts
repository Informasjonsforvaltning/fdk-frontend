import { cache } from "react";
import { headers } from "next/headers";
import { type Profile } from "@fdk-frontend/types";
import { hostnameFromHeaderValue, isTransportportalHost } from "./transportportal-host";

export const getProfile = cache(async (): Promise<Profile> => {
  const headerList = await headers();

  if (process.env.NODE_ENV !== "production" && headerList.get("x-fdk-profile") === "transportportal") {
    return "transportportal";
  }

  const host = hostnameFromHeaderValue(headerList.get("x-forwarded-host") ?? headerList.get("host"));

  return isTransportportalHost(host) ? "transportportal" : "data.norge";
});
