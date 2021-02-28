import React from 'react';
import { Point } from "victory";

export const XPoint = (props) => { 
  // the x for the corrected age, circle for the chronological age
  // There is a toggle (showChronologicalAge prop) to render either the chronolgoical age or the corrected
  
    const transform = `rotate(45, ${props.x}, ${props.y})`;
    if(props.datum.age_type==="chronological_age"){
      return props.showChronologicalAge && <Point {...props} symbol="circle" />
    } else {
      return props.showCorrectedAge && <Point {...props} symbol="plus" transform={transform} />
    }
    
  };