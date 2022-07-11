import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useMousePosition, useWindowDimensions } from '@hooks';
import { range } from '../../utils/helpers';
import { screens } from '@theme';
import Link from 'next/link';

type PhotoGridProps = {
    photos: Array<string>,
};


const PhotoGrid: React.FC<PhotoGridProps> = ({photos}: PhotoGridProps) => {
    return (
        <div className={`grid w-full h-full gap-2 grid-cols-1 md:grid-cols-2`}>
            {
                photos.map((photo, idx) => (
                    <motion.div key={photo} layoutId={photo}>
                        <Photo photo={photo} idx={idx}/>
                        <h1 className={`text-2xl font-bold`}>Test</h1>
                    </motion.div>
                ))
            }
        </div>
    );
};

type PhotoProps = {
    photo: string,
    idx: number,
};

export const Photo: React.FC<PhotoProps> = ({photo, idx}) => {
    const mousePos = useMousePosition();
    const {width: screenWidth, height: screenHeight} = useWindowDimensions();
    const mouseSpringOptions = {mass: .25};
    const mouseX = useSpring(0, mouseSpringOptions);
    const mouseY = useSpring(0, mouseSpringOptions);
    const x = useTransform(mouseX, [0, 100], [-50, 50]);
    const y = useTransform(mouseY, [0, 100], [-50, 50]);

    const [isLoaded, setIsLoaded] = useState(false);

    const {ref, inView} = useInView({
        threshold: .1
    });


    useEffect(() => {
        const mouseXPercent = (mousePos.x / screenWidth) * 100;
        const mouseYPercent = (mousePos.y / screenHeight) * 100;
        mouseX.set(mouseXPercent);
        mouseY.set(mouseYPercent);
    }, [mousePos.x, mousePos.y, screenHeight, screenWidth, mouseX, mouseY]);


    const variants = {
        show: {
            opacity: 1,
            scale: 1.35,

        },
        hide: {
            opacity: 0,

        }
    };

    return (
        <motion.div
            ref={ref}
            className={`relative w-100 h-[300px] overflow-hidden`}
        >
            <motion.div className={`w-full h-full`} variants={variants}
                        animate={inView && isLoaded ? 'show' : 'hide'}
                        style={screenWidth > screens['md'] ? {x, y} : undefined}
            >
                <Link href={`/project/test?id=${photo}`}>
                    <a>
                        <Image alt={photo} src={photo} layout={'fill'} objectFit={`cover`}
                               onLoad={() => setIsLoaded(true)}/>
                    </a>
                </Link>

            </motion.div>
        </motion.div>

    );
};


export default PhotoGrid;