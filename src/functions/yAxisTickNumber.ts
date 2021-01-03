export function yAxisTickNumber(reference: string, measurementMethod: string){
    
    if (reference == "uk90Child"){
        if (measurementMethod === "height"){
        return 40
        }
        if (measurementMethod === "weight"){
        return 20
        }
        if (measurementMethod === "bmi"){
        return 7
        }
        if (measurementMethod === "ofc"){
        return 8
        }
    }
    if (reference == "ukwhoChild"){
        if (measurementMethod === "height"){
        return 20
        }
        if (measurementMethod === "weight"){
        return 20
        }
        if (measurementMethod === "bmi"){
        return 7
        }
        if (measurementMethod === "ofc"){
        return 8
        }
    }
    if (reference == "ukwhoInfant"){
        if (measurementMethod === "height"){
        return 20
        }
        if (measurementMethod === "weight"){
        return 20
        }
        if (measurementMethod === "bmi"){
        return 7
        }
        if (measurementMethod === "ofc"){
        return 8
        }
    }
    if (reference == "uk90Preterm"){
        if (measurementMethod === "height"){
        return 14
        }
        if (measurementMethod === "weight"){
        return 16
        }
        if (measurementMethod === "bmi"){
        return 7
        }
        if (measurementMethod === "ofc"){
        return 8
        }
    }


}