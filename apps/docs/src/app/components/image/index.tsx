import NextImage from 'next/image';
import React, { FC } from 'react';


interface ImageProps {
    width: number;
    height: number
    src: string;
    alt: string;
}

const Image: FC<ImageProps> = ({ width = 500, height = 500, ...props }) => {
    return <NextImage width={width} height={height} {...props} />;
}

export default Image;