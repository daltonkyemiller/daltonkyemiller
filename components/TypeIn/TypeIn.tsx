import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';

type TypeInProps = {
    text: string;
    duration?: number;
    delay?: number;
    animIn?: object;
    animOut?: object;
    easing?: string | number[];
    cursor?: boolean;
    onComplete?: () => void;
};

const TypeIn = ({
    text,
    delay,
    animIn,
    animOut,
    duration,
    easing,
    cursor,
    onComplete,
}: TypeInProps) => {
    const [isComplete, setIsComplete] = useState(false);

    const variants = {
        in: animIn ?? {
            opacity: 1,
        },
        out: animOut ?? {
            opacity: 0,
        },
    };
    return (
        <>
            {text.split('').map((char, index) => (
                <motion.span
                    className={`inline-block`}
                    key={index}
                    variants={variants}
                    initial="out"
                    animate="in"
                    exit="out"
                    transition={{
                        duration: duration ?? 0.1,
                        delay: index * (delay ?? 0.1),
                        ease: easing ?? null,
                    }}
                    {...(index === text.length - 1 && {
                        onAnimationComplete: () => {
                            setIsComplete(true);
                            onComplete && onComplete();
                        },
                    })}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
            {isComplete && cursor && (
                <motion.span
                    className={`absolute top-1/2 h-3/4 w-[.1rem] -translate-y-1/2  bg-neutral-100`}
                    animate={{
                        opacity: [0, 1, 0],
                    }}
                    transition={{ repeat: Infinity }}
                />
            )}
        </>
    );
};

export default TypeIn;
