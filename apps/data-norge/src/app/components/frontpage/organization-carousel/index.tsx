'use client';

import organizations from './organizations.json';
import styles from './organization-carousel.module.scss';
import React, { useEffect, useState } from 'react';
import { Tooltip } from '@digdir/designsystemet-react';
import { Dictionary } from '@fdk-frontend/dictionaries';

type Props = {
    dictionary: Dictionary;
};

const OrganizationCarousel = ({ dictionary }: Props) => {
    const INITIAL_INDEX = 0;
    const FADE_DURATION = 500;
    const INTERVAL = 6000;

    const [currentIndex, setCurrentIndex] = useState<number>(INITIAL_INDEX);
    const [fade, setFade] = useState<boolean>(true);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [shuffledOrganizations, setShuffledOrganizations] = useState<string[]>([]);

    useEffect(() => {
        const shuffled = [...organizations].sort(() => Math.random() - 0.5);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setShuffledOrganizations(shuffled);
    }, []);

    const handleRotation = () => {
        setFade(false);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffledOrganizations.length);
            setFade(true);
        }, FADE_DURATION);
    };

    useEffect(() => {
        if (isPaused) return;
        const intervalId = setInterval(handleRotation, INTERVAL);
        return () => clearInterval(intervalId);
    }, [isPaused, currentIndex, shuffledOrganizations]);

    return (
        <div>
            <Tooltip
                className={styles.tooltip}
                content={isPaused ? dictionary.shareDataBanner.popover.start : dictionary.shareDataBanner.popover.pause}
                placement='top'
            >
                <span
                    role='button'
                    tabIndex={0}
                    onClick={() => setIsPaused((prevState) => !prevState)}
                    onKeyDown={(e) => e.key === 'Enter' && setIsPaused((prevState) => !prevState)}
                    className={`${fade ? styles['fade-in'] : styles['fade-out']}`}
                >
                    {`${dictionary.shareDataBanner.doLike} ${shuffledOrganizations[currentIndex]}`}
                </span>
            </Tooltip>
        </div>
    );
};

export default OrganizationCarousel;
