import '../styles/globals.css';
import Script from 'next/script'

export default function App({ Component, pageProps }) {
    return (
        <>
            <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-J2LBZ906Q9"/>
            <Script
                id='google-analytics'
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-J2LBZ906Q9', {
                    page_path: window.location.pathname,
                    });
                    `,
                }}
            />
            <Component {...pageProps} />;
        </>
    )
}