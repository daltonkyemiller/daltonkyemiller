import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useMousePosition, useWindowDimensions } from '@hooks';
import { range } from '../../utils/helpers';
import { screens } from '@theme';
import Link from 'next/link';
import ImageLoader from '../ImageLoader/ImageLoader';

type PhotoGridProps = {
    photos: Array<string>;
};

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos }: PhotoGridProps) => {
    return (
        <div className={`grid h-full w-full grid-cols-1 gap-2 md:grid-cols-2`}>
            {photos.map((photo, idx) => (
                <motion.div key={photo} layoutId={photo}>
                    <Photo photo={photo} idx={idx} />
                    <h1 className={`text-2xl font-bold`}>Test</h1>
                </motion.div>
            ))}
        </div>
    );
};

type PhotoProps = {
    photo: string;
    idx: number;
};

export const Photo: React.FC<PhotoProps> = ({ photo, idx }) => {
    const mousePos = useMousePosition();
    const { width: screenWidth, height: screenHeight } = useWindowDimensions();
    const mouseSpringOptions = { mass: 0.25 };
    const mouseX = useSpring(0, mouseSpringOptions);
    const mouseY = useSpring(0, mouseSpringOptions);
    const x = useTransform(mouseX, [0, 100], [-50, 50]);
    const y = useTransform(mouseY, [0, 100], [-50, 50]);

    const [isLoaded, setIsLoaded] = useState(false);

    const { ref, inView } = useInView({
        threshold: 0.1,
    });

    useEffect(() => {
        const mouseXPercent = (mousePos.x / screenWidth) * 100;
        const mouseYPercent = (mousePos.y / screenHeight) * 100;
        mouseX.set(mouseXPercent);
        mouseY.set(mouseYPercent);
    }, [mousePos.x, mousePos.y, screenHeight, screenWidth, mouseX, mouseY]);

    const variants = {
        show: {
            scale: 1.35,
            opacity: 1,
        },
        hide: { scale: 0, opacity: 0 },
    };

    return (
        <motion.div
            ref={ref}
            className={`w-100 relative h-[300px] overflow-hidden rounded-lg`}
        >
            <motion.div
                className={`h-full w-full`}
                variants={variants}
                initial={'hide'}
                animate={inView && isLoaded ? 'show' : 'hide'}
                style={screenWidth > screens['md'] ? { x, y } : undefined}
            >
                <Link href={`/project/test?id=${photo}`} className={``}>
                    <a>
                        <ImageLoader
                            alt={photo}
                            src={photo}
                            onLoad={() => setIsLoaded(true)}
                            imgClassName={`h-full w-full`}
                        />
                    </a>
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default PhotoGrid;
