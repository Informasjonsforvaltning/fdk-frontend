import { getDictionary, type Locale } from '@fdk-frontend/dictionaries';
import styles from './page.module.css';

interface Props {
  params: {
    lang: Locale;
  };
}

const Index = async ({ params: { lang } }: Props) => {
  const dictionary = await getDictionary(lang);
  return (
    <div className={styles.page}>
      <div className='wrapper'>
        <div className='container'>
          <div id='welcome'>
            <h1>
              Welcome with <span>{dictionary.tools}</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
