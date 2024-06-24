import * as React from 'react';

export const CommonButton = ({ children, ...props }) => {
    // if chart wrapped in a form tag prevent submitting it
    // as the default button type=submit
    return <button {...props} type="button">{children}</button>;
}