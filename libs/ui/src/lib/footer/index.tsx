import 'server-only';

import { getFooterData } from './data';
import { ColumnData, FooterColumn } from './components/footer-column';
import styles from './footer.module.css';
import Image from 'next/image';
import Ellipse from './images/Ellipse.svg';
import Rectangle from './images/Rectangle.svg';
import { Dictionary } from '@fdk-frontend/dictionaries';

type FooterProps = {
  dictionary: Dictionary;
};

const Footer = ({ dictionary }: FooterProps) => {
  const footerData = getFooterData(dictionary);
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
