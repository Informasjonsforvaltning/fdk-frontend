import React from 'react';
import mime from 'mime-types';
import { type DataService } from '@fdk-frontend/fdk-types';
import { type Dictionary } from '@fdk-frontend/dictionaries';
import { Tag } from '@digdir/designsystemet-react';
import TagList from '../tag-list';

type ApiTagsProps = {
    api: DataService;
    dictionary: Dictionary;
};

const ApiTags = ({ children, api, dictionary, ...props }: ApiTagsProps & React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <TagList>
            {api.fdkFormat
                ?.filter((format: any) => format?.code)
                .map((format: any, i: number) => (
                    <Tag
                        color='info'
                        size='sm'
                        key={format.code}
                    >
                        {(mime.extension(format.code) || format.name || format.code)?.toLowerCase()}
                    </Tag>
                ))}
        </TagList>
    );
};

export default ApiTags;
