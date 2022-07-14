import type { GetStaticProps, NextPage } from 'next';
import acrylic from '/public/img/marble.svg';
import me from '/public/img/me.jpeg';
import { motion, useTransform, useViewportScroll } from 'framer-motion';
import ImageLoader from '../components/ImageLoader/ImageLoader';
import useMeasure from 'react-use-measure';
import { PhotoGrid } from '@components';
import { randomPhotos } from '../utils/mock/data';
import { useInView } from 'react-intersection-observer';

type HomeProps = {};

const Home: NextPage<HomeProps> = ({}) => {
    const { scrollY } = useViewportScroll();
    const [photoRef, { height, bottom }] = useMeasure();
    const y = useTransform(scrollY, [0, height - 200], [100, height + 25]);
    const color = useTransform(y, [height, height], ['#fff', '#000']);

    const MotionImageLoader = motion(ImageLoader);

    const inViewOpts = {
        rootMargin: '-10%',
    };

    const { ref: whoAmIInViewRef, inView: whoAmIInView } =
        useInView(inViewOpts);
    const { ref: projectsRef, inView: projectsInView } = useInView(inViewOpts);

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
        <div
            className={`relative flex  
        flex-col items-center`}
        >
            <ImageLoader
                src={acrylic}
                alt={'main'}
                ref={photoRef}
                className={`relative aspect-square w-full overflow-hidden rounded-[50%_25%] `}
                imgClassName={`h-full w-full object-cover rotate-90 `}
                // style={{
                //     boxShadow: '0 0 200px 100px hsla(0, 93%, 25%, .25)',
                // }}
            />
            <motion.a
                className="absolute left-0 cursor-pointer bg-zinc-900 p-3 text-7xl font-black text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                style={{ y }}
                href={'#who-am-i'}
            >
                WHO I ILLZ?
            </motion.a>

            {/*Who Am I */}
            <motion.section
                id={'who-am-i'}
                variants={cont}
                initial="out"
                animate={whoAmIInView ? 'in' : 'out'}
                exit="out"
                className="flex w-auto flex-col pt-[150px]"
                ref={whoAmIInViewRef}
            >
                <ImageLoader
                    src={me}
                    alt={'Me'}
                    className={
                        'relative aspect-square w-1/3 overflow-hidden rounded-[25%_10%_25%] object-top '
                    }
                    imgClassName={`object-cover`}
                />
                <motion.p className={`self-start pt-5`} variants={fadeIn}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                    ea commodo consequat. Duis aute irure dolor in reprehenderit
                    in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident,
                    sunt in culpa qui officia deserunt mollit anim id est
                    laborum.
                </motion.p>
            </motion.section>

            {/* Projects */}
            <motion.section
                variants={cont}
                initial="out"
                animate={projectsInView ? 'in' : 'out'}
                exit="out"
                id="projects"
                className={`flex w-full flex-col pt-5`}
                ref={projectsRef}
            >
                <motion.h1
                    className={`pb-5 text-6xl font-black `}
                    variants={fadeIn}
                >
                    Projects
                </motion.h1>
                <motion.div variants={fadeIn}>
                    <PhotoGrid photos={randomPhotos} />
                </motion.div>
            </motion.section>
        </div>
    );
};

export default Home;
