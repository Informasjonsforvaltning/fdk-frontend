import { Link, Card, CardBlock, Heading, Paragraph } from "@digdir/designsystemet-react";
import { type Localization, type LocaleCodes } from "@fdk-frontend/localization";
import {
  BicycleIcon,
  BusIcon,
  CarIcon,
  FilesIcon,
  InformationSquareIcon,
  RoadblockIcon,
} from "@navikt/aksel-icons";

import styles from "./transportportal-frontpage-links.module.scss";

type TransportportalFrontpageLinksProps = {
  dictionary: Localization;
  locale: LocaleCodes;
};

const TransportportalFrontpageLinks = ({ dictionary, locale }: TransportportalFrontpageLinksProps) => {
  const links = dictionary.tp.frontpageLinks ?? {};
  const items = [
    {
      title: links.roadAndInfrastructure,
      href: `/${locale}/search?q=vegnett`,
      icon: <RoadblockIcon />,
    },
    {
      title: links.publicTransport,
      href: `/${locale}/search?losTheme=trafikk-og-transport%2Fmobilitetstilbud%2Freisebillett%2Ctrafikk-og-transport%2Fmobilitetstilbud%2Freisegaranti%2Ctrafikk-og-transport%2Fmobilitetstilbud%2Fruteinformasjon%2Ctrafikk-og-transport%2Fmobilitetstilbud%2Fruteplanlegger%2Ctrafikk-og-transport%2Fmobilitetstilbud%2Ftakster-og-kjopsinformasjon`,
      icon: <BusIcon />,
    },
    {
      title: links.trafficAndTravelInformation,
      href: `/${locale}/search?losTheme=trafikk-og-transport%2Ftrafikkinformasjon`,
      icon: <InformationSquareIcon />,
    },
    {
      title: links.mobilityServices,
      href: `/${locale}/search?losTheme=trafikk-og-transport%2Fmobilitetstilbud`,
      icon: <BicycleIcon />,
    },
    {
      title: links.vehicles,
      href: `/${locale}/search?losTheme=trafikk-og-transport%2Fkjoretoy`,
      icon: <CarIcon />,
    },
    {
      title: links.allDatasets,
      href: `/${locale}/search`,
      icon: <FilesIcon />,
    },
  ];

  return (
    <ul
      className={styles.list}
      data-color-scheme="dark"
    >
      {items.map((item) => (
        <li key={item.href}>
          <Card data-color="neutral">
            <CardBlock>
              <Heading>
                <Paragraph data-size="xl">{item.icon}</Paragraph>
                <Link href={item.href}>{item.title}</Link>
              </Heading>
            </CardBlock>
          </Card>
        </li>
      ))}
    </ul>
  );
};

export { TransportportalFrontpageLinks };
