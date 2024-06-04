import { Alert } from '@digdir/designsystemet-react';
import { Dictionary } from '@fdk-frontend/dictionaries';
import { FormStatusEnum } from '@fdk-frontend/utils';
import styles from './submit-status-alert.module.css';

type SubmitStatusAlertProps = {
  formStatus: FormStatusEnum;
  dictionary: Dictionary;
};

const SubmitStatusAlert = ({ dictionary, formStatus }: SubmitStatusAlertProps) => {
  if (formStatus === FormStatusEnum.SUCCESS) {
    return (
      <Alert
        severity='success'
        className={styles.alert}
      >
        {dictionary.success.formSubmit}
      </Alert>
    );
  } else if (formStatus === FormStatusEnum.ERROR) {
    return (
      <Alert
        severity='danger'
        className={styles.alert}
      >
        {dictionary.error.formSubmit}
      </Alert>
    );
  } else {
    return null;
  }
};

export { SubmitStatusAlert };
