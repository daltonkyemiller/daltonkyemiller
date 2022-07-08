import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSize } from '@hooks';

type VisGridProps = {
    width: string;
    height: string;
    rows?: number;
    cols?: number;
    thickness?: string;
};


const VisGrid: React.FC<VisGridProps> = (
    {
        height,
        width,
        rows,
        cols,
        thickness = '2px'
    }) => {
    const grid = useRef(null);
    const gridSize = useSize(grid);
    const [_rows, setRows] = useState(10);
    const [_cols, setCols] = useState(10);
    useEffect(() => {
        if (gridSize !== undefined) {
            const aspectRatio = gridSize.width / gridSize.height;
            if (rows === undefined && cols !== undefined) {
                setRows(Math.floor(cols * aspectRatio));
            }
        }
    }, [cols, gridSize, rows]);

    return (
        <div className={`absolute grid`}
             ref={grid}
             style={{
                 width,
                 height,
                 gridTemplateColumns: `repeat(${_cols}, 1fr)`,
                 gridTemplateRows: `repeat(${_rows}, 1fr)`
             }}
        >
            {
                [...Array(25)].map((_, idx) => (
                    <div key={`line-${idx}`}
                         className={``}
                         style={{
                             borderWidth: thickness,
                             // backgroundImage: `linear-gradient(-45deg, transparent, #BBB)`,
                         }}

                    />
                ))
            }
            {/*<div className={`absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-400 mix-blend-overlay`}/>*/}
        </div>
    );
};

export default VisGrid;