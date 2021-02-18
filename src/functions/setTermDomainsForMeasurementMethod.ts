export function setTermDomainsForMeasurementMethod(measurementMethod: string, maxAge: number, reference: string):[number, number]{

    /* Returns the y max domain based on measurement method and upper age domain */

     if (reference==="uk-who"){
        if(measurementMethod === "height"){
            if (maxAge <= 2){
                return [40, 100]
            }
            if(maxAge >=2 && maxAge<=4){
                return [70,130]
            }
            if(maxAge > 4 && maxAge <=8){
                return [75, 150]
            }
            return [40, 200]
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
    if (reference==="trisomy-21"){
        if(measurementMethod === "height"){
            if (maxAge <= 2){
                return [50, 100]
            }
            if(maxAge >2 && maxAge<4){
                return [60,185]
            }
            return [50, 185]
        }
        if(measurementMethod === "weight"){
            if (maxAge <= 2){
                return [0, 20]
            }
            if(maxAge >2 && maxAge<4){
                return [20,30]
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
    if (reference==="turner"){
        if(measurementMethod === "height"){
            if (maxAge <= 2){
                return [40, 100]
            }
            if(maxAge >=2 && maxAge<=4){
                return [60,105]
            }
            return [40, 165]
        }
    }
}