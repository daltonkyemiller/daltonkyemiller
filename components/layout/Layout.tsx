import React, { ReactNode } from 'react';
import { Head } from 'next/document';
import Nav from '../nav/';

type Props = {
    children: any;
};

const Layout: React.FC<Props> = (props: Props) => {

    return (
        <>
            <Nav/>
            <main>
                {props.children}
            </main>
        </>
    );
};

export default Layout;