import { PlottableMeasurement } from "../interfaces/RCPCHMeasurementObject";

export function removeCorrectedAge(agesArray:[PlottableMeasurement,PlottableMeasurement]){

    // The RCPCHGrowth API returns 2 objects for every measurement (a measurementPair) - one for a chronological age, one for a corrected age
    // In future it is likely that all measurements will be corrected across the life course but for now, correction
    // for gestational age happens upto 1 or 2 years depending on gestation at delivery.
    // This function receives a measurement pair and removes the corrected decimal age.
    // This function is called if no correction has been made and therefore the chronological and corrected ages are
    // are the same.
    // This also prevents the tooltips receiving two pieces of information.
    
    if(agesArray.length > 1){
        const index = agesArray.map(measurement => measurement.age_type).indexOf('corrected_age');
        agesArray.splice(index, 1)
        return agesArray
        
    }
}