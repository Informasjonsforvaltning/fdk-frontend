'use client';

import { Paragraph, Textarea, Textfield } from '@digdir/designsystemet-react';
import { LabelWithTag, SubmitButton } from '@fdk-frontend/ui';
import { type Dictionary } from '@fdk-frontend/dictionaries';
import { useFormState } from 'react-dom';
import { sendEmailAction } from '../../../../../actions';
import { EMPTY_FORM_STATE, extractErrorMessages } from '@fdk-frontend/utils';
import styles from './data-hunter-form.module.css';

type Props = {
  dictionary: Dictionary;
};

const DataHunterForm = ({ dictionary }: Props) => {
  const [state, formAction] = useFormState(sendEmailAction, EMPTY_FORM_STATE);
  const textAreaCols = 100;
  const textAreaRows = 5;

  return (
    <form action={formAction}>
      <Textarea
        name='dataset'
        className={styles.textArea}
        required
        cols={textAreaCols}
        rows={textAreaRows}
        label={
          <LabelWithTag
            labelText={dictionary.dataHunterForm.dataset.label}
            tagText={dictionary.shouldBeFilledOut}
          />
        }
        description={<Paragraph>{dictionary.dataHunterForm.dataset.description}</Paragraph>}
        error={extractErrorMessages('dataset', state, dictionary)}
      />
      <Textarea
        name='location'
        className={styles.textArea}
        cols={textAreaCols}
        rows={textAreaRows}
        label={<LabelWithTag labelText={dictionary.dataHunterForm.location.label} />}
        description={<Paragraph>{dictionary.dataHunterForm.location.description}</Paragraph>}
      />
      <Textarea
        name='efforts'
        className={styles.textArea}
        cols={textAreaCols}
        rows={textAreaRows}
        label={<LabelWithTag labelText={dictionary.dataHunterForm.efforts.label} />}
        description={<Paragraph>{dictionary.dataHunterForm.efforts.description}</Paragraph>}
      />
      <Textfield
        name='name'
        required
        className={styles.textField}
        error={extractErrorMessages('name', state, dictionary)}
        label={
          <LabelWithTag
            labelText={dictionary.name}
            tagText={dictionary.shouldBeFilledOut}
          />
        }
      />
      <Textfield
        name='email'
        required
        className={styles.textField}
        error={extractErrorMessages('email', state, dictionary)}
        type='email'
        label={
          <LabelWithTag
            labelText={dictionary.email}
            tagText={dictionary.shouldBeFilledOut}
          />
        }
      />
      <Textfield
        name='organizationNumber'
        required
        type='number'
        className={styles.textFieldHalfWith}
        error={extractErrorMessages('organizationNumber', state, dictionary)}
        label={
          <LabelWithTag
            labelText={dictionary.organizationNumber}
            tagText={dictionary.shouldBeFilledOut}
          />
        }
      />
      <Textfield
        name='phoneNumber'
        className={styles.textFieldHalfWith}
        label={dictionary.phoneNumber}
      />
      <SubmitButton
        buttonText={dictionary.submitRequest}
        extendedClassName={styles.button}
      />
    </form>
  );
};

export default DataHunterForm;
