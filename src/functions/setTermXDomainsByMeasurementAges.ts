import { PlottableMeasurement } from "../interfaces/RCPCHMeasurementObject";

export function setTermXDomainsByMeasurementAges(measurementsArray: [PlottableMeasurement,PlottableMeasurement][]):[number, number]{
    const pairs = measurementsArray
    let lowerAgeX, upperAgeX

    if (pairs.length > 0){
      lowerAgeX = pairs[0][0].x
      upperAgeX = pairs[pairs.length-1][0].x

      if (lowerAgeX===upperAgeX){
        // only a single measurement
        if (lowerAgeX < 0){
          lowerAgeX = -0.383
          upperAgeX = 0.25
        } else {
          lowerAgeX = lowerAgeX - 1
          upperAgeX = upperAgeX + 1
          if (lowerAgeX < 0){
            lowerAgeX = 0
          }
          if (upperAgeX > 20){
            upperAgeX = 20
          }
        }
        return [lowerAgeX, upperAgeX]
      } else {
        if (lowerAgeX < 0){
          lowerAgeX = -0.383
        } else {
          lowerAgeX = lowerAgeX - 1
          if (lowerAgeX < 0){
            lowerAgeX = 0
          }
          upperAgeX = upperAgeX + 1
          if (upperAgeX > 20){
            upperAgeX = 20
          }
        }
        return [lowerAgeX, upperAgeX]
      }
    } else {
      return [0,20]
    }
}