'use client';

import { i18n } from '@fdk-frontend/dictionaries';

const Page = async (props) => {
  const locale = props.params.lang ?? i18n.defaultLocale ;
  let MDX = (await import(`./finding-data.${locale}.mdx`)).default;
  return <MDX />;
}

export default Page;