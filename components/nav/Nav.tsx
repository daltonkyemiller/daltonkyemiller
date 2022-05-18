import { motion } from 'framer-motion';
import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { useWindowDimensions } from '@hooks';
import { screens } from '@theme';
import Link from 'next/link';


type NavProps = {
    links: Array<{ name: string, href: string }>
}

const Nav: React.FC<NavProps> = ({links}: NavProps) => {
    const {width: screenWidth} = useWindowDimensions();
    const [showNav, setShowNav] = useState<boolean>(true);

    const navVariants = {
        show: {
            display: 'flex',
            opacity: [0, 1],
            transition: {duration: .25}
        },
        hide: {
            opacity: [1, 0],
            transition: {duration: .25},
        
        }
    };

    return (
        <nav className={`basis-1/6 z-10`}>
            <HamButton open={showNav} onClick={() => setShowNav(!showNav)}/>
            <motion.div
                className={`flex flex-col transition-all items-center justify-center h-screen w-full bg-slate-100 `}
                variants={navVariants}
                initial={'show'}
                animate={showNav ? 'show' : 'hide'}
            >
                <h1
                    className="font-brand font-semibold text-5xl">
                    DKM
                </h1>
                <div
                    className="border-t border-slate-400 w-1/3 my-2"/>
                <ul
                    className="flex flex-col text-xl font-sans gap-4 ">
                    {links.map(link => (
                        <li key={link.name}>
                            <Link href={link.href}>{link.name}</Link>
                        </li>
                    ))}

                </ul>
            </motion.div>
        </nav>
    );
};


type HamButtonProps = {
    open: boolean;
    onClick: MouseEventHandler;
}
const HamButton: React.FC<HamButtonProps> = ({open, onClick}) => {
    return (
        <div className={`relative flex flex-col md:hidden gap-1 z-10 w-screen p-1 z-10`} onClick={onClick}>
            <div
                className={`ml-auto w-10 h-2 bg-slate-900 transition-all right-0 ${open ? 'rotate-45 translate-y-3' : ''}`}/>
            <div
                className={`ml-auto w-10 h-2 bg-slate-900 transition-all ${open ? 'opacity-0' : ''}`}/>
            <div
                className={`ml-auto w-10 h-2 bg-slate-900 transition-all ${open ? '-rotate-45 -translate-y-3' : ''}`}/>
        </div>
    );
};

export default Nav;