export function createSDSPointMouseOverObject(styles){
    /*
    Takes styles object from SDS chart
    This function creates an array of Victory Events, which trigger onMouseOver of SDS chart measurement 
    data points and highlight the series in a different colour specified by the styles object (passed in from the client)
    */
    const returnArray=[]
    for (const item of ["height", "weight", "ofc", "bmi"]){
        const correctedName = "corrected-"+item;
        const chronologicalName = "chronological-"+item;
        const redObject = {
            childName: [correctedName, chronologicalName, "linkLine"],
            target: "data",
            eventHandlers: {
                onMouseOver: ()=>{
                    return [
                        {
                            childName: [correctedName, chronologicalName],
                            mutation: ()=>{
                                return {style: {fill: styles.highlightedMeasurementFill.data.fill}};
                            }
                        },
                        {
                            childName: ["linkLine"],
                            mutation: ()=>{
                                return {style: {stroke: styles.highlightedMeasurementFill.data.fill}};
                            }
                        }
                    ]
                }
            }
        }
        returnArray.push(redObject)
    }
    return returnArray;
}