export function showAxis(measurementsArray, chartType: string){

    const uk90Preterm = {LowerLimit: -0.038, UpperLimit: 0.038}
    const ukwhoInfant = {LowerLimit: 0.038, UpperLimit: 2}
    const ukwhoChild = {LowerLimit: 2, UpperLimit: 4}
    const uk90Child = {LowerLimit: 4, UpperLimit: 20}

    if (measurementsArray.length == 0 ){
        if (chartType === "uk90Child"){
            return true
        }
        return false //show axis if no child measurements to plot
    } else {
        
        const minAge = measurementsArray[0][0].x
        const maxAge = measurementsArray[measurementsArray.length - 1][1].x
        
        if(chartType === "uk90Preterm"){
            if (minAge < uk90Preterm.UpperLimit || maxAge <uk90Preterm.UpperLimit){
                return true
            }
            return false
        }
        if(chartType === "ukwhoInfant"){
            
            if ((maxAge < ukwhoInfant.UpperLimit && maxAge >= uk90Preterm.LowerLimit )){
                return true
            } else {
                return false
            }
        }
        if(chartType === "ukwhoChild"){
            if (maxAge <= ukwhoChild.UpperLimit && maxAge >= ukwhoChild.LowerLimit){
                return true
            }
            else {
                return false
            }

        }
        if(chartType === "uk90Child"){
            if (maxAge < uk90Child.UpperLimit && maxAge >= uk90Child.LowerLimit){
                return true
            }
            return false  
        }
    }
}