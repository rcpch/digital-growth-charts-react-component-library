import * as React from 'react';
import { Point } from 'victory';

export const XPoint = (props: any) => {
    const transform = `rotate(45, ${props.x}, ${props.y})`;
    
    let crossColour = props?.colour ?? 'black';
    let crossSize = props.size;
    if (props.isBoneAge) {
        crossColour = "grey"
        crossSize += 2
    }

    return <Point 
        x={props.x}
        y={props.y}
        size={crossSize}
        symbol="plus" 
        transform={transform}
        style={{
            fill: crossColour
        }}
    />;
};
