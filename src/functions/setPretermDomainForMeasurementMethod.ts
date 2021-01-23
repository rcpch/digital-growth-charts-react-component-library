import { Domains } from '../interfaces/Domains'

export function setPretermDomainForMeasurementMethod(measurementMethod: string):Domains{
    if (measurementMethod==="height"){
        return {
            x: [-0.383, 0.25],
            y: [20, 70]
        }
    }
    if (measurementMethod==="weight"){
        return {
            x: [-0.383, 0.25],
            y: [0.1, 8]
        }
    }
    if (measurementMethod==="bmi"){
        return {
            x: [-0.383, 0.25],
            y: [12, 20]
        }
    }
    if (measurementMethod==="ofc"){
        return {
            x: [-0.383, 0.25],
            y: [35, 60]
        }
    }

}