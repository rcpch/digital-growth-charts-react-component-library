import { PlottableMeasurement } from "../interfaces/RCPCHMeasurementObject";

export function setTermXDomainsByMeasurementAges(measurementsArray: PlottableMeasurement[]):[number, number]{
    const pairs = measurementsArray
    let lowerAgeX, upperAgeX

    if (pairs.length > 0){
      lowerAgeX = pairs[0][0].x
      upperAgeX = pairs[pairs.length-1][0].x

      if (lowerAgeX < 0){
        lowerAgeX = -0.383
        upperAgeX = 0.25
      }
      if (lowerAgeX >= 0 && lowerAgeX < 2){
        lowerAgeX = 0
      }
      if (lowerAgeX >= 2 && lowerAgeX <4){
        lowerAgeX = 2
      }
      if (upperAgeX>=0 && upperAgeX <2){
        return [lowerAgeX, 2]
      }
      if (upperAgeX >=2 && upperAgeX< 4){
        return [lowerAgeX, 4]
      }
      if(upperAgeX >=4){
        upperAgeX = upperAgeX + 4
        if (upperAgeX > 20){
          upperAgeX=20
        }
        return [lowerAgeX, upperAgeX]
      }
    }
    return [0,20]
}