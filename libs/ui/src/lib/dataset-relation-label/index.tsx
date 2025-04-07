import React from 'react';
import { type Dictionary } from '@fdk-frontend/dictionaries';

type DatasetRelationLabelProps = {
    relationUri: string;
    dictionary: Dictionary;
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
