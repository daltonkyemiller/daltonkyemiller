import { motion } from 'framer-motion';
import React from 'react';

type LoaderProps = {};

const Loader = ({}: LoaderProps) => {
    const variants = {
        initial: {
            opacity: 1,
        },
        animate: {
            opacity: 1,
        },
        exit: {
            opacity: 0,
        },
    };
    return (
        <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`absolute inset-0 z-[9999] flex h-screen w-screen items-center justify-center bg-neutral-100 dark:bg-neutral-900`}
        >
            <h1>Loading...</h1>
        </motion.div>
    );
};

export default Loader;
