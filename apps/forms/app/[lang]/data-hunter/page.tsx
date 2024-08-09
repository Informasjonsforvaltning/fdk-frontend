import 'server-only';

import { getDictionary, type Locale } from '@fdk-frontend/dictionaries';

import { Breadcrumbs } from '@fdk-frontend/ui/breadcrumbs';

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

  const dictionary = await getDictionary(lang, 'data-hunter-page');

  const { FDK_BASE_URI } = process.env;

  const baseUri = FDK_BASE_URI ?? '/';

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
        baseUri={baseUri}
        breadcrumbList={breadcrumbList}
        dictionary={dictionary}
      />
      <div className={styles.contentContainer}>
        <Heading
          size='xlarge'
          spacing
        >
          {dictionary.dataHunterForm.title}
        </Heading>
        <Paragraph
          size='large'
          spacing
        >
          {dictionary.dataHunterForm.description}
        </Paragraph>
        <DataHunterForm dictionary={dictionary} />
      </div>
    </div>
  );
};

export default DataHunterPage;
