import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { useWindowDimensions } from '@hooks';

type Props = {};

const Nav: React.FC<Props> = (props: Props) => {
    const [showNav, setShowNav] = useState<boolean>(true);
    const navContent = useRef<HTMLDivElement>(null);
    const windowDimensions = useWindowDimensions();

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
            className={'flex flex-col items-center justify-center text-center w-screen h-screen md:w-1/6'}>
            <p>{windowDimensions.width}{windowDimensions.currBreakpoint}</p>
            <button className={'absolute top-1 right-1 md:hidden z-10'} onClick={() => setShowNav(!showNav)}>
                Click
            </button>
            <motion.div className={'hidden md:flex flex-col items-center justify-center w-full h-screen bg-blue-50'}
                        ref={navContent}
                        variants={variants}
                        animate={showNav ? 'show' : 'hide'}
                        onAnimationStart={(def: string) => (def === 'show' && navContent.current !== null) ? navContent.current.classList.remove('hidden') : ''}
                        onAnimationComplete={(def: string) => def === 'hide' && navContent.current !== null ? navContent.current.classList.add('hidden') : ''}
            >
                <h1 className="font-brand font-semibold text-5xl">DKM</h1>
                <div className="border-t border-slate-400 w-1/3 my-2"/>
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