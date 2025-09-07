import * as React from 'react';

type CommonButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    activeColour?: string;
    inactiveColour?: string;
    buttonSize?: number;
    enabled?: boolean;
};

export const CommonButton = React.forwardRef<HTMLButtonElement, CommonButtonProps>(
    ({ children, activeColour, inactiveColour, buttonSize, enabled, style, ...buttonProps }, ref) => {
        // derive visual state
        const bg = enabled ? activeColour : inactiveColour;

        const mergedStyle: React.CSSProperties = {
            ...(buttonSize ? { fontSize: buttonSize } : {}),
            ...(bg ? { backgroundColor: bg } : {}),
            ...style,
        };

        return (
            <button
                ref={ref}
                type="button"
                // do not pass custom props to DOM
                data-enabled={enabled} // if you still need it for tests/CSS
                style={mergedStyle}
                {...buttonProps}
            >
                {children}
            </button>
        );
    },
);
CommonButton.displayName = 'CommonButton';
