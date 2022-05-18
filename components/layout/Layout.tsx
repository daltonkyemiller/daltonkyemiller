import React, { ReactNode } from 'react';
import Nav from '../nav/';

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
            <main className={`prose`}>
                {props.children}
            </main>
        </>
    );
};

export default Layout;