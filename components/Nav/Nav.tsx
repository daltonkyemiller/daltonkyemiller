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
    return (
        <motion.nav
            className={`z-20 flex w-full px-5 py-3 `}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
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
        </motion.nav>
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
    const [isActive, setIsActive] = useState(false);
    const [relMousePos, setRelMousePos] = useState({ x: 0, y: 0 });
    return (
        <li
            className={`relative isolate flex h-full w-full flex-grow cursor-pointer select-none items-center overflow-hidden border-[2px] 
            border-neutral-900 bg-neutral-100 p-2 transition-colors transition-all dark:border-neutral-100 dark:bg-neutral-900 ${className} `}
        >
            <Link href={link.href}>
                <a className={`z-2 relative flex h-full w-full items-center`}>
                    {link.name}
                </a>
            </Link>
        </li>
    );
};
export default Nav;
