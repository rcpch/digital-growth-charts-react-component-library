import React from 'react';
import { Point } from 'victory';

export const XPoint = (props) => {
    const transform = `rotate(45, ${props.x}, ${props.y})`;
    return <Point 
        {...props} 
        symbol="plus" 
        transform={transform} 
    />;
};
