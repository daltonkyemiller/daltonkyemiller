import type { GetStaticProps, NextPage } from 'next';
import acrylic from '/public/img/marble.svg';
import {
    motion,
    useInView,
    useTransform,
    useViewportScroll,
} from 'framer-motion';
import useMeasure from 'react-use-measure';
import { useWindowDimensions } from '@hooks';
import FloatingCards from '../components/FloatingCards/FloatingCards';
import Image from 'next/future/image';
import { useContext, useRef } from 'react';
import { ThemeContext } from '../utils/theme/themeContext';
import TypeIn from '../components/TypeIn/TypeIn';
import { projects } from '../utils/mock/data';

type HomeProps = {};

const Home: NextPage<HomeProps> = ({}) => {
    const { scrollY, scrollYProgress } = useViewportScroll();
    const [titleRef, { top: titleTop }] = useMeasure();
    const theme = useContext(ThemeContext);

    const y = useTransform(scrollY, [0, 500], [-500, 0]);

    const [secondTitleRef, { width: secondTitleWidth }] = useMeasure();

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
        <div className={`relative w-full p-4`}>
            <div className={`relative h-[500px] w-full`}>
                <Image
                    src={acrylic}
                    className={`h-full w-full object-cover  ${
                        theme.theme !== 'dark' ? 'invert' : ''
                    }`}
                    alt={`acrylic`}
                />
                <motion.div
                    className={`absolute top-0 z-10 whitespace-nowrap text-[6vw] font-bold text-neutral-100 mix-blend-difference`}
                >
                    <TypeIn
                        text="</DaltonKyeMiller>"
                        animOut={{ opacity: 0 }}
                        animIn={{ opacity: 1 }}
                        delay={0.1}
                        duration={0}
                    />
                </motion.div>
            </div>
            <section>
                <h1>BLAHBLAH</h1>
                <p>
                    Hey increasing cargo announcements judgment older responses,
                    stress plays notes buck ticket coaching upper, through mic
                    siemens neighborhood.
                </p>
            </section>
            <section id={`projects`}>
                <h1 className="pb-3 font-brand text-6xl font-bold">
                    Project Zone
                </h1>
                {/*<FloatingCards />*/}
            </section>
            {/*<ImageLoader src={acrylic} className={`w-full rotate-180 `} />*/}
        </div>
    );
};

export default Home;
