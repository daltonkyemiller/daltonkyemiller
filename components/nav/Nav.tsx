import { motion } from 'framer-motion';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { useWindowDimensions } from '@hooks';
import { screens } from '@theme';
import Link from 'next/link';


type NavProps = {
    links: Array<{ name: string, href: string }>
}

const Nav: React.FC<NavProps> = ({links}: NavProps) => {
    const {width: screenWidth} = useWindowDimensions();
    const [showNav, setShowNav] = useState<boolean>(false);
    useEffect(() => {
        if ((screenWidth as number) > screens['md']) setShowNav(true);
    }, [screenWidth]);

    const parentAnims = {
        hide: {
            opacity: 0,
            x: -25,
            transition: {
                duration: .25,
                staggerChildren: .1,
                staggerDirection: -1
            },
            transitionEnd: {
                display: 'none',
            }
        },
        show: {
            opacity: 1,
            x: 0,
            display: 'flex',
            transition: {
                staggerChildren: .1,
                staggerDirection: 1,
            }
        }
    };

    const childrenAnims = {
        hide: {
            x: -25,
            transition: {
                staggerChildren: .1,
                staggerDirection: -1,
            }
        },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                staggerChildren: .1,
                staggerDirection: 1,
            }
        }
    };

    return (
        <nav className={`basis-1/6`}>
            <HamButton open={showNav} onClick={() => setShowNav(!showNav)}/>
            <motion.div
                variants={parentAnims}
                initial={`hide`}
                animate={`${showNav ? 'show' : 'hide'}`}
                className={`absolute md:relative inline-flex flex-col items-center justify-center h-screen w-full bg-slate-100 top-0 left-0`}

            >
                <motion.h1
                    variants={childrenAnims}
                    className="font-brand font-semibold text-5xl">
                    DKM
                </motion.h1>
                <motion.div
                    variants={childrenAnims}
                    className="border-t border-slate-400 w-1/3 my-2"/>
                <motion.ul
                    variants={childrenAnims}
                    initial={`hide`}
                    animate={`${showNav ? 'show' : 'hide'}`}
                    className="flex flex-col text-xl font-sans gap-4 ">
                    {links.map(link => (
                        <motion.li key={link.name} variants={childrenAnims}>
                            <Link href={link.href}>{link.name}</Link>
                        </motion.li>
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