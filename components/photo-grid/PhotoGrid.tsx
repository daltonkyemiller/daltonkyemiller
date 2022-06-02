import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useMousePosition, useWindowDimensions } from '@hooks';
import { range } from '../../utils/helpers';
import { screens } from '@theme';

type PhotoGridProps = {
    photos: Array<string>,
};


const PhotoGrid: React.FC<PhotoGridProps> = ({photos}: PhotoGridProps) => {
    return (
        <div className={`grid w-full h-full gap-2 grid-cols-1 md:grid-cols-3`}
        >
            {
                photos.map((photo, idx) => (
                    <Photo key={photo} photo={photo} idx={idx}/>
                ))
            }
        </div>
    );
};

type PhotoProps = {
    photo: string,
    idx: number,
};

const Photo: React.FC<PhotoProps> = ({photo, idx}) => {
    const mousePos = useMousePosition();
    const {width: screenWidth, height: screenHeight} = useWindowDimensions();
    const mouseSpringOptions = {mass: .25};
    const mouseX = useSpring(0, mouseSpringOptions);
    const mouseY = useSpring(0, mouseSpringOptions);
    const x = useTransform(mouseX, [0, 100], [-50, 50]);
    const y = useTransform(mouseY, [0, 100], [-50, 50]);

    const {ref, inView,} = useInView({
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
            <motion.div className={`w-full h-full`} variants={variants} animate={inView ? 'show' : 'hide'}
                        style={screenWidth > screens['md'] ? {x, y} : undefined}
            >
                <Image alt={photo} src={photo} layout={'fill'} objectFit={`cover`} priority={inView}/>

            </motion.div>
        </motion.div>

    );
};


export default PhotoGrid;