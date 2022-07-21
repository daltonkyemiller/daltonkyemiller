import { useEffect, useMemo, useState } from 'react';
import Bowser from 'bowser';
import ParsedResult = Bowser.Parser.ParsedResult;

const useDetectBrowser = () => {
    const [browser, setBrowser] = useState<ParsedResult | null>(null);
    useEffect(() => {
        setBrowser(Bowser.parse(navigator.userAgent));
    }, []);

    return {
        ...browser,
        isChrome: browser?.browser.name === 'Chrome',
        isFirefox: browser?.browser.name === 'Firefox',
        isSafari: browser?.browser.name === 'Safari',
        isOpera: browser?.browser.name === 'Opera',
        isIE: browser?.browser.name === 'IE',
    };
};

export default useDetectBrowser;
