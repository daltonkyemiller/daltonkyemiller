import type { GetStaticProps, NextPage } from 'next';
import acrylic from '/public/img/temp/acrylic.jpg';
import {
    motion,
    useInView,
    useTransform,
    useViewportScroll,
} from 'framer-motion';
import ImageLoader from '../components/ImageLoader/ImageLoader';
import { useRef } from 'react';

type HomeProps = {};

const Home: NextPage<HomeProps> = ({}) => {
    const { scrollX, scrollY } = useViewportScroll();
    const y = useTransform(scrollY, [0, 500], [0, -500]);
    const y2 = useTransform(scrollY, [400, 750], [1000, 0]);
    const daltonRef = useRef(null);
    const daltonInView = useInView(daltonRef);
    return (
        <div
            className={`relative flex min-h-[500vh] flex-col 
        items-center `}
        >
            <div
                className={`isolate flex h-screen max-h-screen items-center justify-center`}
            >
                <motion.h1
                    style={{ y }}
                    className={`pointer-events-none absolute z-10 text-5xl font-bold tracking-wide text-gray-50 `}
                >
                    WHO AM I?
                </motion.h1>
                <motion.h1
                    ref={daltonRef}
                    style={{ x: y2, y: 700 }}
                    className={`pointer-events-none absolute z-10 text-5xl font-bold tracking-wide text-gray-900 `}
                >
                    Dalton.
                </motion.h1>
                <motion.h1
                    initial={{ opacity: 0 }}
                    style={{ y: 1250 }}
                    animate={{ opacity: !daltonInView ? 1 : 0 }}
                >
                    Okay?
                </motion.h1>
                <div
                    className={`relative h-[1000px] max-w-full overflow-hidden rounded-[10%_50%] transition-all`}
                >
                    <ImageLoader
                        src={acrylic}
                        alt={`plants`}
                        className={`contrast-200 grayscale`}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
