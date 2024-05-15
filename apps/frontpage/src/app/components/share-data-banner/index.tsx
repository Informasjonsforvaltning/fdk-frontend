import { Button, Heading, Paragraph, Link } from '@digdir/designsystemet-react';

import styles from './share-data-banner.module.css';

const ShareDataBanner = () => {
	return (
		<div className={styles.shareDataBanner}>
			<Heading
	      level={2}
	      size="medium"
	      className={styles.shareDataHeadline}
	    >
	      Har du data å dele?
	    </Heading>
	    <Paragraph>
	    	Gjør som over 250 andre virksomheter og del dine data med resten av landet
	    </Paragraph>
	    <div>
	    	<Button asChild>
		    	<Link href="https://data.norge.no/guidance" inverted>
						Kom i gang
					</Link>
				</Button>
			</div>
		</div>
	);
}

export { ShareDataBanner };