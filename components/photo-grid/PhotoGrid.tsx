import React from 'react';
import Image from 'next/image';

type PhotoGridProps = {
    photos: Array<string>
};

const PhotoGrid: React.FC<PhotoGridProps> = ({photos}: PhotoGridProps) => {

    return (
        <div className={`grid grid-cols-3 w-full h-full gap-2`}>
            {
                photos.map((photo) => (
                    <div key={photo} className={`relative w-100 h-[300px] `}>
                        <Image alt={photo} src={photo} layout={'fill'} objectFit={'cover'}/>
                    </div>
                ))
            }
        </div>
    );
};

export default PhotoGrid;