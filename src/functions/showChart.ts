
import { ageThresholds } from './ageThresholds'

export function showChart(measurementsArray, chartType: string){

    // displays the chart based on the age of the child
    // if no measurements, the UK90 42 weeks to 20y is displayed
    //  if measurements are provided, charts are chosen on the basis of the ages
    // at which measurements were taken.

    const uk90Preterm = {LowerLimit: -0.038, UpperLimit: 0.038}
    const ukwhoInfant = {LowerLimit: 0.038, UpperLimit: 2}
    const ukwhoChild = {LowerLimit: 2, UpperLimit: 4}
    const uk90Child = {LowerLimit: 4, UpperLimit: 20}

    const ageThreshold = ageThresholds(measurementsArray)
    const lowerThreshold = ageThreshold[0]
    const upperThreshold = ageThreshold[1]



    if (measurementsArray.length ===0 ){
        if (chartType==="uk90Child" || chartType==="ukwhoInfant" || chartType==="ukwhoChild"){
            return true //show all charts if no child measurements to plot, except preterm data
        } else {
            return false
        }
    } else {
 
        if (chartType === "uk90Preterm"){
            if (lowerThreshold < uk90Preterm.UpperLimit ){
                return true
            }
            if ((upperThreshold <= uk90Preterm.UpperLimit && upperThreshold >= uk90Preterm.LowerLimit) ){
                return true
            }
            return false 
        }
        if (chartType === "ukwhoInfant"){
            if (lowerThreshold <= ukwhoInfant.UpperLimit && upperThreshold >= ukwhoInfant.LowerLimit){
                return true
            }
            if ((upperThreshold <= ukwhoInfant.UpperLimit && upperThreshold >= ukwhoInfant.LowerLimit) ){
                return true
            }
            return false 
        }
        if (chartType === "ukwhoChild"){
            
            if (lowerThreshold <= ukwhoChild.UpperLimit || upperThreshold >= ukwhoChild.LowerLimit){
                return true
            }
            if ((upperThreshold <= ukwhoChild.UpperLimit || upperThreshold >= ukwhoChild.LowerLimit) ){
                return true
            }
            return false 
        }
        if (chartType === "uk90Child"){
            if (lowerThreshold <= uk90Child.UpperLimit && upperThreshold >= uk90Child.LowerLimit){
                return true
            }
            if ((upperThreshold <= uk90Child.UpperLimit && upperThreshold >= uk90Child.LowerLimit) ){
                return true
            }
            return false 
        }
    }
}