import React from 'react';
import { Point } from "victory";

export const XPoint = (props) => { // the x for the corrected age, circle for the chronological age
    const transform = `rotate(45, ${props.x}, ${props.y})`;
    if(props.datum.age_type==="chronological_age"){
      return <Point {...props} symbol="circle" />
    } else {
      return <Point {...props} symbol="plus" transform={transform} />
    }
    
  };