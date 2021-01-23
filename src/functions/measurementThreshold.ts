export function measurementThresholds(measurementMethod):[number, number]{
    if (measurementMethod==="height"){
        return [30, 200]
    }
    if (measurementMethod==="weight"){
        return [0, 200]
    }
    if (measurementMethod=="bmi"){
        [0, 40]
    }
    if (measurementMethod==="ofc"){
        return [30, 80]
    }
}