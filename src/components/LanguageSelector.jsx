import { useState, useEffect } from 'react';
import { Globe, Search, Check } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const LANGUAGES = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'th', name: 'ไทย', flag: '🇹🇭' },
    { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' }
];

const LanguageSelector = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentLang, setCurrentLang] = useState('en');
    const [searchQuery, setSearchQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.lang-dropdown')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        const interval = setInterval(() => {
            const select = document.querySelector(".goog-te-combo");
            if (select) {
                setCurrentLang(select.value || 'en');
                clearInterval(interval);
            }
        }, 500);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const changeLanguage = (langCode) => {
        setIsOpen(false);
        setCurrentLang(langCode);

        const VALID_LANGS = [
            'en', 'hi', 'bn', 'te', 'mr', 'ta', 'gu', 'kn', 'ml', 'pa', 'ur',
            'es', 'fr', 'de', 'ar', 'zh-CN', 'ja', 'ru', 'pt', 'it', 'tr', 'vi', 'th', 'id', 'ko'
        ];

        const pathParts = location.pathname.split('/');
        const currentUrlLang = pathParts[1];

        let newPath;
        if (VALID_LANGS.includes(currentUrlLang)) {
            if (langCode === 'en') {
                newPath = '/' + pathParts.slice(2).join('/');
            } else {
                pathParts[1] = langCode;
                newPath = pathParts.join('/');
            }
        } else {
            if (langCode === 'en') {
                newPath = location.pathname;
            } else {
                newPath = `/${langCode}${location.pathname}`;
            }
        }

        if (newPath === '') newPath = '/';
        navigate(newPath + location.search);
    };

    const filteredLanguages = LANGUAGES.filter(lang =>
        lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lang.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const activeLang = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

    return (
        <div className="lang-dropdown skiptranslate relative">
            <button
                className="lang-btn glass shadow-sm"
                onClick={() => setIsOpen(!isOpen)}
                style={{ position: 'relative', zIndex: 10, color: 'black', backgroundColor: 'white', padding: '4px 5px' }}
            >
                <Globe size={18} />
                <span style={{ marginLeft: '4px' }}>{activeLang.name}</span>
            </button>

            {isOpen && (
                <div
                    className="lang-dropdown-content absolute right-0 mt-sm bg-white rounded-lg shadow-xl border overflow-hidden"
                    style={{ width: '240px', zIndex: 100, top: '100%' }}
                >
                    <div style={{ padding: '12px', borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-secondary)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'white', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                            <Search size={14} color="var(--color-text-muted)" />
                            <input
                                type="text"
                                placeholder="Search language..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ width: '100%', outline: 'none', border: 'none', fontSize: '13px', backgroundColor: 'transparent' }}
                            />
                        </div>
                    </div>

                    <div className="no-scrollbar" style={{ maxHeight: '300px', overflowY: 'auto', padding: '8px' }}>
                        {filteredLanguages.length === 0 ? (
                            <div className="text-center text-muted p-md text-sm">
                                No languages found
                            </div>
                        ) : (
                            filteredLanguages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => changeLanguage(lang.code)}
                                    className="dropdown-item items-center w-full"
                                    style={{
                                        display: 'flex',
                                        backgroundColor: currentLang === lang.code ? 'var(--color-hover-bg)' : 'transparent',
                                        fontWeight: currentLang === lang.code ? '600' : '500',
                                        textAlign: 'left',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <span style={{ fontSize: '1.25rem', marginRight: '12px' }}>
                                        {lang.flag}
                                    </span>
                                    <span style={{ flexGrow: 1 }}>{lang.name}</span>
                                    {currentLang === lang.code && (
                                        <Check size={16} color="var(--color-accent)" />
                                    )}
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;