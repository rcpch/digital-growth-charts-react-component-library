export function returnAxis(tick: number, interval: string){
    if (interval === "pretermWeeks"){
        return 40+(tick*52)
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
        console.log(tick*12);
        
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

export function yAxisTickInterval(ticks, measurementMethod: string){
    if(measurementMethod==="height"){
        return ticks%10===0 ? ticks : null
    }
    if(measurementMethod==="weight"){
        return ticks%10===0 ? ticks : null
    }
    if(measurementMethod==="ofc"){
        return ticks%5===0 ? ticks : null
    }
    if(measurementMethod==="bmi"){
        return ticks%5===0 ? ticks : null
    }

}