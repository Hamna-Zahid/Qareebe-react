import React from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

const Button = React.forwardRef(({ className, variant = 'default', size = 'default', isLoading, children, ...props }, ref) => {
    const variants = {
        default: 'bg-brand-pink text-white hover:bg-brand-pink/90 shadow-md shadow-brand-pink/20',
        outline: 'border-2 border-brand-pink text-brand-pink hover:bg-brand-pink/10',
        ghost: 'hover:bg-brand-pink/10 text-brand-pink',
        secondary: 'bg-brand-light text-brand-dark hover:bg-gray-200',
    };

    const sizes = {
        default: 'h-11 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-14 px-8 text-lg',
        icon: 'h-11 w-11 p-0 flex items-center justify-center',
    };

    return (
        <button
            ref={ref}
            className={cn(
                'inline-flex items-center justify-center rounded-xl font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink disabled:pointer-events-none disabled:opacity-50 active:scale-95',
                variants[variant],
                sizes[size],
                className
            )}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
            {children}
        </button>
    );
});

Button.displayName = 'Button';

export { Button };
