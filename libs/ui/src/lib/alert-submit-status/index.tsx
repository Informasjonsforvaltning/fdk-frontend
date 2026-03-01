import { Alert } from '@digdir/designsystemet-react';
import { type LocaleCodes, getLocalization } from '@fdk-frontend/localization';
import { FormStatusEnum } from '@fdk-frontend/utils';
import styles from './submit-status-alert.module.css';

type SubmitStatusAlertProps = {
    locale: LocaleCodes;
    formStatus?: FormStatusEnum;
};

const SubmitStatusAlert = ({ locale, formStatus = FormStatusEnum.UNSET }: SubmitStatusAlertProps) => {
    const dictionary = getLocalization(locale).dataHunterPage;
    switch (formStatus) {
        case FormStatusEnum.SUCCESS:
            return (
                <Alert
                    data-color='success'
                    className={styles.alert}
                >
                    {dictionary.success.formSubmit}
                </Alert>
            );
        case FormStatusEnum.ERROR:
            return (
                <Alert
                    data-color='danger'
                    className={styles.alert}
                >
                    {dictionary.error.formSubmit}
                </Alert>
            );
        default:
            return null;
    }
};

export { SubmitStatusAlert };
