export function returnChildMeasurementPairs(measurementsArray){
    let allMeasurementPairs = [] // if no growth data is supplied, charts are returned with child plots
  
    if (measurementsArray.length > 0 ){
      allMeasurementPairs = measurementsArray.map(
        (measurementPair, index) => {
          // iterates through each supplied child measurement and returns a scatter series for each data pair
          // One value for chronological age, one for corrected age.
          // If there is no corrected age, only a dot is rendered, otherwise a cross is returned
          //  for the corrected age, connected by a line to theme chronological age value rendered as a dot.
          measurementPair[0].symbol = 'plus'
          measurementPair[0].size = 5
          
          if (
            measurementPair.length > 1 
          ) {
            measurementPair[1].symbol = ""
            measurementPair[1].size = 5
            
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
  
    // This section works out the earliest and latest dates which are going to need to be plotted
    const minAge = measurementsArray[0][0].x
    let maxAge = 0.0
    const finalItemInMeasurementsArray = measurementsArray[
      measurementsArray.length - 1
    ]
    if (finalItemInMeasurementsArray.length > 1) {
      // any ages where chronological and corrected are the same, will have the corrected age removed
      // and therefore array of pairs will only have a single measurement in it to plot.
      // This method assumes measurements are provide in order - this could be a vulnerability that needs testing
      maxAge = finalItemInMeasurementsArray[1].x
    } else {
      maxAge = finalItemInMeasurementsArray[0].x
    }
  }