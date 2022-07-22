import React, { createContext, useState } from 'react';

type LayoutContextType = {
    navHeight: number;
    setNavHeight?: (height: number) => void;
};

export const LayoutContext = createContext<LayoutContextType>({
    navHeight: 0,
});

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
    const [navHeight, setNavHeight] = useState<number>(0);
    return (
        <LayoutContext.Provider value={{ navHeight, setNavHeight }}>
            {children}
        </LayoutContext.Provider>
    );
};
