import React from 'react';
import { Card, Heading, Link, Paragraph } from '@digdir/designsystemet-react';
import { OrgLogo } from '@fellesdatakatalog/ui';
import styles from './styles.module.scss';

const EntityTeaser = () => {
    return (
        // <Card>
            
        //     <OrgLogo orgLogoSrc='https://orglogo.digdir.no/api/emblem/svg/991825827' />
        //     Hello im an entity teaser
        // </Card>
        <Card>
            <Card.Block>
                <div>
                    <OrgLogo className={styles.orgLogo} orgNr="991825827" />
                    <Heading>
                        <Link
                            href='https://designsystemet.no'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            Myrkheim Museum
                        </Link>
                    </Heading>
                </div>
            <Paragraph>
                Myrkheim Museum ligg i dalen mellom dei gamle fjelltoppane og viser
                utstillingar frå tida då dei fyrste reisefølgja kryssa landet. Her kan
                du utforske eldgamle kart, reiskapar frå dei store vandringane og
                forteljingar bevart av skogvaktarane.
            </Paragraph>
            <Paragraph data-size='sm'>Myrkheim Kulturvernråd</Paragraph>
            </Card.Block>
        </Card>
    );
}

export default EntityTeaser;