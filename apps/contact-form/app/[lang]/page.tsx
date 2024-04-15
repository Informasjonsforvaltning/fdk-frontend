import 'server-only';

import { getDictionary, type Locale } from '@fdk-frontend/dictionaries';
import styles from './page.module.css';
import { Alert, Button, Heading, Paragraph, Textarea, Textfield } from '@digdir/designsystemet-react';
import { Container } from '@fdk-frontend/ui/server';
import { LabelWithTag } from '@fdk-frontend/ui';

interface Props {
  params: {
    lang: Locale['code'];
  };
}

const Index = async ({ params: { lang } }: Props) => {
  const dictionary = await getDictionary(lang);

  return (
    <Container flexDirection={'column'}>
      <div className={styles.contentContainer}>
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
          className={styles.textArea}
          cols={100}
          rows={5}
          label={
            <LabelWithTag
              labelText={dictionary.contactForm.textArea[0].label}
              tagText={dictionary.shouldBeFilledOut}
            />
          }
          description={<Paragraph>{dictionary.contactForm.textArea[0].description}</Paragraph>}
          error=''
        />
        <Textarea
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
          className={styles.textField}
          description=''
          error=''
          label={
            <LabelWithTag
              labelText={dictionary.email}
              tagText={dictionary.shouldBeFilledOut}
            />
          }
        />
        <Textfield
          className={styles.textFieldHalfWith}
          description=''
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
          description=''
          error=''
          label={dictionary.phoneNumber}
        />
        <Button className={styles.button}>
          <Paragraph>{dictionary.submitRequest}</Paragraph>
        </Button>
      </div>
    </Container>
  );
};

export default Index;
