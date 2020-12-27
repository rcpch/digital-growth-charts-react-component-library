export function axisLineColour(tick, interval){
    if (interval === "pretermWeeks"){
        if (tick < 0){
            return "#818e99"
        }
    }
    if (interval === "weeks"){
        const weeks = tick*52          
        if (Math.floor(weeks)%2===0){
            return "#818e99"
        } else {
            return 'transparent'
        }
    }

    if (interval === "months"){
        if (tick*12%2==0){
            "#818e99"
        }
    }
    if (interval === "years"){
        if (tick%1==0){
            return "#818e99"
        }
    }
}