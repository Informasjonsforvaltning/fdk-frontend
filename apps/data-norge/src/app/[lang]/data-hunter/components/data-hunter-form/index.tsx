'use client';

import { useActionState } from 'react';
import { Paragraph, Textfield, Button } from '@digdir/designsystemet-react';

import { LabelWithTag, SubmitStatusAlert } from '@fdk-frontend/ui';

import { type Localization, type LocaleCodes } from '@fdk-frontend/localization';
import { useFormStatus } from 'react-dom';
import { sendEmailAction } from '../../utils/actions';
import { EMPTY_FORM_STATE, extractErrorMessages } from '@fdk-frontend/utils';
import styles from './data-hunter-form.module.css';

type DataHunterFormProps = {
    dictionary: Localization;
    locale: LocaleCodes;
};

const DataHunterForm = ({ dictionary, locale }: DataHunterFormProps) => {
    const [state, formAction] = useActionState(sendEmailAction, EMPTY_FORM_STATE);
    const { pending } = useFormStatus();
    const textAreaCols = 100;
    const textAreaRows = 5;

    return (
        <>
            <form
                id='data-hunter-form'
                name='data-hunter-form'
                action={formAction}
                className={styles.form}
            >
                <Textfield
                    id='dataset'
                    multiline={true}
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
                <Textfield
                    id='location'
                    multiline={true}
                    name='location'
                    className={styles.textArea}
                    cols={textAreaCols}
                    rows={textAreaRows}
                    label={<LabelWithTag labelText={dictionary.dataHunterForm.location.label} />}
                    description={<Paragraph>{dictionary.dataHunterForm.location.description}</Paragraph>}
                />
                <Textfield
                    id='efforts'
                    multiline={true}
                    name='efforts'
                    className={styles.textArea}
                    cols={textAreaCols}
                    rows={textAreaRows}
                    label={<LabelWithTag labelText={dictionary.dataHunterForm.efforts.label} />}
                    description={<Paragraph>{dictionary.dataHunterForm.efforts.description}</Paragraph>}
                />
                <Textfield
                    id='name'
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
                    id='email'
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
                    id='organizationNumber'
                    name='organizationNumber'
                    required
                    type='number'
                    className={styles.orgNumberField}
                    error={extractErrorMessages('organizationNumber', state, dictionary)}
                    label={
                        <LabelWithTag
                            labelText={dictionary.organizationNumber}
                            tagText={dictionary.shouldBeFilledOut}
                        />
                    }
                />
                <Textfield
                    id='phoneNumber'
                    name='phoneNumber'
                    className={styles.textFieldHalfWidth}
                    label={<LabelWithTag labelText={dictionary.phoneNumber} />}
                />
                <Button
                    type='submit'
                    className={styles.submitButton}
                    aria-disabled={pending}
                >
                    {dictionary.submitRequest}
                </Button>
            </form>
            <SubmitStatusAlert
                locale={locale}
                formStatus={state?.status}
            />
        </>
    );
};

export default DataHunterForm;
