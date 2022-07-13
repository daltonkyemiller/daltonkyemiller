import type { GetStaticProps, NextPage } from 'next';
import acrylic from '/public/img/temp/6.jpg';
import {
    motion,
    useInView,
    useTransform,
    useViewportScroll,
} from 'framer-motion';
import ImageLoader from '../components/ImageLoader/ImageLoader';
import { useEffect, useRef, useState } from 'react';
import useMeasure from 'react-use-measure';

type HomeProps = {};

const Home: NextPage<HomeProps> = ({}) => {
    const { scrollX, scrollY } = useViewportScroll();
    const [photoRef, { height }] = useMeasure();
    const y = useTransform(scrollY, [0, 1000], [0, 1000]);
    const color = useTransform(y, [height, height], ['#fff', '#000']);

    const daltonRef = useRef(null);
    const daltonInView = useInView(daltonRef);
    return (
        <div
            className={`relative flex flex-col 
        items-center`}
        >
            <ImageLoader
                src={acrylic}
                alt={'main'}
                className={`relative aspect-square w-full  overflow-hidden rounded-[50%_25%] grayscale`}
            />
            <motion.h1
                className="absolute  left-0 top-[10%] rounded-sm bg-zinc-900 p-3 text-7xl font-black text-zinc-50"
                style={{ y }}
            >
                WHO AM I?
            </motion.h1>
        </div>
    );
};

export default Home;
