import type { GetStaticProps, NextPage } from 'next';
import acrylic from '/public/img/marble.svg';
import me from '/public/img/me.jpeg';
import { motion, useTransform, useViewportScroll } from 'framer-motion';
import ImageLoader from '../components/ImageLoader/ImageLoader';
import useMeasure from 'react-use-measure';
import { PhotoGrid } from '@components';
import { randomPhotos } from '../utils/mock/data';
import { useInView } from 'react-intersection-observer';
import { useContext } from 'react';
import { ThemeContext } from '../utils/theme/themeContext';
import { useWindowDimensions } from '@hooks';
import FloatingCards from '../components/FloatingCards/FloatingCards';

type HomeProps = {};

const Home: NextPage<HomeProps> = ({}) => {
    const { scrollY, scrollYProgress } = useViewportScroll();
    const windowDimensions = useWindowDimensions();
    const [titleRef, { top: titleTop }] = useMeasure();

    const y = useTransform(scrollY, [0, 500], [-500, 0]);

    const inViewOpts = {
        rootMargin: '-10%',
    };

    const cont = {
        in: {
            opacity: 1,
            transition: {
                duration: 0.25,
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
        <div className={`relative min-h-[500vh] w-full p-4`}>
            <ImageLoader
                src={acrylic}
                className={`h-[500px] overflow-hidden dark:invert`}
                imgClassName={`object-cover object-[center_top] w-full h-full`}
            />
            <div id={`who-am-i`} />
            <motion.h1
                ref={titleRef}
                className={`relative font-brand text-6xl font-bold text-neutral-100 mix-blend-difference`}
                style={{ y }}
            >
                <a href={`#who-am-i`}>WHO I ILLZ?</a>
            </motion.h1>
            <section>
                <h1>BLAHBLAH</h1>
                <p>
                    Hey increasing cargo announcements judgment older responses,
                    stress plays notes buck ticket coaching upper, through mic
                    siemens neighborhood.
                </p>
            </section>
            <section id={`projects`}>
                <FloatingCards />
            </section>
            {/*<ImageLoader src={acrylic} className={`w-full rotate-180 `} />*/}
        </div>
    );
};

export default Home;
