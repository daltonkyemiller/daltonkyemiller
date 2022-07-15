import { motion, useMotionValue } from 'framer-motion';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { randomBetween, range } from '../../utils/helpers';
import { useMousePosition, useWindowDimensions } from '@hooks';
import useMeasure from 'react-use-measure';
import ImageLoader from '../ImageLoader/ImageLoader';
import { projects } from '../../utils/mock/data';
import Link from 'next/link';

type FloatingCardsProps = {};

const FloatingCards = ({}: FloatingCardsProps) => {
    const mousePos = useMousePosition();
    const windowDimensions = useWindowDimensions();
    return (
        <div
            className={`grid aspect-square max-h-[90vmin] grid-cols-3 gap-10`}
            style={{
                gridTemplateAreas: `
                "a . b"
                ". c ."
                "d . e"
             `,
            }}
        >
            {projects.map((_, i) => (
                <FloatingCard
                    key={i}
                    idx={i}
                    mousePos={mousePos}
                    windowDimensions={windowDimensions}
                >
                    <h1>{_.name}</h1>
                </FloatingCard>
            ))}
        </div>
    );
};

type FloatingCardProps = {
    idx: number;
    mousePos: { x: number; y: number };
    windowDimensions: { width: number; height: number };
};

const FloatingCard = ({
    idx,
    mousePos,
    windowDimensions,
    children,
}: PropsWithChildren<FloatingCardProps>) => {
    const [cardRef, { top, left }] = useMeasure();
    const off = 25;
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const [randomOffset, setRandomOffset] = useState({
        x: randomBetween(-off, off),
        y: randomBetween(-off, off),
    });
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    useEffect(() => {
        console.log(mousePos.x - left);
        // console.log(mousePos.x - left);
        x.set(
            range(mousePos.x - left, 0, windowDimensions.width, 0, off) *
                randomOffset.x
        );
        y.set(
            range(mousePos.y - top, 0, windowDimensions.height, 0, off) *
                randomOffset.y
        );
    }, [
        left,
        mousePos.x,
        mousePos.y,
        randomOffset.x,
        randomOffset.y,
        top,
        windowDimensions.height,
        windowDimensions.width,
        x,
        y,
    ]);

    return (
        <div
            className={`animate-pulse`}
            style={{
                animationDelay: `${idx * 0.5}s`,
                gridArea: `${letters[idx]}`,
            }}
        >
            <Link href={`/project/${idx}`}>
                <motion.div
                    layoutId={idx.toString()}
                    ref={cardRef}
                    className={`flex cursor-pointer flex-col rounded-xl p-5`}
                    style={{ x, y }}
                >
                    {children}
                </motion.div>
            </Link>
        </div>
    );
};

export default FloatingCards;
