'use client';

import { Heading, Paragraph, Alert, Textarea, Textfield, Button } from '@digdir/designsystemet-react';
import { LabelWithTag } from '@fdk-frontend/ui';
import { type Dictionary } from '@fdk-frontend/dictionaries';
import { useFormState, useFormStatus } from 'react-dom';
import styles from './page.module.css';
import { sendEmailAction } from './actions';
import { EMPTY_FORM_STATE } from './utils';

interface Props {
  dictionary: Dictionary;
};
const SubmitButton = ({ buttonText }: { buttonText: string }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      className={styles.button}
      type='submit'
      aria-disabled={pending}
    >
      <Paragraph>{buttonText}</Paragraph>
    </Button>
  );
};

const ContactForm = ({ dictionary }: Props) => {
  const [formState, action] = useFormState(sendEmailAction, EMPTY_FORM_STATE);


  // eslint-disable-next-line no-console
  //console.log('state: ', state);
  // eslint-disable-next-line no-console
  //console.log('formAction: ', formAction);
   return (
     <form
       action={action}
       className={styles.contentContainer}
     >
       <Heading
         size='xlarge'
         spacing
       >
         {dictionary.contactForm.title}
       </Heading>
       <Paragraph
         size='large'
         className={styles.paragraph}
       >
         {dictionary.contactForm.description}
       </Paragraph>
       <Alert
         severity='info'
         className={styles.alert}
       >
         <Heading
           size='xsmall'
           spacing
         >
           {dictionary.fillTheFormUnder}
         </Heading>
         <Paragraph>{dictionary.contactForm.alertDescription}</Paragraph>
       </Alert>
       <Textarea
         name='dataset'
         className={styles.textArea}
         required
         cols={100}
         rows={5}
         label={
           <LabelWithTag
             labelText={dictionary.contactForm.textArea[0].label}
             tagText={dictionary.shouldBeFilledOut}
           />
         }
         description={<Paragraph>{dictionary.contactForm.textArea[0].description}</Paragraph>}
         error={formState?.fieldErrors?.['dataset']?.[0]}
       />
       <Textarea
         name='dataset'
         className={styles.textArea}
         cols={100}
         rows={5}
         label={<LabelWithTag labelText={dictionary.contactForm.textArea[1].label} />}
         description={<Paragraph>{dictionary.contactForm.textArea[1].description}</Paragraph>}
         error=''
       />
       <Textarea
         className={styles.textArea}
         cols={100}
         rows={5}
         label={<LabelWithTag labelText={dictionary.contactForm.textArea[2].label} />}
         description={<Paragraph>{dictionary.contactForm.textArea[2].description}</Paragraph>}
         error=''
       />
       <Textarea
         className={styles.textArea}
         cols={100}
         rows={5}
         label={<LabelWithTag labelText={dictionary.contactForm.textArea[3].label} />}
         description={<Paragraph>{dictionary.contactForm.textArea[3].description}</Paragraph>}
         error=''
       />
       <Textfield
         required
         className={styles.textField}
         error=''
         label={
           <LabelWithTag
             labelText={dictionary.name}
             tagText={dictionary.shouldBeFilledOut}
           />
         }
       />
       <Textfield
         required
         className={styles.textField}
         error=''
         label={
           <LabelWithTag
             labelText={dictionary.email}
             tagText={dictionary.shouldBeFilledOut}
           />
         }
       />
       <Textfield
         required
         className={styles.textFieldHalfWith}
         error=''
         label={
           <LabelWithTag
             labelText={dictionary.organizationNumber}
             tagText={dictionary.shouldBeFilledOut}
           />
         }
       />
       <Textfield
         className={styles.textFieldHalfWith}
         error=''
         label={dictionary.phoneNumber}
       />
       <SubmitButton buttonText={dictionary.submitRequest} />
     </form>
   );
};


export default ContactForm;
