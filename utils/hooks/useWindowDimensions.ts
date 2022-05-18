import { useEffect, useState } from 'react';
import { breakpoints, screens } from '@theme';

type Dimensions = {
    width: number | undefined;
    height: number | undefined;
    currBreakpoint?: breakpoints
};

const useWindowDimensions = (): Dimensions => {
    const [windowDimensions, setWindowDimensions] = useState<Dimensions>({
        width: undefined,
        height: undefined,
        currBreakpoint: undefined
    });
    useEffect(() => {
        // Function that updates state to current window dimensions
        const handleResize = (): void => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const currBreakpoint =
                width > screens['2xl']
                    ? '2xl' as breakpoints
                    : Object.keys(screens).reduce((acc, curr) => {
                        // @ts-ignore
                        if (window.innerWidth > screens[acc] && window.innerWidth < screens[curr]) return curr;
                        return acc;
                    }) as breakpoints;

            setWindowDimensions({
                width: width,
                height: height,
                currBreakpoint: currBreakpoint
            });
        };
        // Called once immediately on mount to get initial window size
        handleResize();
        // Adding a listener to the resize event
        window.addEventListener('resize', handleResize);

        return (): void => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
};

export default useWindowDimensions;
