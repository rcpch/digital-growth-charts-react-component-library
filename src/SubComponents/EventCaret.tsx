import * as React from 'react';

export const EventCaret = (props: any) => {
    const { x, y, eventsText } = props;
    const textHeight = 15* eventsText.length;
    let inverted=false;
    let peakY = y+85
    let cornerY = y+100
    if (cornerY+textHeight > 450){
        peakY = y-250;
        cornerY = y-265;
        inverted=true;
    }
    const coords =  x-15 + " " + cornerY + " " + x + " " + peakY + " " + (x+15) + " " + cornerY
    return (
        <svg>
            <polyline
                points={coords}
                stroke="#A9A9A9"
                strokeWidth={4}
                fill="none"
                pointerEvents="visible"
            />
            <text x={x} y={inverted ? (peakY-textHeight-25):(peakY+25)} textAnchor="middle" color="#A9A9A9">
                {eventsText.map((eventText: string) => {
                    return <tspan x={x} dy={15}>{eventText}</tspan>
                })}
            </text>
        </svg>
    )
}
