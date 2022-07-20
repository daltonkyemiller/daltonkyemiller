import type { GetStaticProps, NextPage } from 'next';
import acrylic from '/public/img/acryl.jpg';
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
        <div className={`relative w-full px-4`}>
            <div className={`relative h-[500px] w-full overflow-hidden`}>
                <Image
                    src={acrylic}
                    className={`h-full w-full object-cover object-top ${
                        theme.theme !== 'dark' ? 'invert' : ''
                    }`}
                    alt={`acrylic`}
                />
                <motion.div
                    className={`absolute top-0 z-10 whitespace-nowrap text-[6vw] font-bold text-white mix-blend-difference`}
                >
                    {/*<TypeIn*/}
                    {/*    text="</DaltonKyeMiller>"*/}
                    {/*    animOut={{ opacity: 0, y: -100 }}*/}
                    {/*    animIn={{ opacity: 1, y: 0 }}*/}
                    {/*    easing={`easeInOut`}*/}
                    {/*    delay={0.1}*/}
                    {/*    duration={0.05}*/}
                    {/*/>*/}
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
            </section>
        </div>
    );
};

export default Home;
