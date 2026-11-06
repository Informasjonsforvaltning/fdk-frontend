import { getLocalization } from "@fdk-frontend/localization";
import { notFound } from "next/navigation";

import { getRequestLocale } from "../../components/error-page";

export default function NotFoundDummy() {
  notFound();
}

export const generateMetadata = async () => {
  const locale = await getRequestLocale();
  const dictionary = getLocalization(locale).common;
  return {
    title: `${dictionary.notFound.title} - data.norge.no`,
    description: dictionary.notFound.message,
  };
};
