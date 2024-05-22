import { unstable_noStore as noStore } from 'next/cache';
import Image from 'next/image';
import { Dictionary } from '@fdk-frontend/dictionaries';

import { getFooterData } from './data';
import { ColumnData, FooterColumn } from './components/footer-column';
import styles from './footer.module.css';
import Ellipse from './images/Ellipse.svg';
import Rectangle from './images/Rectangle.svg';

type FooterProps = {
  dictionary: Dictionary;
  baseUri?: string;
};

const Footer = ({ dictionary, baseUri = '/' }: FooterProps) => {
  // Opt-in dynamic rendering
  noStore();

  const footerData = getFooterData(dictionary, baseUri);

  return (
    <footer className={styles.footer}>
      <div className={styles.rectangleIcon}>
        <Image
          src={Rectangle}
          alt={'Footer rectangle icon'}
        />
      </div>
      <div className={styles.content}>
        {footerData.map((column: ColumnData) => (
          <FooterColumn
            key={column.heading}
            columnData={column}
          />
        ))}
      </div>
      <div className={styles.ellipseIcon}>
        <Image
          className={styles.rectangleIcon}
          src={Ellipse}
          alt={'Footer ellipse icon'}
        />
      </div>
    </footer>
  );
};

export { Footer };
