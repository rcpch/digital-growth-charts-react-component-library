import * as React from 'react';

export const MidParentalHeight = (props) => {

    const { scale, data } = props;
    
    const x = scale.x(data[0].x);
    const upperY = Math.round((scale.y(data[0].y + 8))*100)/100;
    const lowerY = Math.round((scale.y(data[0].y-8))*100)/100;
    const increment = Math.round((lowerY - upperY)/17*100)/100; // 17 lines
    
    let i = upperY
    let lines = []
    const longLineWidth = -10
    const shortLineWidth = -5
    const centreLine = -12.5
    while (i <= lowerY) {
        lines.push(Math.round(i*100)/100)
        i += increment
    }
    
    const fillColour = props.styles.delayedPubertyArea.data.fill;
    const lineColour = props.styles.xAxis.axis.stroke;
    
    return (
        <svg>
            <rect 
                fill={fillColour}
                x={scale.x(data[0].x)}
                y={upperY}
                width={10}
                height={lowerY-upperY}
            />
            {lines.map((line, index) => {
                let lineWidth = shortLineWidth
                let lineText = ""
                let lineHeight = line
                if (index  === 0){
                    lineWidth = longLineWidth
                    // lineHeight = line
                    lineText = `${data[0].y+8} cm`
                }
                if (index === lines.length-1){
                    lineWidth = longLineWidth
                    lineText = `${data[0].y-8} cm`
                    // lineHeight = upperY
                }
                if (index === 8) {
                    lineWidth=centreLine
                    lineText = `${data[0].y} cm`
                }
                
                return (
                    <g
                        key={`midparentalLabel ${index}`}
                    >
                        <line 
                            x1={x+lineWidth} 
                            x2={x+10} 
                            y1={line} 
                            y2={line} 
                            strokeWidth={1} 
                            stroke={lineColour}/>
                                <text 
                                    x={x+longLineWidth-60}
                                    y={lineHeight}
                                    fontSize={12}
                                    color={lineColour}
                                    alignmentBaseline="middle"
                                >
                                   {lineText}
                                </text>
                    </g>
                )
            })}
        </svg>
    )
    
}