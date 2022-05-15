import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react';

type Props = {};

const Nav: React.FC<Props> = (props: Props) => {
    const [showNav, setShowNav] = useState<boolean>(true);
    const navContent = useRef<null | HTMLDivElement>(null);

    const variants = {
        show: {
            opacity: [0, 1],
            transition: {duration: .25}
        },
        hide: {
            opacity: [1, 0],
            transition: {duration: .25}

        }
    };

    return (
        <nav
            className="flex flex-col w-screen h-screen items-center justify-center bg-blue-50 text-center">
            <button className="absolute top-10" onClick={() => setShowNav(!showNav)}>Click</button>
            <motion.div className="flex flex-col items-center"
                        ref={navContent}
                        initial={'fadeIn'}
                        variants={variants}
                        animate={showNav ? 'show' : 'hide'}
            >
                <h1 className="font-brand font-semibold text-5xl">DKM</h1>
                <div className="border-t border-slate-400 w-[calc(100%+20px)] my-2"/>
                <ul className="flex flex-col text-xl font-sans gap-4 ">
                    <li><a href="/">Home</a></li>
                    <li><a href="/resume">Resume</a></li>
                    <li><a href="/about">About</a></li>
                </ul>
            </motion.div>
        </nav>
    );
};

export default Nav;