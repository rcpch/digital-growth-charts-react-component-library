export function setTermDomainsForMeasurementMethod(measurementMethod: string):[number, number]{
    
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