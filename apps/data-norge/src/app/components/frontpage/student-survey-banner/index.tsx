import React from 'react';
import cn from 'classnames';
import { Link } from '@digdir/designsystemet-react';
import styles from './styles.module.scss';

const StudentSurveyBanner = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div className={cn(styles.wrapper, className)} {...props}>
			<strong>Har du 3 minutter?</strong> Svar på <Link href="https://datalandsbyen.norge.no/topic/595/sp%C3%B8rreunders%C3%B8kelse-til-bacheloroppgave-om-verdiskapning-av-data-norge-no?_=1744205057110">studentundersøkelse om data.norge.no her</Link>.
		</div>
	);
}

export default StudentSurveyBanner;