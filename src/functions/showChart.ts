export function showChart(measurementsArray, chartType: string){

    const uk90Preterm = {LowerLimit: -0.038, UpperLimit: 0.038}
    const ukwhoInfant = {LowerLimit: 0.038, UpperLimit: 2}
    const ukwhoChild = {LowerLimit: 2, UpperLimit: 4}
    const uk90Child = {LowerLimit: 4, UpperLimit: 20}

    if (measurementsArray.length ===0 ){
        return true //show chart if no child measurements to plot
    } else {
        const minAge = measurementsArray[0][0].x
        const maxAge = measurementsArray[measurementsArray.length - 1][1].x
        
        if(chartType === "uk90Preterm"){
            if (minAge < uk90Preterm.UpperLimit){
                return true
            }
            return false
        }
        if(chartType === "ukwhoInfant"){
            if (minAge < ukwhoInfant.UpperLimit && minAge >= ukwhoInfant.LowerLimit){
                return true
            }
            if ((maxAge < ukwhoInfant.UpperLimit && maxAge >= ukwhoInfant.LowerLimit)|| (maxAge !== minAge && maxAge > ukwhoInfant.UpperLimit)){
                return true
            }
            return false          
        }
        if(chartType === "ukwhoChild"){
            if (minAge < ukwhoChild.UpperLimit && minAge >= ukwhoChild.LowerLimit){
                return true
            }
            if ((maxAge <= ukwhoChild.UpperLimit && maxAge > ukwhoChild.LowerLimit) || (maxAge !== minAge && maxAge > ukwhoChild.UpperLimit)){
                return true
            }
            return false  

        }
        if(chartType === "uk90Child"){
            if (minAge < uk90Child.UpperLimit && minAge >= uk90Child.LowerLimit){
                return true
            }
            if (maxAge < uk90Child.UpperLimit && maxAge >= uk90Child.LowerLimit){
                return true
            }
            return false  
        }
    }
}