import type { GetStaticProps, NextPage } from 'next';
import acrylic from '/public/img/temp/6.jpg';
import me from '/public/img/me.jpeg';
import {
    AnimatePresence,
    motion,
    useTransform,
    useViewportScroll,
} from 'framer-motion';
import ImageLoader from '../components/ImageLoader/ImageLoader';
import { useEffect, useRef, useState } from 'react';
import useMeasure from 'react-use-measure';
import { mergeRefs } from 'react-merge-refs';
import Link from 'next/link';
import { PhotoGrid } from '@components';
import { randomPhotos } from '../utils/mock/data';
import { useInView } from 'react-intersection-observer';

type HomeProps = {};

const Home: NextPage<HomeProps> = ({}) => {
    const { scrollX, scrollY } = useViewportScroll();
    const [photoRef, { height, bottom }] = useMeasure();
    const y = useTransform(scrollY, [0, height - 200], [100, height + 25]);
    const color = useTransform(y, [height, height], ['#fff', '#000']);

    const MotionImageLoader = motion(ImageLoader);

    const inViewOpts = {
        rootMargin: '-200px',
    };

    const { ref: imageInViewRef, inView: imageInView } = useInView(inViewOpts);
    const { ref: whoAmIInViewRef, inView: whoAmIInView } =
        useInView(inViewOpts);

    const cont = {
        in: {
            opacity: 1,
            transition: {
                staggerChildren: 0.25,
            },
        },
        out: {
            opacity: 0,
        },
    };
    const fadeIn = {
        in: {
            opacity: 1,
        },
        out: {
            opacity: 0,
        },
    };

    return (
        <div
            className={`relative flex min-h-[500vh] 
        flex-col items-center`}
        >
            <ImageLoader
                src={acrylic}
                alt={'main'}
                ref={mergeRefs([photoRef, imageInViewRef])}
                className={`relative mb-[100px] aspect-square w-full overflow-hidden rounded-[50%_25%] grayscale`}
            />
            <motion.h1
                className="absolute left-0 cursor-pointer bg-zinc-900 p-3 text-7xl font-black text-zinc-50"
                style={{ y }}
                onClick={() => window.scrollTo(0, bottom)}
            >
                WHO I ILLZ?
            </motion.h1>
            <AnimatePresence>
                {!imageInView && (
                    <motion.section
                        id={'about-me'}
                        variants={cont}
                        initial="out"
                        animate="in"
                        exit="out"
                        className="flex w-auto flex-col pt-10"
                        ref={whoAmIInViewRef}
                    >
                        <ImageLoader
                            src={me}
                            alt={'Me'}
                            className={
                                'relative aspect-square w-1/3 overflow-hidden rounded-[25%_10%_25%] object-top grayscale'
                            }
                            imgClassName={`object-cover`}
                        />
                        <motion.p
                            className={`self-start pt-5`}
                            variants={fadeIn}
                        >
                            Christianity generally born across notebook quotes
                            cubic, sharing settle prague. Johnston rover lived
                            furnished teenage. Diploma spam sig sony round pos
                            prime, grows introducing obligations sugar wear
                            brother relate, activities peripheral frequent
                            bleeding pride wheels reward, parental
                            pays.Christianity generally born across notebook
                            quotes cubic, sharing settle prague. Johnston rover
                            lived furnished teenage. Diploma spam sig sony round
                            pos prime, grows introducing obligations sugar wear
                            brother relate, activities peripheral frequent
                            bleeding pride wheels reward, parental pays.
                        </motion.p>
                    </motion.section>
                )}
            </AnimatePresence>
            <AnimatePresence exitBeforeEnter>
                {!whoAmIInView && !imageInView && (
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        id="projects"
                        className={`flex w-full flex-col pt-5`}
                    >
                        <h1 className={`pb-5 text-6xl font-black`}>Projects</h1>
                        <PhotoGrid photos={randomPhotos} />
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Home;
