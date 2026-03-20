import { useState, useEffect } from 'react';
import { Globe, Search, Check } from 'lucide-react';

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

        const select = document.querySelector(".goog-te-combo");

        if (select) {
            select.value = langCode;
            select.dispatchEvent(new Event("change"));
        } else {
            alert("Google Translate not loaded yet. Please try again.");
        }
    };

    const filteredLanguages = LANGUAGES.filter(lang =>
        lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lang.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const activeLang = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

    return (
        <div className="lang-dropdown skiptranslate">
            <button
                className="lang-btn"
                onClick={() => setIsOpen(!isOpen)}
                style={{ color: "black", backgroundColor: "white", padding: "5px" }}
            >
                <Globe size={18} />
                <span style={{ marginLeft: '4px' }}>{activeLang.name}</span>
            </button>

            {isOpen && (
                <div className="lang-dropdown-content">
                    <div style={{ padding: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Search size={14} />
                            <input
                                type="text"
                                placeholder="Find language..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ width: '100%', outline: 'none', border: 'none' }}
                            />
                        </div>
                    </div>

                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        {filteredLanguages.map((lang) => (
                            <div
                                key={lang.code}
                                onClick={() => changeLanguage(lang.code)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '8px',
                                    cursor: 'pointer',
                                    background: currentLang === lang.code ? '#333' : 'white',
                                    color: currentLang === lang.code ? 'white' : 'black'
                                }}
                            >
                                <span style={{ fontSize: '1.2rem', marginRight: '8px' }}>
                                    {lang.flag}
                                </span>
                                <span>{lang.name}</span>
                                {currentLang === lang.code && (
                                    <Check size={16} style={{ marginLeft: 'auto' }} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;