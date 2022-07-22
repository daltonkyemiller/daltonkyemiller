import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout/Layout';
import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from '../utils/theme/themeContext';
import Head from 'next/head';
import { LayoutProvider } from '../utils/context/layoutContext';

function MyApp({ Component, pageProps }: AppProps) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);
    return (
        <LayoutProvider>
            <ThemeProvider>
                <Head>
                    <title>Dalton Kye Miller</title>
                    <link rel="manifest" href="/site.webmanifest" />
                </Head>
                <AnimatePresence onExitComplete={() => scrollTo(0, 0)}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </AnimatePresence>
            </ThemeProvider>
        </LayoutProvider>
    );
}

export default MyApp;
