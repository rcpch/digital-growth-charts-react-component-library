import React from 'react';

export const MonthsLabel = (props) => { // the same ChartCircle but smaller for use in axis label
    const {x, y, text, style} = props
    return (<svg>
      <text x={x+210} y={y+12.5} textAnchor="left" fontSize={style.fontSize} fontFamily={style.fontFamily}>{text}</text>
      <circle cx={x+200} cy={y+10} r={5} stroke="black" fill="transparent" />
      <line x1={x+200} x2={x+200} y1={y+20} y2={y+15} stroke="black" />
    </svg>)
  }