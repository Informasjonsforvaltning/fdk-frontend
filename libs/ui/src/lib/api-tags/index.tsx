import React from 'react';
import mime from 'mime-types';
import { type DataService } from '@fellesdatakatalog/types';
import { type Dictionary } from '@fdk-frontend/dictionaries';
import { Tag } from '@digdir/designsystemet-react';
import TagList, { type TagListProps } from '../tag-list';

type ApiTagsProps = TagListProps & {
    api: DataService;
    dictionary: Dictionary;
};

const ApiTags = ({ children, api, dictionary, ...props }: ApiTagsProps & React.HTMLAttributes<HTMLUListElement>) => {
    return (
        <TagList {...props}>
            {api.fdkFormat
                ?.filter((format: any) => format?.code)
                .map((format: any, i: number) => (
                    <Tag
                        data-size='md'
                        key={format.code}
                    >
                        {(mime.extension(format.code) || format.name || format.code)?.toLowerCase()}
                    </Tag>
                ))}
        </TagList>
    );
};

export default ApiTags;
