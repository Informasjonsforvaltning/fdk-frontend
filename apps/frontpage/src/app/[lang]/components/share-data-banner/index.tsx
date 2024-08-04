import { Button, Heading, Paragraph, Link } from '@digdir/designsystemet-react';
import { ChevronRightIcon } from '@navikt/aksel-icons';
import { Dictionary, interpolate } from '@fdk-frontend/i18n';

import { HeadingWithDivider } from '@fdk-frontend/ui/typography';

import styles from './share-data-banner.module.scss';

type ShareDataBannerProps = {
	dictionary: Dictionary;
	baseUri: string;
}

const ShareDataBanner = ({ dictionary, baseUri }: ShareDataBannerProps) => {

	return (
		<div className={styles.shareDataBanner}>
			<HeadingWithDivider level={2} className={styles.headline}>
	      	{dictionary.shareDataBanner.title}
	    </HeadingWithDivider>
	    <Paragraph>
	    	{
	    		interpolate(
	    			dictionary.shareDataBanner.content,
	    			{
	    				link: (
	    					<Link href={`${baseUri}/organizations`}>
	    						{dictionary.shareDataBanner.organizationsLinkText}
	    					</Link>
	    				)
	    			}
	    		)
	    	}
	    </Paragraph>
	    <div className={styles.buttons}>
	    	<Button asChild>
		    	<Link href="https://data.norge.no/guidance" inverted>
					{dictionary.shareDataBanner.getStartedLinkText}
				</Link>
				</Button>
				<Button asChild variant="secondary">
		    		<Link href="https://informasjonsforvaltning.github.io/">
						{dictionary.shareDataBanner.documentationLinkText}
					</Link>
				</Button>
			</div>
		</div>
	);
}

export { ShareDataBanner };