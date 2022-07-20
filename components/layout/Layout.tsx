import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { Nav } from '@components';
import { motion } from 'framer-motion';
import Head from 'next/head';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import { ThemeContext, ThemeProvider } from '../../utils/theme/themeContext';

type Props = {
    children: any;
};

const Layout: React.FC<Props> = (props: Props) => {
    const theme = useContext(ThemeContext);

    return (
        <>
            <Head>
                <title>Dalton Kye Miller</title>
                <link rel="manifest" href="/site.webmanifest" />
            </Head>

            <Nav
                links={[
                    {
                        name: 'About',
                        href: '/#who-am-i',
                    },
                    {
                        name: 'Projects',
                        href: '/#projects',
                    },
                ]}
            />
            {/*<div id="grain" />*/}
            <div
                id="texture-overlay"
                className={`contrast-50 ${
                    theme.theme === 'dark'
                        ? 'mix-blend-screen contrast-125 invert'
                        : 'mix-blend-multiply contrast-125'
                }`}
            />
            <ThemeSwitcher />
            <motion.main className={`w-full px-4`}>
                {props.children}
            </motion.main>
        </>
    );
};

export default Layout;
