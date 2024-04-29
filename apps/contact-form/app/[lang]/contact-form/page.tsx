import 'server-only';

import { getDictionary, type Locale } from '@fdk-frontend/dictionaries';
import { Breadcrumbs, Container } from '@fdk-frontend/ui/server';
import ContactForm from './components/contact-form';
import { Heading, Paragraph } from '@digdir/designsystemet-react';
import React from 'react';
import { paths } from '@fdk-frontend/utils';
import styles from './page.module.css';

type Props = {
  params: {
    lang: Locale['code'];
  };
};

const Index = async ({ params: { lang } }: Props) => {
  const dictionary = await getDictionary(lang);
  const breadcrumbList = [
    {
      href: paths.contactForm,
      text: dictionary.contactForm.applicationName,
    },
  ];

  return (
    <div>
      <Breadcrumbs
        breadcrumbList={breadcrumbList}
        dictionary={dictionary}
      />
      <Container className={styles.contentContainer}>
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
    </div>
  );
};

export default Index;
