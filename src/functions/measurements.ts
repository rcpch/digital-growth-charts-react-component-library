

export function returnChildMeasurementPairs(measurementsArray){
  
    let allMeasurementPairs = [] // if no growth data is supplied, charts are returned with child plots
  
    if (measurementsArray.length > 0 ){
      allMeasurementPairs = measurementsArray.map(
        (measurementPair, index) => {
          // iterates through each supplied child measurement and returns a scatter series for each data pair
          // One value for chronological age, one for corrected age.
          // If there is no corrected age, only a dot is rendered, otherwise a cross is returned
          //  for the corrected age, connected by a line to theme chronological age value rendered as a dot.
          
          if (
            measurementPair.length > 1 
          ) {
            
            if (measurementPair[0].x === measurementPair[1].x){
              // no correction for gestational age has been made
              // remove the first value of the pair (corrected age)
              // to prevent plotting a cross ontop of a dot
              measurementPair.splice(0, 1)
            }
          }
          
          return measurementPair
        }
      )
    } else {
      allMeasurementPairs = []
    }
  
    return allMeasurementPairs
  }