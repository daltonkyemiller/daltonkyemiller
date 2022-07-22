import type { GetStaticProps, NextPage } from 'next';
import {
    motion,
    MotionValue,
    useInView,
    useTransform,
    useViewportScroll,
} from 'framer-motion';
import { projects } from '../utils/mock/data';
import FloatingCards from '../components/FloatingCards/FloatingCards';
import { useDetectBrowser } from '@hooks';
import { useContext, useState } from 'react';
import { ThemeContext } from '../utils/theme/themeContext';
import Image from 'next/future/image';
import { PhotoGrid } from '@components';
import TypeIn from '../components/TypeIn/TypeIn';
import { LayoutContext } from 'utils/context/layoutContext';

type HomeProps = {};

function HeaderSVG(props: { values: MotionValue<number> }) {
    return (
        <svg
            width={`100%`}
            height={`100%`}
            xmlns="http://www.w3.org/2000/svg"
            id={'header-image'}
        >
            <filter id="displacementFilter">
                <motion.feTurbulence
                    type="fractalNoise"
                    numOctaves="1"
                    result="turbulence"
                    baseFrequency={0.005}
                />
                <motion.feColorMatrix type="hueRotate" values={props.values} />
                <feDisplacementMap
                    in="SourceGraphic"
                    scale="50"
                    xChannelSelector="R"
                    yChannelSelector="G"
                />
            </filter>
            <image
                style={{
                    transformBox: 'fill-box',
                    transformOrigin: 'center',
                }}
                // mask={`url(#vignette)`}
                transform={`scale(1.1)`}
                filter={`url(#displacementFilter)`}
                href="/img/acryl.jpg"
                width="100%"
            />
            <defs>
                <radialGradient id="myGradient">
                    <stop offset="50%" stopColor="white" />
                    <stop offset="90%" stopColor="black" />
                </radialGradient>
            </defs>
            <mask id="vignette">
                <rect width="100%" height="100%" fill="url(#myGradient)" />
            </mask>
        </svg>
    );
}

const Home: NextPage<HomeProps> = ({}) => {
    const { scrollY, scrollYProgress } = useViewportScroll();

    const y = useTransform(scrollY, [0, 500], [-100, 0]);
    const lineHeight = useTransform(scrollY, [0, 500], [1, 0]);
    const daltonY = useTransform(scrollY, [0, 500], [0, 50]);
    const theme = useContext(ThemeContext);
    const layout = useContext(LayoutContext);

    const [imageLoaded, setImageLoaded] = useState(false);

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
            <section
                className={`relative flex w-full flex-col justify-center`}
                style={{ height: `calc(100vh - ${layout.navHeight}px)` }}
            >
                <motion.div
                    className={`relative text-center`}
                    variants={cont}
                    initial={'out'}
                    animate={'in'}
                >
                    <motion.div
                        className={`overflow-hidden font-brand text-[10vw] font-thin`}
                        style={{ y: daltonY }}
                    >
                        <TypeIn
                            text={'DALTON'}
                            animIn={{ opacity: 1, y: 0, x: 0 }}
                            animOut={{ opacity: 0, y: 200, x: 10 }}
                            duration={0.5}
                        />
                    </motion.div>
                    <motion.div
                        className={`mx-auto h-[3rem] w-full overflow-hidden`}
                        initial={{ scaleY: 0 }}
                        animate={imageLoaded ? { scaleY: 1 } : { scaleY: 0 }}
                        transition={{ ease: 'easeInOut' }}
                    >
                        <motion.div
                            style={{ y }}
                            className={`${theme.theme === 'dark' && 'invert'}`}
                        >
                            <Image
                                src={'/img/acryl.jpg'}
                                className={`object-cover object-center`}
                                alt={'Header Image'}
                                width={3840}
                                height={2160}
                                onLoadingComplete={() => {
                                    setTimeout(() => {
                                        setImageLoaded(true);
                                    }, 1000);
                                }}
                            />
                        </motion.div>
                    </motion.div>
                    <div>
                        <motion.span
                            className={`inline-block font-brand text-[10vw] font-thin`}
                            variants={fadeIn}
                        >
                            KYE &nbsp;
                        </motion.span>
                        <motion.span
                            className={`inline-block font-brand text-[10vw] font-thin`}
                            variants={fadeIn}
                        >
                            MILLER
                        </motion.span>
                    </div>
                </motion.div>
            </section>
            <section className={`w-2/3 py-4`} id="who-am-i">
                <motion.h1 className={`font-brand text-6xl`}>
                    BLAH BLAH BLAH
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
