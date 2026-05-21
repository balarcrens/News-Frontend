import { useEffect, useRef } from 'react';

const Adsense = () => {
    const adRef = useRef(null);

    useEffect(() => {
        try {
            if (
                adRef.current &&
                !adRef.current.getAttribute('data-adsbygoogle-status')
            ) {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-2183588307448884"
            data-ad-slot="3745545172"
            data-ad-format="auto"
            data-full-width-responsive="true"
        />
    );
};

export default Adsense;