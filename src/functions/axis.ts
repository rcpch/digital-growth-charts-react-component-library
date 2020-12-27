export function returnAxis(tick: number, interval: string){
    if (interval === "pretermWeeks"){
        if (tick < 0){
            return (Math.round(tick*52))+40
        } else {
            return 40+(Math.round(tick*52))
        }
    }
    if (interval === "weeks"){
        const weeks = tick*52          
        if (Math.floor(weeks)%2===0){
            return Math.floor(weeks)
        } else {
            return ''
        }
    }

    if (interval === "months"){
        if (tick*12%2==0){
            return tick*12
        }
    }
    if (interval === "years"){
        if (tick%1==0){
            return tick
        }
    }
}