import { PropsWithChildren } from 'react';

import styles from './feedback-layout.module.scss';

const FeedbackLayout = async ({ children }: PropsWithChildren) => {
    return (
        <div className={styles.feedbackLayout}>
            {children}
            <div className={styles.feedbackBanner}>
                <div className={styles.feedbackBannerInner}>Feedback banner here</div>
            </div>
        </div>
    );
};

export default FeedbackLayout;
