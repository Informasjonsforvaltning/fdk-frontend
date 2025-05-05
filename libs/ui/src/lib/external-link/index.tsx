import { Link, type LinkProps } from '@digdir/designsystemet-react';
// import { ExternalLinkIcon } from '@navikt/aksel-icons';

const ExternalLink = ({ children, ...props }: LinkProps) => (
    <Link {...props}>
        {children}
        {/*<ExternalLinkIcon
            aria-hidden
            fontSize='1em'
            style={{marginLeft:'0.125em'}}
        />*/}
    </Link>
);

export default ExternalLink;
