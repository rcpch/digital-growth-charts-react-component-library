// these are the thresholds on the UK90 child chart displaying delayed puberty lines with labels.
// the delayedpuberthresholds function generates data for the shaded area.

export const TermThresholds = [
    {
      x: ((37*7)-(40*7))/365.25,
      label: "Term lower threshold"
    },
    {
      x: ((42*7)-(40*7))/365.25,
      label: "Term upper threshold"
    }
]

export const termLowerThreshold = (data) => {
    // generates the data for the shaded area (VictoryArea) where term lies
    return data.map(dataItem =>{
      
      if(dataItem.x >=-0.076 && dataItem.x <=(((42*7)-(40*7))/365.25)){
        return ({...dataItem, y0: 0, l: "Term"})
      }
      return dataItem
    
    });
  }

export const termUpperThreshold = (data) => {
    // generates the data for the shaded area (VictoryArea) where term lies
    return data.map(dataItem =>{
      
      if(dataItem.x >=-0.076 && dataItem.x <=(((42*7)-(40*7))/365.25)){
        return ({...dataItem, y0: 70, l: "Term"})
      }
      return dataItem
    
    });
  }