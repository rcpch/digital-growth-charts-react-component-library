export function setTermDomainsForMeasurementMethod(measurementMethod: string, minAge: number, maxAge: number, reference: string): [number, number] {

    /* Returns the y max domain based on measurement method and upper age domain */


    if (reference === "uk-who") {
        if (measurementMethod === "height") {
            return [40, 200]
        }
        if (measurementMethod === "weight") {
            return [0, 110]
        }
        if (measurementMethod === "ofc") {
            return [30, 65]
        }
        if (measurementMethod === "bmi") {
            return [10, 40]
        }
    }
    if (reference === "trisomy-21") {
        if (measurementMethod === "height") {
            return [40, 185]
        }
        if (measurementMethod === "weight") {
            return [0, 110]
        }
        if (measurementMethod === "ofc") {
            return [25, 60]
        }
        if (measurementMethod === "bmi") {
            return [0, 50]
        }
    }
    if (reference === "turner") {
        if (measurementMethod === "height") {
            // if (maxAge <= 2){
            //     return [40, 100]
            // }
            // if(maxAge >=2 && maxAge<=4){
            //     return [60,105]
            // }
            return [40, 165]
        }
    }
}