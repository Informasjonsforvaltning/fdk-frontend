import React from 'react';
import { type Localization } from '@fdk-frontend/localization';

type DatasetRelationLabelProps = {
    relationUri: string;
    dictionary: Localization;
};

const DatasetRelationLabel = ({
    children,
    relationUri,
    dictionary,
    ...props
}: DatasetRelationLabelProps & React.HTMLAttributes<HTMLDivElement>) => {
    return relationUri;
};

export default DatasetRelationLabel;
