import React from 'react';

export const Input = React.forwardRef(({
    icon: Icon,
    className = '',
    ...props
}, ref) => {
    return (
        <div className="relative">
            {Icon && (
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            )}
            <input
                ref={ref}
                className={`w-full ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${className}`}
                {...props}
            />
        </div>
    );
});

Input.displayName = 'Input';
