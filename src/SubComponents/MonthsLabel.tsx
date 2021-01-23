import React from 'react';

export const MonthsLabel = (props) => { // the same ChartCircle but smaller for use in axis label
    const {x, y, text, style} = props
    return (<svg>
      <text x={x+50} y={y+7.5} textAnchor="left" fontSize={10}>{text}</text>
      <circle cx={x+40} cy={y+5} r={5} stroke="black" fill="transparent" />
      <line x1={x+40} x2={x+40} y1={y+17.5} y2={y+10} stroke="black" />
    </svg>)
  }