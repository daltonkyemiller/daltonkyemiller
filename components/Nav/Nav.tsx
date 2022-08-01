import { motion } from 'framer-motion';
import React, {
    HTMLAttributes,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from 'react';
import Link from 'next/link';
import useMeasure from 'react-use-measure';
import { LayoutContext } from '../../utils/context/layoutContext';

type Link = { name: string; href: string };
type NavProps = {
    links: Array<Link>;
};

const containerVariants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 1,
            staggerChildren: 0.25,
        },
    },
};

const itemVariants = {
    initial: {
        y: -100,
    },
    animate: {
        y: 0,
        transition: {
            ease: 'easeInOut',
        },
    },
};

const Nav: React.FC<NavProps> = ({ links }: NavProps) => {
    const [navAnimated, setNavAnimated] = useState(false);
    const [navRef, { height: navHeight }] = useMeasure();
    const layout = useContext(LayoutContext);
    useEffect(() => {
        layout.setNavHeight?.(navHeight);
    }, [layout, navHeight]);
    return (
        <nav ref={navRef} className={`z-20 flex w-full px-5 py-3`}>
            <motion.ul
                className={`relative flex min-h-max w-full items-center border-neutral-900 after:absolute after:top-full after:transition-all 
                ${
                    navAnimated ? 'after:scale-y-100' : 'after:scale-y-0'
                } after:h-2 after:w-full after:origin-top
                 after:bg-neutral-900 after:content-[""] dark:border-neutral-100
                 dark:after:bg-neutral-100`}
                variants={containerVariants}
                initial="initial"
                animate="animate"
                onAnimationComplete={() => setNavAnimated(true)}
            >
                <NavLink
                    link={{ name: 'DKM', href: '/' }}
                    className={`font-brand text-3xl font-bold  md:text-5xl`}
                />
                {links.map((link, idx) => (
                    <NavLink link={link} key={idx} />
                ))}
            </motion.ul>
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
        <motion.li
            className={`relative isolate flex h-full w-full flex-grow cursor-pointer select-none items-center overflow-hidden border-[2px] 
            border-neutral-900 bg-neutral-100 p-2 transition-colors transition-all dark:border-neutral-100 dark:bg-neutral-900 ${className} `}
            variants={itemVariants}
        >
            <Link href={link.href}>
                <a className={`z-2 relative flex h-full w-full items-center`}>
                    {link.name}
                </a>
            </Link>
        </motion.li>
    );
};
export default Nav;
