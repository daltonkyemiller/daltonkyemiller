import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { projects } from '../../utils/mock/data';
import { Project } from '../../utils/types';
import { useMousePosition } from '@hooks';
import useMeasure from 'react-use-measure';
import _ from 'lodash';
import {
    randomIntBetween,
    randomFromArray,
    range,
    randomBetween,
} from '../../utils/helpers';
import { mergeRefs } from 'react-merge-refs';
import Link from 'next/link';
import ImageLoader from '../ImageLoader/ImageLoader';

type FloatingCardProps = {
    idx: number;
    relMousePos: { x: number; y: number };
    project: Project;
};
const FloatingCard = ({ idx, relMousePos, project }: FloatingCardProps) => {
    const letter = ['a', 'b', 'c', 'd', 'e'][idx];
    const cardRef = useRef<HTMLDivElement | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [bgColor, setBgColor] = useState(
        [
            'bg-orange-300',
            'bg-blue-300',
            'bg-green-300',
            'bg-purple-300',
            'bg-red-300',
        ][idx % 5]
    );

    const [pos, setPos] = useState({ x: 0, y: 0 });

    const [random, setRandom] = useState({
        x: randomBetween(-2, 2),
        y: randomBetween(-2, 2),
    });

    const x = useSpring(0, { stiffness: 300, damping: 10, bounce: 0.5 });
    const y = useSpring(0, { stiffness: 300, damping: 10, bounce: 0.5 });

    useEffect(() => {
        const curr = cardRef.current!;
        const offParent = curr.offsetParent as HTMLElement;

        const xMove = relMousePos.x * 200 * random.x;
        const yMove = relMousePos.y * 200 * random.y;

        const xMin = curr.offsetLeft;
        const xMax = offParent.offsetWidth - xMin - curr.offsetWidth;

        const yMin = curr.offsetTop;
        const yMax = offParent.offsetHeight - yMin - curr.offsetHeight;
        const newX = _.clamp(xMove, -xMin, xMax);
        const newY = _.clamp(yMove, -yMin, yMax);

        x.set(newX);
        y.set(newY);
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
        <motion.div
            className={`relative min-h-full cursor-pointer`}
            layoutId={project.path}
            ref={cardRef}
            style={{ gridArea: letter, x, y }}
        >
            <Link href={`project/${project.path}`}>
                <motion.div
                    className={`rounded-xl p-4 transition-colors`}
                    onMouseOver={() => setIsOpen(true)}
                    onMouseOut={() => setIsOpen(false)}
                >
                    <h1
                        className={`inline-block animate-bounce text-3xl font-bold`}
                        style={{ animationDelay: `${idx * 0.25}s` }}
                    >
                        {project.name}
                    </h1>
                </motion.div>
            </Link>
        </motion.div>
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
                className={`relative grid min-h-[500px] w-full place-items-center`}
                style={{
                    gridTemplateAreas: `
        "a . b"
        ". . ."
        "c . d"
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
