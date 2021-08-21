import React from 'react';

export const EventLine = (props) => {
    const {x, y, style, text, measurement} = props
    console.log(measurement);
    
    return (
        <svg>
            <line x={x} y1={10} y2={60}></line>
        </svg>
    )
};
