export function returnAxis(tick: number, interval: string){
    if (interval === "pretermWeeks"){
        if (tick < 0){
            return (Math.round(tick*52))+40
        } else {
            return 40+(Math.round(tick*52))
        }
    }
    if (interval === "weeks"){
        const weeks = Math.round(tick*52)
        if (weeks % 2 === 0){
            if(weeks<0){
                console.log(weeks);
                
            }
            return weeks
        } else {
            return ''
        }
    }

    if (interval === "months"){
        if (tick*12%2==0){
            return tick*12
        } else {
            return ''
        }
    }
    if (interval === "years"){
        if (tick%1===0){
            return tick
        }
        if (tick%1===0.5){
            return Math.floor(tick) + "½"
        }
    }
}