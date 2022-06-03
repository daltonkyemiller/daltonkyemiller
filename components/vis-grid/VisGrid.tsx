import React, { useRef } from 'react';
import { useMousePosition } from '@hooks';

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
        rows = 12,
        cols = 12,
        thickness = '2px'
    }) => {
    return (
        <div className={`absolute grid`}
             style={{
                 width,
                 height,
                 gridTemplateColumns: `repeat(${cols}, 1fr)`,
                 gridTemplateRows: `repeat(${rows}, 1fr)`,
             }}
        >
            {
                [...Array(rows * cols)].map((_, idx) => (
                    <div key={`line-${idx}`}
                         className={``}
                         style={{
                             borderWidth: thickness,
                             backgroundImage: `linear-gradient(-45deg, transparent, #BBB)`,
                         }}

                    />
                ))
            }
            <div className={`absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-400 mix-blend-overlay`}/>
        </div>
    );
};

export default VisGrid;