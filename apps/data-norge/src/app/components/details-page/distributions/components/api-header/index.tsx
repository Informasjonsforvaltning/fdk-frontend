import { PropsWithChildren } from 'react';
import mime from 'mime-types';
import { Tag } from '@digdir/designsystemet-react';
import { type DataService } from '@fdk-frontend/fdk-types';
import { type LocaleCodes, type Dictionary, i18n } from '@fdk-frontend/dictionaries';
import styles from '../distribution-header/distribution-header.module.scss';

type ApiHeaderProps = {
    api: DataService;
    locale: LocaleCodes;
    dictionary: Dictionary;
};

const ApiHeader = ({ api, locale, dictionary, ...props }: ApiHeaderProps & PropsWithChildren) => {
    return (
        <div className={styles.headerContent}>
            <span className={styles.title}>
                {api.title?.[locale] || api.title?.[i18n.defaultLocale] || dictionary.apis.header.nameless}
                <div className={styles.tags}>
                    {api.fdkFormat
                        ?.filter((format: any) => format?.code)
                        .map((format: any, i: number) => (
                            <Tag
                                className={styles.tag}
                                color='info'
                                size='sm'
                                key={format.code}
                            >
                                {mime.extension(format.code) || format.code}
                            </Tag>
                        ))}
                </div>
            </span>
        </div>
    );
};

export default ApiHeader;
