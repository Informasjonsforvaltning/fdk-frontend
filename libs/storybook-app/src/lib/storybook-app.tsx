import styles from './storybook-app.module.scss';

/* eslint-disable-next-line */
export interface StorybookAppProps {}

export const StorybookApp = (props: StorybookAppProps) => (
  <div className={styles['container']}>
    <h1>Welcome to StorybookApp!</h1>
  </div>
);

export default StorybookApp;
