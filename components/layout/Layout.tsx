import React, { ReactNode } from 'react';
import { Nav } from '@components';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';

type Props = {
    children: any;
};

const Layout: React.FC<Props> = (props: Props) => {
    return (
        <>
            <Nav links={[
                {
                    name: 'Home',
                    href: '/'
                },
                {
                    name: 'About',
                    href: '/about'
                }, {
                    name: 'Resume',
                    href: '/resume'
                }]}
            />
            <AnimatePresence
                exitBeforeEnter
                initial={false}
                onExitComplete={() => window.scrollTo(0, 0)}
            >
                <motion.main className={`relative basis-full md:basis-5/6 p-2`}>
                    {props.children}
                </motion.main>
            </AnimatePresence>
        </>
    );
};

export default Layout;