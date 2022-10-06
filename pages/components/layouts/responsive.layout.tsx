import { useMediaQuery } from 'react-responsive';

import DesktopLayout from './desktop.layout';
import MobileLayout from './mobile.layout';

export default function ResponsiveLayout ({ children } : {children: JSX.Element}) : JSX.Element {
    const Desktop = (): any => {
        const isDesktop = useMediaQuery({ minWidth: 768 });
        return isDesktop && <DesktopLayout>{children}</DesktopLayout>;
    };

    const Mobile = () : any => {
        const isMobile = useMediaQuery({ maxWidth: 767 });
        return isMobile && <MobileLayout>{children}</MobileLayout>;
    };

    return (
        <>
            <Desktop />
            <Mobile />
        </>
    );
};