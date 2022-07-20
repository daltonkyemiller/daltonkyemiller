import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout/Layout';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from '../utils/theme/themeContext';

function MyApp({ Component, pageProps }: AppProps) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);
    return (
        <ThemeProvider>
            <AnimatePresence>
                {isLoading ? (
                    <motion.div key="loader">
                        <Loader />
                    </motion.div>
                ) : (
                    <Layout>
                        <Component {...pageProps} />i
                    </Layout>
                )}
            </AnimatePresence>
        </ThemeProvider>
    );
}

export default MyApp;
