import { motion } from 'framer-motion';
import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { useWindowDimensions } from '@hooks';
import { screens } from '@theme';
import Link from 'next/link';


type NavProps = {
    links: Array<{ name: string, href: string }>,
}

const Nav: React.FC<NavProps> = ({links}: NavProps) => {
    const {width: screenWidth} = useWindowDimensions();
    const [showNav, setShowNav] = useState<boolean>(false);

    useEffect(() => {
        // @ts-ignore
        document.querySelector('main').style.display = showNav && screenWidth < screens['md'] ? 'none' : '';
    }, [screenWidth, showNav]);

    const content = {
        show: {
            display: 'flex',
            opacity: 1,
            transition: {
                duration: .25,
                staggerChildren: .25
            }
        },
        hide: {
            opacity: 0,
            transition: {
                duration: .25,
                staggerChildren: .25
            }

        }
    };
    const items = {
        hide: {
            x: -25,
            opacity: 0,
            transition: {duration: .25}
        },
        show: {
            x: 0,
            opacity: 1,
            transition: {duration: .25}
        }
    };

    return (
        <nav
            className={`basis-1/6 z-10 h-screen absolute md:relative 
            ${showNav ? 'bg-slate-50' : 'bg-transparent'} transition-all`}>
            <HamButton open={showNav} onClick={() => setShowNav(!showNav)}/>
            <motion.div
                className={`hidden md:flex flex-col items-center justify-center h-full w-full `}
                variants={content}
                animate={showNav || screenWidth > screens['md'] ? 'show' : 'hide'}
                initial={`hide`}
            >
                <motion.h1
                    className="font-brand font-semibold text-5xl"
                    variants={items}
                >
                    DKM
                </motion.h1>
                <motion.div
                    className="border-t border-slate-400 w-1/3 my-2"
                    variants={items}
                />
                <motion.ul
                    className="flex flex-col text-xl font-sans gap-4"
                    variants={items}
                >
                    {links.map(link => (
                        <li key={link.name}>
                            <Link href={link.href}>{link.name}</Link>
                        </li>
                    ))}

                </motion.ul>
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