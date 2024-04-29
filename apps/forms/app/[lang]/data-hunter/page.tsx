import 'server-only';

import { getDictionary, type Locale } from '@fdk-frontend/dictionaries';
import { Breadcrumbs, Container } from '@fdk-frontend/ui/server';
import DataHunterForm from './components/data-hunter-form';
import { Heading, Paragraph } from '@digdir/designsystemet-react';
import React from 'react';
import { getPaths } from '@fdk-frontend/utils';
import styles from './page.module.css';
import { unstable_noStore as noStore } from 'next/cache';

type Props = {
  params: {
    lang: Locale['code'];
  };
};

const DataHunterPage = async ({ params: { lang } }: Props) => {
  // Opt-in dynamic rendering
  noStore();

  const dictionary = await getDictionary(lang);
  const baseUri = process.env.FDK_BASE_URI ?? '/';
  const breadcrumbList = [
    {
      href: getPaths(baseUri).forms,
      text: dictionary.forms,
    },
    {
      href: getPaths(baseUri).dataHunter,
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
