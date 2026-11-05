import { getLocalization } from "@fdk-frontend/localization";
import { Link, Button, Heading } from "@digdir/designsystemet-react";

import ErrorPage, { getRequestLocale } from "../components/error-page";

export default async function NotFound() {
  const locale = await getRequestLocale();
  const dictionary = getLocalization(locale).common;
  return (
    <ErrorPage>
      <Heading
        level={1}
        data-size="md"
      >
        {dictionary.notFound.title}
      </Heading>
      <p>{dictionary.notFound.message}</p>
      <Button
        asChild
        variant="primary"
        data-size="sm"
      >
        <Link href={`/${locale}`}>{dictionary.notFound.button}</Link>
      </Button>
    </ErrorPage>
  );
}

export const generateMetadata = async () => {
  const locale = await getRequestLocale();
  const dictionary = getLocalization(locale).common;
  return {
    title: `${dictionary.notFound.title} - data.norge.no`,
    description: dictionary.notFound.message,
  };
};
