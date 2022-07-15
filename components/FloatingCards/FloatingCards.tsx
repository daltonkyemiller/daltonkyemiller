import { motion, useMotionValue } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { randomBetween, range } from '../../utils/helpers';
import { useMousePosition, useWindowDimensions } from '@hooks';
import useMeasure from 'react-use-measure';

type FloatingCardsProps = {};

const FloatingCards = ({}: FloatingCardsProps) => {
    const mousePos = useMousePosition();
    const windowDimensions = useWindowDimensions();
    return (
        <div
            className={`grid aspect-square grid-cols-3 gap-10`}
            style={{
                gridTemplateAreas: `
                "a . b"
                "c d e"
             
             `,
            }}
        >
            {[1, 2, 3, 4, 6].map((_, i) => (
                <FloatingCard
                    key={i}
                    idx={i}
                    mousePos={mousePos}
                    windowDimensions={windowDimensions}
                />
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
}: FloatingCardProps) => {
    const [cardRef, { top, left }] = useMeasure();
    const off = 10;
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
            range(mousePos.x - left, 0, windowDimensions.width, 0, 10) *
                randomOffset.x
        );
        y.set(
            range(mousePos.y - top, 0, windowDimensions.height, 0, 10) *
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
            // className={`animate-bounce`}
            style={{
                animationDelay: `${idx * 0.1}s`,
                gridArea: `${letters[idx]}`,
            }}
        >
            <motion.div
                ref={cardRef}
                className={`flex h-[100px] w-[150px] items-center justify-center bg-amber-500`}
                style={{ x, y }}
            >
                <h1>Test</h1>
            </motion.div>
        </div>
    );
};

export default FloatingCards;
