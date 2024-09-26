import { Button, Alert, Link } from '@digdir/designsystemet-react';
import { MagnifyingGlassIcon } from '@navikt/aksel-icons';
import { Dictionary } from '@fdk-frontend/dictionaries';

import styles from './advanced-search-prompt.module.scss';

type AdvancedSearchPromptProps = {
    dictionary: Dictionary;
    baseUri: string;
};

const AdvancedSearchPrompt = ({ dictionary, baseUri }: AdvancedSearchPromptProps) => (
    <Alert className={styles.searchAlert} iconTitle='Info'>
        <div className={styles.searchAlertContent}>
            {dictionary.aiBanner.advancedSearchPrompt.text}
            <Button
                className={styles.searchAlertButton}
                asChild
                size='small'
                variant='primary'
            >
                <Link href={`${baseUri}/search-all`}>
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
