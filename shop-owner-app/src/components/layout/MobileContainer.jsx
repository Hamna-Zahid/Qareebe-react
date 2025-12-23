import React from 'react';

const MobileContainer = ({ children }) => {
    return (
        <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-0 md:p-4 font-sans">
            {/* Phone Frame */}
            <div className="w-full max-w-md h-[100dvh] md:h-[90vh] bg-white md:rounded-[2.5rem] shadow-2xl overflow-hidden relative flex flex-col border border-gray-200 ring-8 ring-black/5 transform-gpu">
                {/* Status Bar Area (Visual only for desktop feel) */}
                <div className="h-8 bg-white w-full sticky top-0 z-50 flex items-center justify-between px-6 select-none shrink-0 border-b border-gray-50">
                    <span className="text-[10px] font-semibold text-gray-900">9:41</span>
                    <div className="flex gap-1.5">
                        <div className="w-4 h-2.5 bg-gray-900 rounded-[2px]" />
                        <div className="w-2.5 h-2.5 bg-gray-900 rounded-full" />
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-hidden relative flex flex-col bg-gray-50">
                    {children}
                </div>

                {/* iOS Home Indicator (Visual) */}
                <div className="h-1 bg-gray-300 w-1/3 mx-auto rounded-full absolute bottom-2 left-0 right-0 z-[100] opacity-50 pointer-events-none" />
            </div>
        </div>
    );
};

export default MobileContainer;
