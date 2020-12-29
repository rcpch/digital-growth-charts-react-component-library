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
            return weeks
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