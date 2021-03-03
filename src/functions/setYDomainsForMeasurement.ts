export function setYDomainsForMeasurement(reference: string, measurementMethod: string, lowerY: number, upperY: number):[number,number]{
    if (reference==="uk-who"){
        if (measurementMethod==="height"){
            lowerY -= 50
            upperY += 50
            if (lowerY < 40){
                lowerY = 40
            }
            if (upperY > 200){
                upperY = 200
            }
        }
        if (measurementMethod==="weight"){
            lowerY -=10
            upperY +=10
            if (lowerY < 0){
                lowerY = 0
            }
            if (upperY > 110){
                upperY = 110
            }
        }
        if (measurementMethod==="ofc"){
            lowerY -= 10
            upperY += 10
            if (lowerY < 30){
                lowerY = 30
            }
            if (upperY > 70){
                upperY = 70
            }
        }
        if (measurementMethod==="bmi"){
            lowerY -= 10
            upperY += 10
            if (lowerY < 5){
                lowerY = 5
            }
            if (upperY >= 70){
                upperY = 70
            }
        }
    }

    if(reference==="turner"){
        if (measurementMethod==="height"){
            lowerY -= 50
            upperY += 50
            if (lowerY < 40){
                lowerY = 40
            }
            if (upperY > 170){
                upperY = 170
            }
        }
        if (measurementMethod==="weight"){
            return [0,0]
        }
        if (measurementMethod==="ofc"){
            return [0,0]
        }
        if (measurementMethod==="bmi"){
            return [0,0]
        }
    }

    if (reference==="trisomy-21"){
        if (measurementMethod==="height"){
            lowerY -= 50
            upperY += 50
            if (lowerY < 40){
                lowerY = 40
            }
            if (upperY > 180){
                upperY = 180
            }
        }
        if (measurementMethod==="weight"){
            lowerY -=10
            upperY +=10
            if (lowerY < 0){
                lowerY = 0
            }
            if (upperY > 110){
                upperY = 110
            }
        }
        if (measurementMethod==="ofc"){
            lowerY -= 10
            upperY += 10
            if (lowerY < 30){
                lowerY = 30
            }
            if (upperY > 70){
                upperY = 70
            }
        }
        if (measurementMethod==="bmi"){
            lowerY -= 10
            upperY += 10
            if (lowerY < 5){
                lowerY = 5
            }
            if (upperY >= 70){
                upperY = 70
            }
        }
    }

    return [lowerY, upperY]
}