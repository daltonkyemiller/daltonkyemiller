import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/future/image';
import { AnimatePresence, motion } from 'framer-motion';

type ImageProps = {
    src: string | StaticImageData;
    alt: string;
    delay?: number;
    className?: string;
    style?: React.CSSProperties;
    onLoad?: () => void;
};

const ImageLoader = ({
    src,
    alt,
    delay,
    className,
    style,
    onLoad,
}: ImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    return (
        <span className={`isolate`}>
            <AnimatePresence exitBeforeEnter>
                {!isLoaded && <ImageSkeleton />}
            </AnimatePresence>
            <Image
                src={src}
                alt={alt}
                className={`${className}`}
                style={{ ...style }}
                onLoadingComplete={() => {
                    setTimeout(() => {
                        setIsLoaded(true);
                        if (onLoad) onLoad();
                    }, delay ?? 1000);
                }}
            />
        </span>
    );
};

const ImageSkeleton = () => {
    const shimmerVariants = {
        initial: {
            backgroundPosition: '-1000px 0',
        },
        shimmer: {
            backgroundPosition: ['-1000px 0', '1000px 0'],
            transition: { repeat: Infinity, duration: 2, ease: 'linear' },
        },
    };
    return (
        <motion.div
            className={`absolute z-10 h-full w-full bg-gray-900`}
            variants={shimmerVariants}
            initial={`initial`}
            animate={`shimmer`}
            exit={{ opacity: [1, 0] }}
            style={{
                backgroundSize: '1000px 100%',
                backgroundImage: `linear-gradient(to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%)`,
            }}
        />
    );
};

export default ImageLoader;
