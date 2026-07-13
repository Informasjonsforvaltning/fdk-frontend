import { headers } from "next/headers";

export type Profile = "default" | "transportportal";

const transportportalHosts = (process.env.TRANSPORTPORTAL_HOSTS ?? "data.transportportal.no,transportportal.no")
  .split(",")
  .map((host) => host.trim())
  .filter(Boolean);

export const getProfile = async (): Promise<Profile> => {
  const headerList = await headers();

  if (process.env.NODE_ENV !== "production" && headerList.get("x-fdk-profile") === "transportportal") {
    return "transportportal";
  }

  const host = (headerList.get("x-forwarded-host") ?? headerList.get("host") ?? "").split(":")[0];

  return transportportalHosts.includes(host) ? "transportportal" : "default";
};
