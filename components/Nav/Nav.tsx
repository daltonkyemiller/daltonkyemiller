import { motion } from 'framer-motion';
import React, {
    HTMLAttributes,
    MouseEventHandler,
    PropsWithChildren,
    useEffect,
    useRef,
    useState,
} from 'react';
import { useWindowDimensions } from '@hooks';
import { screens } from '@theme';
import Link from 'next/link';

type Link = { name: string; href: string };
type NavProps = {
    links: Array<Link>;
};

const Nav: React.FC<NavProps> = ({ links }: NavProps) => {
    const { width: screenWidth } = useWindowDimensions();
    const [showNav, setShowNav] = useState<boolean>(false);

    useEffect(() => {
        // @ts-ignore
        document.querySelector('main').style.display =
            showNav && screenWidth < screens['md'] ? 'none' : '';
    }, [screenWidth, showNav]);

    const content = {
        show: {
            display: 'flex',
            opacity: 1,
            transition: {
                duration: 0.25,
                staggerChildren: 0.25,
            },
        },
        hide: {
            opacity: 0,
            transition: {
                duration: 0.25,
                staggerChildren: 0.25,
            },
        },
    };
    const items = {
        hide: {
            x: -25,
            opacity: 0,
            transition: { duration: 0.25 },
        },
        show: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.25 },
        },
    };

    return (
        <nav className={`z-20 flex w-full px-5 py-1 `}>
            <ul
                className={`flex h-full w-full items-center border-b-4 border-neutral-900 dark:border-neutral-100`}
            >
                <NavLink
                    link={{ name: 'DKM', href: '/' }}
                    className={`font-brand text-5xl font-bold`}
                />
                {links.map((link, idx) => (
                    <NavLink link={link} key={idx} />
                ))}
            </ul>
        </nav>
    );
};

type NavLinkProps = HTMLAttributes<HTMLLIElement> & {
    link: Link;
};

const NavLink = ({
    link,
    className,
    children,
}: PropsWithChildren<NavLinkProps>) => {
    return (
        <li
            className={`flex h-full w-full flex-grow cursor-pointer items-center border-[2px] 
            border-neutral-900 p-2 transition-colors dark:border-neutral-100 ${className}`}
        >
            <Link href={link.href}>
                <a className={`flex h-full w-full items-center`}>{link.name}</a>
            </Link>
        </li>
    );
};
export default Nav;
