export function ageThresholds(measurementPairArray):{x:[number, number]}{
    // this is a helper function return minimum and maximum ages of child measurements to be plotted
    // This function supplies the domain of the axis and centiles to limit rendering to capture charts between the
    // child measurement values. If only one value is plotted, only that chart is rendered
    if (measurementPairArray.length < 1){
        // there are no measurements yet - return a chart aged 0-20y
        return {x:[0, 20]}
    } else {
        const minAge = measurementPairArray[0][0].x
        const maxAgeDecimalAge = measurementPairArray[measurementPairArray.length-1][0].x
        const maxAge = measurementPairArray[measurementPairArray.length-1][1].x
        const minMeasurement = measurementPairArray[0][0].y
        const maxMeasurement = measurementPairArray[measurementPairArray.length-1][1].y
        
        if (minAge===maxAgeDecimalAge){ //there is only one measurement min=max
            if (minAge < 0.038){ // show 2 weeks either side
                let newMinAge = minAge-0.0383
                let newMaxAge = maxAge+0.038
                if (newMinAge <= -0.383){ // < 24 weeks
                    newMinAge = -0.383
                }
                
                return {x:[-0.383, 0.0383]}
            }
            if (minAge < 2){ // show 6 mths either side
                let newMinAge = minAge-0.5
                let newMaxAge = minAge+0.5
                newMinAge = findNearestInt(newMinAge)
                newMaxAge=findNearestInt(newMaxAge)
                return {x:[newMinAge, newMaxAge]}
            }
            if (minAge < 4){ // show 2 years either side
                let newMaxAge = minAge+2
                let newMinAge = minAge-2
                newMinAge = findNearestInt(newMinAge)
                newMaxAge=findNearestInt(newMaxAge)
                return {x:[newMinAge, newMaxAge]}
            }
            if (minAge <20){ // show 4 years either side
                let newMaxAge = minAge+4
                let newMinAge = minAge-4
                newMinAge = findNearestInt(newMinAge)
                newMaxAge=findNearestInt(newMaxAge)
                return {x: [newMinAge, newMaxAge] }
            }
        } else { // more than one measurement
            
            let newMaxAge = maxAge
            let newMinAge = minAge - 0.0383
                if (newMinAge <= -0.383){ // < 24 weeks
                    newMinAge = -0.383
                }
                if (maxAge <=2 && maxAge >= 0.0383){
                    newMaxAge += 0.5
                    newMinAge -= 0.5
                    newMaxAge=findNearestInt(newMaxAge)
                    newMinAge=findNearestInt(newMinAge)
                }
                if (maxAge <4 && maxAge >=2){
                    newMaxAge += 2
                    newMaxAge=findNearestInt(newMaxAge)
                    newMinAge=findNearestInt(newMinAge)
                }
                if (maxAge < 20 && maxAge >=4){
                    newMaxAge += 4
                    if (newMaxAge > 20){
                        newMaxAge = 20
                    }
                }
                
                return {x:[newMinAge, newMaxAge]}
        }
            
    }
    
}

function findNearestInt(age){
    // returns the nearest value where months and weeks are integers
    let roundedAge = Math.round(age*10)/10
    while (roundedAge*12 % 1 !== 0 && roundedAge*52!== 0) {
        roundedAge+=0.1
    }
    return roundedAge
}