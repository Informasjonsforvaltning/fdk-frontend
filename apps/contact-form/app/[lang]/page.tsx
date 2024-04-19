import 'server-only';

import { getDictionary, type Locale } from '@fdk-frontend/dictionaries';
import { Container } from '@fdk-frontend/ui/server';
import ContactForm from './contact-form';
import { Heading, Paragraph } from '@digdir/designsystemet-react';
import styles from './page.module.css';
import React from 'react';

type Props = {
  params: {
    lang: Locale['code'];
  };
};

const Index = async ({ params: { lang } }: Props) => {
  const dictionary = await getDictionary(lang);

  return (
    <Container extendedClassName={styles.contentContainer}>
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
      <ContactForm dictionary={dictionary} />
    </Container>
  );
};

export default Index;
