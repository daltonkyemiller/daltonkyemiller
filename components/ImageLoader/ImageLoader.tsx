import React, { ForwardedRef, forwardRef, useState } from 'react';
import Image, { ImageProps, StaticImageData } from 'next/future/image';
import { AnimatePresence, motion } from 'framer-motion';
import { constants } from 'os';

type ImageLoaderProps = ImageProps & {
    delay?: number;
    imgClassName?: string;
    onLoad?: () => void;
};

const ImageLoader = forwardRef(
    (
        {
            src,
            alt,
            priority,
            width,
            height,
            delay,
            className,
            imgClassName,
            style,
            onLoad,
        }: ImageLoaderProps,
        ref: ForwardedRef<any>
    ) => {
        const [isLoaded, setIsLoaded] = useState(false);
        return (
            <div className={`relative ${className}`} ref={ref} style={style}>
                <AnimatePresence exitBeforeEnter>
                    {!isLoaded && <ImageSkeleton />}
                </AnimatePresence>
                <Image
                    className={imgClassName ?? 'h-full w-full object-cover'}
                    src={src}
                    alt={alt}
                    priority={priority ?? false}
                    width={width ?? 1000}
                    height={height ?? 1000}
                    onLoadingComplete={() => {
                        setTimeout(() => {
                            setIsLoaded(true);
                            if (onLoad) onLoad();
                        }, delay ?? 1000);
                    }}
                />
            </div>
        );
    }
);
ImageLoader.displayName = 'ImageLoader';

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
            className={`absolute h-full w-full bg-gray-900`}
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
