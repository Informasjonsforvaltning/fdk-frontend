import React from 'react';
import { Card } from '@digdir/designsystemet-react';
import { OrgLogo } from '@fellesdatakatalog/ui';

const EntityTeaser = () => {
    return (
        <Card>
            <OrgLogo orgNr="991825827" />
            <OrgLogo orgLogoSrc='https://orglogo.digdir.no/api/emblem/svg/991825827' />
            Hello im an entity teaser
        </Card>
    );
}

export default EntityTeaser;