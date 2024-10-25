import * as React from 'react';

export const ChartCircle = (props: any) => {
    // lollipop tick for months
    const { x, y, style, text } = props;
    if ((text as number) > 0) {
        return (
            <svg>
                <text x={x} y={y - 17.5} textAnchor="middle" fill={style.stroke} fontSize={6}>
                    {text}
                </text>
                <circle cx={props.x} cy={y - 20} r={5} stroke={style.stroke} fill="transparent" />
                <line x1={props.x} x2={x} y1={y - 5} y2={y - 15} stroke={style.stroke} />
            </svg>
        );
    } else {
        return null;
    }
};
