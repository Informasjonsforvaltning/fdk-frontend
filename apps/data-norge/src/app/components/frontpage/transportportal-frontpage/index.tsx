import { type Localization, type LocaleCodes } from "@fdk-frontend/localization";

import { TransportportalFrontpageBanner } from "../transportportal-frontpage-banner";

type TransportportalFrontpageProps = {
  dictionary: Localization;
  locale: LocaleCodes;
};

const TransportportalFrontpage = ({ dictionary, locale }: TransportportalFrontpageProps) => (
  <TransportportalFrontpageBanner
    dictionary={dictionary}
    locale={locale}
    profile="transportportal"
  />
);

export { TransportportalFrontpage };
