export function measurementThresholds(measurementMethod):[number, number]{
    /* Return y axis thresholds for given measurement method*/
    if (measurementMethod==="height"){
        return [30, 200]
    }
    if (measurementMethod==="weight"){
        return [0, 200]
    }
    if (measurementMethod=="bmi"){
        return [0, 40]
    }
    if (measurementMethod==="ofc"){
        return [20, 65]
    }
}