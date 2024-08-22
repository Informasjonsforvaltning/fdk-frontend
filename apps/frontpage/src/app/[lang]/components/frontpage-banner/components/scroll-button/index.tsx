'use client';

import React from 'react';

import { ChevronDownIcon } from '@navikt/aksel-icons';

import styles from './scroll-button.module.scss';

const ScrollButton = () => {

	const scroll = () => {
		window.scrollTo({
			top: 200,
			left: 0,
			behavior: 'smooth'
		});
	}

	return (
		<button onClick={scroll} className={styles.scrollButton}>
			<ChevronDownIcon className={styles.arrow} />
			<span>Scroll</span>
		</button>
	);
}

export default ScrollButton;