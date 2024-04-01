import { Domains } from '../interfaces/Domains';

export function labelAngle(data:any, index:any, chartScaleType: 'prem' | 'infant' | 'smallChild' | 'biggerChild' = 'biggerChild', measurementMethod: 'height' | 'weight' | 'ofc' | 'bmi', domains: Domains):number{
    /* 
    returns the angle in radians of a centile or sds line label using the gradient of the line

    Used to set angle of centile/sds labels
    identifies x and y values of current data point and the one before. Uses these to calculate difference between x and y to convert to radians
    As X scale differs based on age, accepts chartScaleType as parameter - uses this to magnify x difference at younger decimal ages
    Also accepts chart domains as parameter, as x magnification depends on visible extremes of chart (eg a 3 year old seen close up, or 3 year old in life course view)
    */
    
    if (data.length<1){    
        return;
    }

    const lastItem = data[index]; // item in array
 
    let earlierBack = data[index-5]; // item below current
    if (chartScaleType == 'prem'){
        // first item in the list is 22 weeks and will not be associated with any reference data
        earlierBack = data[3]
    }
    
    if(earlierBack == undefined || lastItem == undefined){
        return;
    }
    
    const x0=earlierBack.x
    const x1=lastItem.x 
    const y0=earlierBack.y
    const y1=lastItem.y
    const xDiff = x1-x0
    const yDiff = y1-y0

    let ageDiff = xDiff*10;
    let measurementDiff = yDiff

    if (measurementMethod==='height'){ // babies ages smaller - magnify more
        if (x1 > 2 && x1 <= 9){
            ageDiff = xDiff * 15;
        }
        if (chartScaleType ==='prem'){
            ageDiff = xDiff*100
        }
        if (chartScaleType ==='infant'){
            ageDiff = xDiff*100
        }
        if (chartScaleType ==='smallChild'){
            ageDiff = xDiff * 37.5
        }
        if (chartScaleType==='biggerChild'){
            if (x1 <= 2.0){
                // need to consider upper domains of chart here - if life course view
                if (domains.x[1] > 9){
                    ageDiff = xDiff*7.5;
                } else {
                    ageDiff = xDiff*37.5;
                }
            } else if(x1 <=9){
                ageDiff = xDiff*15;
            }
        }
    }
    if (measurementMethod === 'weight') {
        ageDiff = xDiff * 5;
        if (chartScaleType ==='infant'){
            ageDiff = xDiff * 20
        }
        if (chartScaleType ==='prem'){
            ageDiff = xDiff*20
        }
    }
    if (measurementMethod === 'bmi') {
        ageDiff = xDiff * 2;
    }
    if (measurementMethod === 'ofc'){
        ageDiff = xDiff * 2.5;
        if (chartScaleType ==='prem'){
            ageDiff = xDiff*200
        }
    }
    
    let angle = 0;
    const radians = Math.atan2((measurementDiff), ageDiff);
    angle = radians * (180/Math.PI);
    // console.log(`angle: ${angle}, centile: ${lastItem.l} x0: ${x0} x1: ${x1} x-diff: ${x1-x0} y0: ${y0} y1:${y1} y-diff:${y1-y0} gradient: ${(y1-y0)/(x1-x0)}`);
    return Math.round(-angle);
}