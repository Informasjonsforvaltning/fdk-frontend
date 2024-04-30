import 'server-only';

import { getDictionary, type Locale } from '@fdk-frontend/dictionaries';
import { Breadcrumbs, Container } from '@fdk-frontend/ui/server';
import DataHunterForm from './components/data-hunter-form';
import { Heading, Paragraph } from '@digdir/designsystemet-react';
import React from 'react';
import { paths } from '@fdk-frontend/utils';
import styles from './page.module.css';

type Props = {
  params: {
    lang: Locale['code'];
  };
};

const DataHunterPage = async ({ params: { lang } }: Props) => {
  const dictionary = await getDictionary(lang);
  const breadcrumbList = [
    {
      href: paths.forms,
      text: dictionary.forms,
    },
    {
      href: paths.dataHunter,
      text: dictionary.dataHunter,
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
          {dictionary.dataHunterForm.title}
        </Heading>
        <Paragraph
          size='large'
          className={styles.paragraph}
        >
          {dictionary.dataHunterForm.description}
        </Paragraph>
        <DataHunterForm dictionary={dictionary} />
      </Container>
    </div>
  );
};

export default DataHunterPage;
