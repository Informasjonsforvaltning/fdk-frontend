import { Link, type LinkProps } from '@digdir/designsystemet-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';

type ExternalLinkProps = LinkProps & {
    showIcon?: boolean;
}

const ExternalLink = ({ children, showIcon, ...props }: ExternalLinkProps) => (
    <Link {...props}>
        {children}
        {
            showIcon &&
            <ExternalLinkIcon
                aria-hidden
                fontSize='1em'
                style={{marginLeft:'0.125em'}}
            />
        }
    </Link>
);

export default ExternalLink;
