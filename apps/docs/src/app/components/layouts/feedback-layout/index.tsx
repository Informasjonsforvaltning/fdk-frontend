import styles from './feedback-layout.module.scss';

const FeedbackLayout = async (props) => {
	return (
		<div className={styles.feedbackLayout}>
			{props.children}
			<div className={styles.feedbackBanner}>
				<div className={styles.feedbackBannerInner}>
					Feedback banner here
				</div>
			</div>
		</div>
	);
}

export default FeedbackLayout;
