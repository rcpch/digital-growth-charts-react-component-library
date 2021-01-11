export function measurementThresholds(measurementPairArray, measurementMethod: string):[number, number]{
    if(measurementPairArray.length < 1){
        //no measurements supplied
        if(measurementMethod === "height"){
            return [0, 200]
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
    const minMeasurement = measurementPairArray[0][0].y
    const maxMeasurement = measurementPairArray[measurementPairArray.length-1][1].y
    if (measurementMethod==="bmi" || measurementMethod==="ofc" || measurementMethod==="weight"){
        return [minMeasurement-5, maxMeasurement+5]
    }
    return [minMeasurement - 10, maxMeasurement+10]
}