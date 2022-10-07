import type { AppProps } from 'next/app'
import ResponsiveLayout from "./components/layouts/responsive.layout";
import {useEffect, useState} from "react";
import AOS from 'aos';

import '../public/static/css/reset.css'
import 'aos/dist/aos.css'
import '../public/static/css/font.css'
import '../public/static/css/style.css'
import '../public/static/css/swiper.css'
import '../public/static/css/public.css'
import '../public/static/css/custom.css'
import '../public/static/css/customselectbox.css'

function MyApp({ Component, pageProps }: AppProps) {
    const [showChild, setShowChild] = useState(false);
    useEffect(() => {
        AOS.init();
        setShowChild(true);
    }, []);

    if (!showChild) {
        return null;
    }

    if (typeof window === 'undefined') {
        return <></>;
    } else {
        return (
            <ResponsiveLayout>
                <Component {...pageProps} />
            </ResponsiveLayout>
        );
    }
}

export default MyApp
