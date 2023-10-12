export function labelIndexInterval(chartScaleType: 'prem' | 'infant' | 'smallChild' | 'biggerChild' = 'biggerChild', index: number):boolean{
    // returns true if index of data point in centile data array should be rendered

    switch(chartScaleType){
        case "prem":
            return index%5==0;
        case "infant":
            return index%10==0;
        case "smallChild":
            return index%30==0;
        case "biggerChild":
            return index%50==0;
        default:
            return index%50==0;
    }
}