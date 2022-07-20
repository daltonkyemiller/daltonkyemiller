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
            <motion.div
                className={
                    'absolute w-[.1rem] bg-neutral-900 dark:bg-neutral-100'
                }
                initial={{ height: '0%' }}
                animate={{ height: '100%' }}
                transition={{ duration: 10 }}
            />
            <motion.div
                className={
                    'absolute h-[.1rem] bg-neutral-900 dark:bg-neutral-100'
                }
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 10 }}
            />
            <div
                className={`grid grid-cols-2 content-center gap-2 font-brand font-medium`}
            >
                <h1 className={`p-3`}>Loading</h1>
                <h1 className={`p-3`}>Work</h1>
                <h1 className={`p-3`}>&lt;/In&gt;</h1>
                <h1 className={`p-3`}>Progress</h1>
            </div>
        </motion.div>
    );
};

export default Loader;
