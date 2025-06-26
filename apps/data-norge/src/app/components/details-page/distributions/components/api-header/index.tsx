import { PropsWithChildren } from 'react';
import { type DataService } from '@fdk-frontend/fdk-types';
import { type LocaleCodes, type Dictionary, i18n } from '@fdk-frontend/dictionaries';
import ApiTags from '@fdk-frontend/ui/api-tags';
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
                <ApiTags
                    api={api}
                    dictionary={dictionary}
                />
            </span>
        </div>
    );
};

export default ApiHeader;
