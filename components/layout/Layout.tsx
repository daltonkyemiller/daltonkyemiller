import React, { ReactNode } from 'react';
import { Nav } from '@components';

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
            <main className={`relative basis-full md:basis-5/6 p-2`}>
                {props.children}
            </main>
        </>
    );
};

export default Layout;