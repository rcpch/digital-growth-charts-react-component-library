
export function labelAngle(data:any, index:any, chartScaleType: 'prem' | 'infant' | 'smallChild' | 'biggerChild' = 'biggerChild', measurementMethod: 'height' | 'weight' | 'ofc' | 'bmi'):number{
    /* 
    returns the angle in radians of a centile or sds line label using the gradient of the line
    */

    // requires 2 or more datapoints to calculate gradient
    if (data.length<1){
        return;
    }

    const lastItem = data[index];
    
    if(index < 10){
        return
    }
    let earlierBack = data[index-10];
    if (chartScaleType == 'infant'){
        earlierBack = data[index-5];
    }
    
    if(earlierBack == undefined || lastItem == undefined){
        return;
    }
    
    const x0=earlierBack.x
    const x1=lastItem.x
    const y0=earlierBack.y
    const y1=lastItem.y

    let ageDiff = (x1-x0)*10;
    if (x1 < 2.0 && chartScaleType==='biggerChild' && measurementMethod==='height'){ // babies ages smaller - magnify more
        ageDiff = (x1-x0)*40;
    } else if (x1 < 2.0 && chartScaleType === 'infant') {
        ageDiff = (x1-x0)*100;
    }
    if (measurementMethod === 'bmi') {
        ageDiff = (x1-x0) * 2;
    }
    if (measurementMethod === 'ofc'){
        ageDiff = (x1-x0) * 2.5;
    }
    // if (measurementMethod === 'height'){
    //     ageDiff = (x1-x0) * 40;
    // }
    
    let angle = 0;
    const radians = Math.atan2((y1-y0), ageDiff);
    angle = radians * (180/Math.PI);
    // console.log(`angle: ${angle}, centile: ${lastItem.l} x0: ${x0} x1: ${x1} x-diff: ${x1-x0} y0: ${y0} y1:${y1} y-diff:${y1-y0} gradient: ${(y1-y0)/(x1-x0)}`);
    return Math.round(-angle);
}