import { motion } from 'framer-motion';
import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { useWindowDimensions } from '@hooks';
import { screens } from '@theme';
import Link from 'next/link';

type NavProps = {
    links: Array<{ name: string; href: string }>;
};

const Nav: React.FC<NavProps> = ({ links }: NavProps) => {
    const { width: screenWidth } = useWindowDimensions();
    const [showNav, setShowNav] = useState<boolean>(false);

    useEffect(() => {
        // @ts-ignore
        document.querySelector('main').style.display =
            showNav && screenWidth < screens['md'] ? 'none' : '';
    }, [screenWidth, showNav]);

    const content = {
        show: {
            display: 'flex',
            opacity: 1,
            transition: {
                duration: 0.25,
                staggerChildren: 0.25,
            },
        },
        hide: {
            opacity: 0,
            transition: {
                duration: 0.25,
                staggerChildren: 0.25,
            },
        },
    };
    const items = {
        hide: {
            x: -25,
            opacity: 0,
            transition: { duration: 0.25 },
        },
        show: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.25 },
        },
    };

    return (
        <nav
            className={`absolute z-10 h-screen basis-1/6 md:relative 
            ${showNav ? 'bg-slate-50' : 'bg-transparent'} transition-all`}
        >
            <HamButton open={showNav} onClick={() => setShowNav(!showNav)} />
            <motion.div
                className={`hidden h-full w-full flex-col items-center justify-center md:flex `}
                variants={content}
                animate={
                    showNav || screenWidth > screens['md'] ? 'show' : 'hide'
                }
                initial={`hide`}
            >
                <motion.h1
                    className="font-brand text-5xl font-semibold"
                    variants={items}
                >
                    DKM
                </motion.h1>
                <motion.div
                    className="my-2 w-1/3 border-t border-slate-400"
                    variants={items}
                />
                <motion.ul
                    className="flex flex-col gap-4 font-sans text-xl"
                    variants={items}
                >
                    {links.map((link) => (
                        <li key={link.name} onClick={() => setShowNav(false)}>
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
};
const HamButton: React.FC<HamButtonProps> = ({ open, onClick }) => {
    return (
        <div
            className={`${
                open ? 'relative' : 'fixed'
            } z-10 z-10 flex w-screen flex-col gap-1 p-1 md:hidden`}
            onClick={onClick}
        >
            <div
                className={`right-0 ml-auto h-2 w-10 bg-slate-900 transition-all ${
                    open ? 'translate-y-3 rotate-45' : ''
                }`}
            />
            <div
                className={`ml-auto h-2 w-10 bg-slate-900 transition-all ${
                    open ? 'opacity-0' : ''
                }`}
            />
            <div
                className={`ml-auto h-2 w-10 bg-slate-900 transition-all ${
                    open ? '-translate-y-3 -rotate-45' : ''
                }`}
            />
        </div>
    );
};

export default Nav;
