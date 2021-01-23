export function measurementThresholds(measurementPairArray, measurementMethod: string):[number, number]{
    if(measurementPairArray.length < 1){
        //no measurements supplied
        if(measurementMethod === "height"){
            return [20, 200]
        }
        if(measurementMethod === "weight"){
            return [0, 110]
        }
        if(measurementMethod === "ofc"){
            return [20, 65]
        }
        if(measurementMethod === "bmi"){
            return [10, 40]
        }
    }
    if (measurementPairArray[0].length > 1){ // uncorrected ages have the corrected_decimal_age removed
        const minMeasurement = measurementPairArray[0][0].y
        const maxMeasurement = measurementPairArray[measurementPairArray.length-1][1].y
        if (measurementMethod==="bmi" || measurementMethod==="ofc" || measurementMethod==="weight"){
            return [minMeasurement-20, maxMeasurement+20]
        }
        return [minMeasurement - 50, maxMeasurement+50]
    } else {
        const minMeasurement = measurementPairArray[0][0].y
        const maxMeasurement = measurementPairArray[measurementPairArray.length-1][0].y
        if (measurementMethod==="bmi" || measurementMethod==="ofc" || measurementMethod==="weight"){
            return [minMeasurement-20, maxMeasurement+20]
        }
        return [minMeasurement - 50, maxMeasurement+50]
    }
}