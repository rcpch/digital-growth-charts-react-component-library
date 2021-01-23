import React from 'react';

export const MonthsLabel = (props) => { // the same ChartCircle but smaller for use in axis label
    const {x, y, text, style} = props
    return (<svg>
      <text x={x-90} y={y+2.5} textAnchor="left" fontSize={10}>{text}</text>
      <circle cx={x-100} cy={y} r={5} stroke="black" fill="transparent" />
      <line x1={x-100} x2={x-100} y1={y+10} y2={y+5} stroke="black" />
    </svg>)
  }