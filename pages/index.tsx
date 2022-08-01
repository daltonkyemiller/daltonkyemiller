import type { GetStaticProps, NextPage } from 'next';
import {
    motion,
    MotionValue,
    useTransform,
    useViewportScroll,
} from 'framer-motion';
import { projects } from '../utils/mock/data';
import FloatingCards from '../components/FloatingCards/FloatingCards';
import { useContext, useState } from 'react';
import { ThemeContext } from '../utils/theme/themeContext';
import Image from 'next/future/image';
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
                style={{ height: `calc(100vh - 96px)` }}
            >
                <motion.div
                    className={`relative whitespace-nowrap text-center font-brand text-6xl font-thin md:text-9xl`}
                    variants={cont}
                    initial={'out'}
                    animate={'in'}
                >
                    <motion.div
                        className={`overflow-hidden py-6`}
                        style={{ y: daltonY }}
                    >
                        <TypeIn
                            text={'DALTON'}
                            animIn={{ opacity: 1, y: 0, x: 0 }}
                            animOut={{ opacity: 0, y: 200, x: 50 }}
                            duration={0.5}
                        />
                    </motion.div>
                    <motion.div
                        className={`isolate mx-auto h-[10vh] w-full overflow-hidden `}
                        initial={{ scaleY: 0 }}
                        animate={imageLoaded ? { scaleY: 1 } : { scaleY: 0 }}
                        transition={{ ease: 'easeInOut' }}
                    >
                        <motion.div
                            style={{ y }}
                            className={`${theme.theme === 'dark' && 'invert'} `}
                        >
                            <Image
                                src={'/img/acryl.jpg'}
                                className={`scale-[2] object-cover object-center`}
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
                    <div className={`py-6`}>
                        <motion.span
                            className={`inline-block`}
                            variants={fadeIn}
                        >
                            KYE &nbsp;
                        </motion.span>
                        <motion.span
                            className={`inline-block`}
                            variants={fadeIn}
                        >
                            MILLER
                        </motion.span>
                    </div>
                    <div></div>
                </motion.div>
            </section>
        </>
    );
};

export default Home;
