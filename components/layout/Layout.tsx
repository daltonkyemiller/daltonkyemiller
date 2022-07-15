import React, { ReactNode } from 'react';
import { Nav } from '@components';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import Head from 'next/head';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import { ThemeProvider } from '../../utils/theme/themeContext';

type Props = {
    children: any;
};

const Layout: React.FC<Props> = (props: Props) => {
    return (
        <>
            <Head>
                <title>Dalton Kye Miller</title>
                <link rel="manifest" href="/site.webmanifest" />
            </Head>
            {/*<Nav*/}
            {/*    links={[*/}
            {/*        {*/}
            {/*            name: 'Home',*/}
            {/*            href: '/',*/}
            {/*        },*/}
            {/*        {*/}
            {/*            name: 'About',*/}
            {/*            href: '/#who-am-i',*/}
            {/*        },*/}
            {/*        {*/}
            {/*            name: 'Projects',*/}
            {/*            href: '/#projects',*/}
            {/*        },*/}
            {/*    ]}*/}
            {/*/>*/}
            <ThemeProvider>
                <div id="grain" />
                <ThemeSwitcher />
                <AnimatePresence
                    exitBeforeEnter
                    initial={false}
                    onExitComplete={() => window.scrollTo(0, 0)}
                >
                    <motion.main
                        className={`relative basis-full p-2 md:basis-5/6`}
                    >
                        {props.children}
                    </motion.main>
                </AnimatePresence>
            </ThemeProvider>
        </>
    );
};

export default Layout;
