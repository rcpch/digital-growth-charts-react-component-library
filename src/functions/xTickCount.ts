export function xTickCount(lowerThreshold: number, upperThreshold: number, interval: string):number{
    let xTickCount
    const yearsDifference = upperThreshold-lowerThreshold
    
    let multiplier
    if (interval==="years"){
        multiplier=1
    }
    if (interval == "months"){
        multiplier=12 //2 monthly
    }
    if (interval=="weeks"){
        multiplier=52 // 2 weekly
    }
    
    xTickCount = (Math.round(yearsDifference * multiplier))
    
    return xTickCount
}