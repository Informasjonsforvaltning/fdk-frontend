import { Button, Alert, Link } from '@digdir/designsystemet-react';
import { MagnifyingGlassIcon } from '@navikt/aksel-icons';
import { type Dictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';

import styles from './advanced-search-prompt.module.scss';

type AdvancedSearchPromptProps = {
    dictionary: Dictionary;
    locale: LocaleCodes;
};

const AdvancedSearchPrompt = ({ dictionary, locale }: AdvancedSearchPromptProps) => (
    <Alert className={styles.searchAlert}>
        <div className={styles.searchAlertContent}>
            {dictionary.aiBanner.advancedSearchPrompt.text}
            <Button
                className={styles.searchAlertButton}
                asChild
                data-size='sm'
                variant='primary'
            >
                <Link href={`/search-all`}>
                    <MagnifyingGlassIcon
                        aria-hidden
                        fontSize='1.5em'
                    />
                    {dictionary.aiBanner.advancedSearchPrompt.link}
                </Link>
            </Button>
        </div>
    </Alert>
);

export { AdvancedSearchPrompt };
