import { getLocalization } from "@fdk-frontend/localization";
import { getSite } from "../../../utils/site";
import { notFound } from "next/navigation";

import { getRequestLocale } from "../../components/error-page";

export default function NotFoundDummy() {
  notFound();
}

export const generateMetadata = async () => {
  const locale = await getRequestLocale();
  const dictionary = getLocalization(locale).common;
  const site = await getSite();
  return {
    title: `${dictionary.notFound.title} - ${site.name}`,
    description: dictionary.notFound.message,
  };
};
