import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { projects } from '../../utils/mock/data';
import ImageLoader from '../../components/ImageLoader/ImageLoader';

type NameProps = {};

const Project: NextPage<NameProps> = ({}) => {
    const router = useRouter();
    const { name } = router.query;

    return (
        <div className={'min-h-screen'}>
            <motion.div className={``} layoutId={name}>
                <h1 className={`p-5 text-6xl font-bold`}>
                    {projects[parseInt(name)]?.name}
                </h1>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className={``}
            >
                <ImageLoader
                    src={
                        'https://raw.githubusercontent.com/daltonkyemiller/codeup-web-exercises/main/readme/images/weather_map_desktop.gif'
                    }
                />
            </motion.div>
        </div>
    );
};

export default Project;
