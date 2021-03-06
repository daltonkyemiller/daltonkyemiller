import React, { useContext } from 'react';
import { Nav } from '@components';
import { motion } from 'framer-motion';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import { ThemeContext } from '../../utils/theme/themeContext';

type Props = {
    children: any;
};

const Layout: React.FC<Props> = (props: Props) => {
    const theme = useContext(ThemeContext);

    return (
        <>
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
            {/*<div*/}
            {/*    id="texture-overlay"*/}
            {/*    className={`mix-blend-multiply*/}
            {/*     dark:mix-blend-screen dark:invert`}*/}
            {/*/>*/}
            <ThemeSwitcher />
            <motion.main className={`w-full px-4`}>
                {props.children}
            </motion.main>
        </>
    );
};

export default Layout;
