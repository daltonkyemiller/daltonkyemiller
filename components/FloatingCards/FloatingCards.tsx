import { motion, useMotionValue, useSpring } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { projects } from '../../utils/mock/data';
import { Project } from '../../utils/types';
import { useMousePosition } from '@hooks';
import useMeasure from 'react-use-measure';
import _ from 'lodash';
import { randomBetween, range } from '../../utils/helpers';
import { mergeRefs } from 'react-merge-refs';
import Link from 'next/link';

type FloatingCardProps = {
    idx: number;
    relMousePos: { x: number; y: number };
    project: Project;
};
const FloatingCard = ({ idx, relMousePos, project }: FloatingCardProps) => {
    const letter = ['a', 'b', 'c', 'd', 'e'][idx];
    const cardRef = useRef<HTMLDivElement | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const [random, setRandom] = useState({
        x: randomBetween(-1, 1),
        y: randomBetween(-1, 1),
    });

    const x = useSpring(0, { stiffness: 300, damping: 10, bounce: 0.5 });
    const y = useSpring(0, { stiffness: 300, damping: 10, bounce: 0.5 });

    useEffect(() => {
        const curr = cardRef.current!;
        const offParent = curr.offsetParent as HTMLElement;

        const xMove = relMousePos.x * 50 * random.x;
        const yMove = relMousePos.y * 50 * random.y;

        const xMin = curr.offsetLeft;
        const xMax = offParent.offsetWidth - xMin - curr.offsetWidth;

        const yMin = curr.offsetTop;
        const yMax = offParent.offsetHeight - yMin - curr.offsetHeight;
        x.set(_.clamp(xMove, -xMin, xMax));
        y.set(_.clamp(yMove, -yMin, yMax));
    }, [random.x, random.y, relMousePos.x, relMousePos.y, x, y]);

    const variants = {
        open: {
            scaleY: 1,
            opacity: 1,
        },
        close: {
            scaleY: 0,
            opacity: 0,
        },
    };

    return (
        <Link href={`project/${project.path}`}>
            <motion.div
                className={`relative cursor-pointer`}
                layoutId={project.path}
                ref={cardRef}
                style={{ gridArea: letter, x, y }}
            >
                <div
                    className={`${
                        isOpen ? 'bg-neutral-300' : 'bg-transparent'
                    } transition-color rounded-lg p-3`}
                >
                    <h1
                        className={`inline-block animate-pulse text-3xl font-bold`}
                        style={{ animationDelay: `${idx * 0.25}s` }}
                        onMouseOver={() => setIsOpen(true)}
                        onMouseLeave={() => setIsOpen(false)}
                    >
                        {project.name}
                    </h1>
                    <motion.p
                        variants={variants}
                        animate={isOpen ? 'open' : 'close'}
                    >
                        {project.description}
                    </motion.p>
                </div>
            </motion.div>
        </Link>
    );
};

type FloatingCardsProps = {};

const FloatingCards = ({}: FloatingCardsProps) => {
    const [ref, bounds] = useMeasure();
    const [relPos, setRelPos] = useState({ x: 0, y: 0 });
    const cursorRef = useRef<HTMLDivElement | null>(null);

    return (
        <>
            <div
                onMouseMove={(e) => {
                    const bounding = e.currentTarget.getBoundingClientRect();
                    const relX = e.clientX - bounding.left;
                    const relY = e.clientY - bounding.top;
                    setRelPos({
                        x: range(relX / bounding.width, 0, 1, -1, 1),
                        y: range(relY / bounding.height, 0, 1, -1, 1),
                    });
                }}
                ref={ref}
                className={`relative grid h-[500px] w-full place-items-center overflow-hidden  mix-blend-multiply`}
                style={{
                    gridTemplateAreas: `
        "a . b"
        ". c ."
        "d . e"
        `,
                }}
            >
                {projects.map((project, i) => (
                    <FloatingCard
                        project={project}
                        relMousePos={relPos}
                        key={project.path}
                        idx={i}
                    />
                ))}
            </div>
        </>
    );
};

export default FloatingCards;
