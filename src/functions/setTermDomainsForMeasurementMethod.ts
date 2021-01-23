export function setTermDomainsForMeasurementMethod(measurementMethod: string, maxAge: number):[number, number]{

    /* Returns the y max domain based on measurement method and upper age domain */

    
        if(measurementMethod === "height"){
            if (maxAge <= 2){
                return [20, 100]
            }
            if(maxAge >2 && maxAge<4){
                return [50,120]
            }
            return [20, 200]
        }
        if(measurementMethod === "weight"){
            if (maxAge <= 2){
                return [0, 30]
            }
            if(maxAge >2 && maxAge<4){
                return [0,40]
            }
            return [0, 110]
        }
        if(measurementMethod === "ofc"){
            if (maxAge <= 2){
                return [25, 55]
            }
            if(maxAge >2 && maxAge<4){
                return [35,55]
            }
            return [20, 65]
        }
        if(measurementMethod === "bmi"){
            if (maxAge <= 2){
                return [0, 25]
            }
            if(maxAge >2 && maxAge<4){
                return [0, 25]
            }
            return [10, 40]
        }
}