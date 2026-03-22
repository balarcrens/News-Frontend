import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const VALID_LANGS = [
    'en', 'hi', 'bn', 'te', 'mr', 'ta', 'gu', 'kn', 'ml', 'pa', 'ur', 
    'es', 'fr', 'de', 'ar', 'zh-CN', 'ja', 'ru', 'pt', 'it', 'tr', 'vi', 'th', 'id', 'ko'
];

const LanguageSyncManager = () => {
    const location = useLocation();
    
    useEffect(() => {
        const pathParts = location.pathname.split('/');
        const urlLang = pathParts[1];

        if (VALID_LANGS.includes(urlLang)) {
            syncGoogleTranslate(urlLang);
        } else {
            syncGoogleTranslate('en');
        }
    }, [location.pathname]);

    const syncGoogleTranslate = (langCode) => {
        const attemptSync = () => {
            const select = document.querySelector(".goog-te-combo");
            if (select) {
                const targetValue = langCode === 'en' ? '' : langCode;
                // 'en' is the default page language, Google Translate uses '' (empty) to revert to English
                if (select.value !== targetValue && select.value !== langCode) {
                    select.value = targetValue;
                    if(targetValue === '') select.value = 'en'; // Try 'en', but trigger change
                    select.dispatchEvent(new Event("change"));
                }
                return true;
            }
            return false;
        };

        if (!attemptSync()) {
            const interval = setInterval(() => {
                if (attemptSync()) {
                    clearInterval(interval);
                }
            }, 500);
            setTimeout(() => clearInterval(interval), 5000);
        }
    };

    return null;
};

export default LanguageSyncManager;
