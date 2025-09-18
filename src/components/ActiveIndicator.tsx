interface ActiveIndicatorProps {
    isActive?: boolean;
    variant?: 'underline' | 'dot' | 'badge' | 'highlight';
    className?: string;
}

const ActiveIndicator = ({
    isActive = false,
    variant = 'underline',
    className = ''
}: ActiveIndicatorProps) => {
    if (!isActive) return null;

    const variants = {
        underline: 'absolute bottom-0 left-0 right-0 h-0.5 bg-primary',
        dot: 'absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary',
        badge: 'absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary flex items-center justify-center',
        highlight: 'absolute inset-0 bg-primary/10 rounded-md'
    };

    return (
        <div
            className={`${variants[variant]} transition-smooth ${className}`}
            aria-hidden="true"
        />
    );
};

export default ActiveIndicator;