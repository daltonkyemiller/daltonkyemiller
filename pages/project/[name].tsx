import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Image from 'next/image';


type NameProps = {};

const Project: NextPage<NameProps> = ({}) => {
    const router = useRouter();
    const {name, id} = router.query;
    if (!id) return <div>No project found</div>;

    return (
        <div className={`prose`}>
            <div className={``}>
                
            </div>
        </div>
    );
};

export default Project;