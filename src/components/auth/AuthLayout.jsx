import React from 'react';
import nexoraNewsAuthHero from '/assets/nexoranews_auth_hero.png'

const AuthLayout = ({ children }) => {
    return (
        <div className="flex flex-col lg:flex-row bg-white">
            <div className="hidden lg:flex lg:w-1/2 relative bg-gray-50 items-center justify-center p-20 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-10"
                    style={{
                        backgroundImage: `url(${nexoraNewsAuthHero ? nexoraNewsAuthHero : 'https://lh3.googleusercontent.com/aida-public/AB6AXuC43Er1MqfJb0IkHSaJPxu9R8NlCLwr7I54v98fV3nFYgEH2dJQzhWjNNZa6zlztrFCyYm_y8XUHMDyZHWKmdELCiO8J9WtQVFNn1Kky6YCsQExgWuWN2zqsqfsdJU7fIZMSx0sbU1FhbU6CP4aP1FMBrtsXTfyTNjl_HnmqlLQViWDGUQRkRxB0b4FUEr6UhKiFOM7TZDrGBJwe6ZEdn8On10RloimxQOLuZu0d1Pz5ORJXbtQgSRWygv5KT7c4iNwrjDjNVDJmi_9'})`
                    }}
                ></div>

                <div className="relative z-10 max-w-lg">
                    <div className="space-y-12">
                        <h2 className="text-6xl font-black font-serif italic tracking-tighter text-slate-900 leading-[1.1]">
                            Insight that shapes the future.
                        </h2>

                        <div className="space-y-6">
                            <p className="text-xl font-serif italic text-gray-500 max-w-md leading-relaxed">
                                "Journalism is the first rough draft of history."
                            </p>

                            <div className="pt-8 flex items-center space-x-6">
                                <span className="w-16 h-[2px] bg-red-700"></span>
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-700">
                                    Prestige Editorial Standards
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-100/20 to-transparent"></div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 lg:p-20 bg-white min-h-[70vh]">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </div>
        </div >
    );
};

export default AuthLayout;