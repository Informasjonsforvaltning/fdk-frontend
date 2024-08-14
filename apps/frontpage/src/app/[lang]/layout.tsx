import RootLayout, { RootLayoutProps, generateStaticParams } from '@fdk-frontend/ui/layout-root';

const metadata = {
    title: 'data.norge.no - Forside',
    description:
        ' data.norge.no er det offentlige nettstedet som gir oversikt over beskrivelser av datasett, begrep, api-er og informasjonsmodeller. Innholdet blir levert av ulike virksomheter, offentlige og private. Det er Digitaliseringsdirektoratet som er ansvarlig for drift og utvikling av nettstedet.',
};

const FrontpageLayout = (props: RootLayoutProps) => <RootLayout {...props} />;

export default FrontpageLayout;
export { generateStaticParams, metadata };
