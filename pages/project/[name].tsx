import React, { useState } from 'react';
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
    const project = projects.find((p) => p.path === name);
    const [coverLoaded, setCoverLoaded] = useState(false);

    if (!project) return <></>;

    const fade = {
        in: {
            opacity: 1,
        },
        out: {
            opacity: 0,
        },
    };
    return (
        <div className={'min-h-screen min-w-full'}>
            <motion.div
                variants={fade}
                initial={{ ...fade.out, height: 0 }}
                animate={coverLoaded && { ...fade.in, height: 500 }}
                exit="out"
                transition={{ duration: 0.5, delay: 0.5 }}
                className={`h-[300px] w-full`}
            >
                <ImageLoader
                    src={project!.cover}
                    className={`h-full w-full`}
                    onLoad={() => setCoverLoaded(true)}
                />
            </motion.div>
            <motion.div layoutId={typeof name === 'string' ? name : name![0]}>
                <h1 className={`p-5 text-6xl font-bold`}>{project?.name}</h1>
                <motion.p className={`p-5 text-xl`}>
                    {project?.description}
                </motion.p>
            </motion.div>
        </div>
    );
};

export default Project;
