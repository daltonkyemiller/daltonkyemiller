import { MutableRefObject, RefObject, useEffect, useLayoutEffect, useState } from 'react';
import useResizeObserver from '@react-hook/resize-observer';

const useSize = (target: RefObject<HTMLElement> | null) => {
    const [size, setSize] = useState<DOMRectReadOnly>();
    useEffect(() => {
        target?.current && setSize(target.current.getBoundingClientRect());
    }, [target]);

    useResizeObserver(target, (entry) => setSize(entry.contentRect));
    return size;
};

export default useSize;