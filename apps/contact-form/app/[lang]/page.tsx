'use server';

import { getDictionary, type Locale } from '@fdk-frontend/dictionaries';
import { Container } from '@fdk-frontend/ui/server';
import ContactForm from './contact-form';

interface Props {
  params: {
    lang: Locale['code'];
  };
}

const Index = async ({ params: { lang } }: Props) => {
  const dictionary = await getDictionary(lang);

  return (
    <Container flexDirection={'column'}>
      <ContactForm dictionary={dictionary} />
    </Container>
  );
};

export default Index;
