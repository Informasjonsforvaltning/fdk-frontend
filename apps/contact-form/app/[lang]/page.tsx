import { getDictionary, type Locale } from '@fdk-frontend/dictionaries';
import styles from './page.module.css';

interface Props {
  params: {
    lang: Locale['code'];
  };
}

const Index = async ({ params: { lang } }: Props) => {
  const dictionary = await getDictionary(lang);
  return (
    <div className={styles.page}>
      <h1>
        Welcome with <span>{dictionary.tools}</span>
      </h1>
    </div>
  );
};

export default Index;
