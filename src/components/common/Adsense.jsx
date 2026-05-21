import { useEffect } from 'react';

const Adsense = () => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <ins
            className="adsbygoogle"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            data-ad-client="ca-pub-2183588307448884"
            data-ad-slot="3745545172"
            data-ad-format="auto"
            data-full-width-responsive="true"
        />
    );
};

export default Adsense;