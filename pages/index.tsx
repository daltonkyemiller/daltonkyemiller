import type { GetStaticProps, NextPage } from 'next';
import acrylic from '../public/img/acryl.jpg';
import {
    motion,
    useInView,
    useTransform,
    useViewportScroll,
} from 'framer-motion';
import useMeasure from 'react-use-measure';
import Image from 'next/future/image';
import { useContext, useRef } from 'react';
import { ThemeContext } from '../utils/theme/themeContext';
import TypeIn from '../components/TypeIn/TypeIn';
import { projects } from '../utils/mock/data';
import FloatingCards from '../components/FloatingCards/FloatingCards';

type HomeProps = {};

const Home: NextPage<HomeProps> = ({}) => {
    const { scrollY, scrollYProgress } = useViewportScroll();
    const theme = useContext(ThemeContext);

    const y = useTransform(scrollY, [0, 500], [0, 25]);
    const imgY = useTransform(scrollY, [0, 500], [0, -100]);

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
            y: 0,
            opacity: 1,
            transition: {
                ease: 'easeInOut',
                duration: 0.5,
            },
        },
        out: {
            y: 100,
            opacity: 0,
        },
    };

    return (
        <>
            <motion.section
                className={`relative w-full`}
                variants={cont}
                initial="out"
                animate="in"
            >
                <motion.div
                    variants={fadeIn}
                    className={`z-10 text-center font-brand text-[6vw] font-thin`}
                    style={{ y }}
                >
                    DALTON KYE MILLER
                </motion.div>
                <motion.div
                    variants={fadeIn}
                    className={`relative h-[500px] w-full overflow-hidden`}
                    style={{ top: imgY }}
                >
                    <Image
                        src={acrylic}
                        className={`h-full w-full object-cover object-top ${
                            theme.theme === 'dark' ? 'invert' : ''
                        }`}
                        alt={`acrylic`}
                    />
                </motion.div>
            </motion.section>
            <section className={`-mt-[75px] w-1/2 pb-4`} id="who-am-i">
                <motion.h1 className={`font-brand text-6xl`}>
                    WHO AM I
                </motion.h1>
                <motion.p>
                    A creative and self-driven software developer with
                    experience in IT, customer service, and account management.
                    After some self development in the tech world, a passion to
                    aid in the creation of intuitive, useful and interactive
                    applications was discovered. Working in fast-paced teams
                    developed the skills necessary to effectively communicate
                    and creatively solve problems on the fly.
                </motion.p>
            </section>
            <section id={`projects`}>
                <h1 className="font-brand text-6xl">Projects</h1>
                <FloatingCards />
            </section>
        </>
    );
};

export default Home;
