import type { GetStaticProps, NextPage } from 'next';
import { PhotoGrid } from '@components';
import Image from 'next/future/image';
import plants from '/public/img/temp/plants.jpg';
import { motion, useTransform, useViewportScroll } from 'framer-motion';

type HomeProps = {};

const Home: NextPage<HomeProps> = ({}) => {
    const { scrollX, scrollY } = useViewportScroll();
    const y = useTransform(scrollY, [0, 500], [0, -100]);

    return (
        <div
            className={`relative flex min-h-[500vh] flex-col 
        items-center text-gray-900`}
        >
            <div
                className={`isolate flex h-screen max-h-screen items-center justify-center`}
            >
                <motion.h1
                    style={{ y }}
                    className={`pointer-events-none absolute z-10 text-5xl font-bold tracking-wide`}
                >
                    WHO AM I?
                </motion.h1>
                <div
                    className={`h-[1000px] w-[1000px] overflow-hidden rounded-[10%_50%] blur-sm transition-all`}
                >
                    <Image src={plants} alt={`Plants`} />
                </div>
            </div>
        </div>
    );
};

export default Home;
