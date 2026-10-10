import { Link, Card, CardBlock, Heading, Paragraph } from "@digdir/designsystemet-react";
import { type Localization, type LocaleCodes } from "@fdk-frontend/localization";
import { CarIcon, BusIcon, BoatIcon, AreaChartIcon, BarChartIcon, ParkingIcon } from "@navikt/aksel-icons";

import styles from "./transportportal-frontpage-links.module.scss";

type TransportportalFrontpageLinksProps = {
  dictionary: Localization;
  locale: LocaleCodes;
};

const TransportportalFrontpageLinks = ({ dictionary, locale }: TransportportalFrontpageLinksProps) => {
  const links = dictionary.tp.frontpageLinks ?? {};
  const items = [
    {
      title: links.roadNetwork,
      href: `/${locale}/search/datasets?losTheme=trafikk-og-transport%2Fveg-og-vegregulering%2Fvegnett`,
      icon: <CarIcon />,
    },
    { title: links.commuterTraffic, href: `/${locale}/search?q=kollektivtransport`, icon: <BusIcon /> },
    { title: links.seaTransport, href: `/${locale}/search?q=ferge`, icon: <BoatIcon /> },
    { title: links.realtimeTraffic, href: `/${locale}/search?q=sanntid`, icon: <AreaChartIcon /> },
    { title: links.statistics, href: `/${locale}/search?q=statistikk`, icon: <BarChartIcon /> },
    {
      title: links.parkingMobility,
      href: `/${locale}/search?losTheme=trafikk-og-transport%2Fyrkestransport%2Fparkering-og-hvileplasser%2Ctrafikk-og-transport%2Fmobilitetstilbud`,
      icon: <ParkingIcon />,
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
