import { PropsWithChildren } from 'react';
import { type DataService } from '@fellesdatakatalog/types';
import { type LocaleCodes, type Localization } from '@fdk-frontend/localization';
import { ApiTags } from '@fdk-frontend/ui';
import { printLocaleValue } from '@fdk-frontend/utils';
import styles from '../distribution-header/distribution-header.module.scss';

type ApiHeaderProps = {
    api: DataService;
    locale: LocaleCodes;
    dictionary: Localization;
};

const ApiHeader = ({ api, locale, dictionary, ...props }: ApiHeaderProps & PropsWithChildren) => {
    return (
        <div className={styles.headerContent}>
            <span className={styles.title}>
                {printLocaleValue(locale, api.title) || dictionary.apis.header.nameless}
                <ApiTags
                    api={api}
                    dictionary={dictionary}
                />
            </span>
        </div>
    );
};

export default ApiHeader;
