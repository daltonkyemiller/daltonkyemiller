import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { Nav } from '@components';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import Head from 'next/head';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import { ThemeContext, ThemeProvider } from '../../utils/theme/themeContext';
import overlay from '../../public/img/overlay/vintage-paper-8.jpg';
import Loader from '../Loader/Loader';

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
            <ThemeSwitcher />
            <motion.main className={`w-full`}>{props.children}</motion.main>
        </>
    );
};

export default Layout;
