import React from 'react';

type DatasetRelationLabelProps = {
    relationUri: string;
};

const DatasetRelationLabel = ({
    relationUri,
    ...props
}: DatasetRelationLabelProps & React.HTMLAttributes<HTMLDivElement>) => {
    return relationUri;
};

export default DatasetRelationLabel;
