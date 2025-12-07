import { Domains } from '../interfaces/Domains';

export function labelAngle(
    data: any,
    index: any,
    chartScaleType: 'prem' | 'infant' | 'smallChild' | 'biggerChild' = 'biggerChild',
    measurementMethod: 'height' | 'weight' | 'ofc' | 'bmi',
    domains: Domains,
): number {
    /* 
    returns the angle in radians of a centile or sds line label using the gradient of the line

    Used to set angle of centile/sds labels
    identifies x and y values of current data point and the one before. Uses these to calculate difference between x and y to convert to radians
    As X scale differs based on age, accepts chartScaleType as parameter - uses this to magnify x difference at younger decimal ages
    Also accepts chart domains as parameter, as x magnification depends on visible extremes of chart (eg a 3 year old seen close up, or 3 year old in life course view)
    */

    // const bill = data.filter((d: any) => {
    //     if (d.x > domains.x[0] && d.x < domains.x[1]) {
    //         return d;
    //     }
    // });
    // const numberOfItemsBetweenLabels = Math.floor(bill.length / 4); // 3 labels per line - this will serve as an index to split the data into 4 sections
    // const dataBefore = bill.slice(0, numberOfItemsBetweenLabels);
    // const dataBetween = bill.slice(numberOfItemsBetweenLabels, numberOfItemsBetweenLabels * 2);
    // const dataAfter = bill.slice(numberOfItemsBetweenLabels * 2, numberOfItemsBetweenLabels * 3);
    // const dataAfterAfter = bill.slice(numberOfItemsBetweenLabels * 3, bill.length);
    // console.log('dataBefore', dataBefore);
    // console.log('dataBetween', dataBetween);
    // console.log('dataAfter', dataAfter);
    // console.log('dataAfterAfter', dataAfterAfter);

    /*
    We want to be able to see at least 3 labels per line irrespective of the scale of the chart
    of the degree of magnification of the x axis.
    To do this we will break the llist of date into 4 sections - before, between and after each label

    */

    if (data === null || data.length < 1) {
        return 0;
    }

    const lastItem = data[index]; // item in array

    let earlierBack = data[index - 5]; // item below current
    if (chartScaleType == 'prem') {
        // first item in the list is 22 weeks and will not be associated with any reference data
        earlierBack = data[3];
    }

    if (earlierBack == undefined || lastItem == undefined) {
        return 0;
    }

    const x0 = earlierBack.x;
    const x1 = lastItem.x;
    const y0 = earlierBack.y;
    const y1 = lastItem.y;
    const xDiff = x1 - x0;
    const yDiff = y1 - y0;

    let ageDiff = xDiff * 10;
    let measurementDiff = yDiff;

    if (measurementMethod === 'height') {
        // babies ages smaller - magnify more
        if (x1 > 2 && x1 <= 9) {
            ageDiff = xDiff * 15;
        }
        if (chartScaleType === 'prem') {
            ageDiff = xDiff * 100;
        }
        if (chartScaleType === 'infant') {
            ageDiff = xDiff * 100;
        }
        if (chartScaleType === 'smallChild') {
            ageDiff = xDiff * 37.5;
        }
        if (chartScaleType === 'biggerChild') {
            if (x1 <= 2.0) {
                // need to consider upper domains of chart here - if life course view
                if (domains.x[1] > 9) {
                    ageDiff = xDiff * 7.5;
                } else {
                    ageDiff = xDiff * 37.5;
                }
            } else if (x1 <= 9) {
                ageDiff = xDiff * 15;
            }
        }
    }
    if (measurementMethod === 'weight') {
        ageDiff = xDiff * 5;
        if (chartScaleType === 'infant') {
            ageDiff = xDiff * 20;
        }
        if (chartScaleType === 'prem') {
            ageDiff = xDiff * 20;
        }
    }
    if (measurementMethod === 'bmi') {
        if (chartScaleType === 'smallChild' || chartScaleType === 'biggerChild') {
            ageDiff = xDiff * 5;
        } else {
            ageDiff = xDiff * 9;
        }
    }
    if (measurementMethod === 'ofc') {
        ageDiff = xDiff * 10;
        if (chartScaleType === 'smallChild') {
            ageDiff = xDiff * 5;
        }
        if (chartScaleType === 'infant') {
            ageDiff = xDiff * 25;
        }
        if (chartScaleType === 'prem') {
            ageDiff = xDiff * 200;
        }
    }

    let angle = 0;
    const radians = Math.atan2(measurementDiff, ageDiff);
    angle = radians * (180 / Math.PI);
    // console.log(
    //     `angle: ${angle}, centile: ${lastItem.l} x0: ${x0} x1: ${x1} x-diff: ${x1 - x0} y0: ${y0} y1:${y1} y-diff:${y1 - y0} gradient: ${(y1 - y0) / (x1 - x0)}`,
    // );
    return Math.round(-angle);
}
