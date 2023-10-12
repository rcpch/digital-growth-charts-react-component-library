import { ClientStyle } from "../interfaces/ClientStyleObjects";

export function createSDSPointMouseOverObject(styles: { [key: string]: any }){
    /*
    Takes styles object from SDS chart
    This function creates an array of Victory Events, which trigger onMouseOver of SDS chart measurement 
    data points and highlight the series in a different colour specified by the styles object (passed in from the client)
    */
    const returnArray=[]
    for (const item of ["height", "weight", "ofc", "bmi"]){
        const redObject = {
            childName: [
                `chronological-${item}-line`, 
                `corrected-${item}-line`,
                `corrected-${item}-scatter`,
                `chronological-${item}-scatter`,
                `linkLine-${item}`
            ],
            target: "data",
            eventHandlers: {
                onMouseOver: ()=>{
                    return [
                        {
                            childName: [
                                `chronological-${item}-line`, 
                                `corrected-${item}-line`,
                                `linkLine-${item}`
                            ],

                            mutation: ()=>{
                                return {
                                    style: {
                                        stroke: styles.toolTipFlyout.stroke,
                                    }
                                };
                            }
                        },
                        {
                            childName: [
                                `corrected-${item}-scatter`,
                                `chronological-${item}-scatter`,
                            ],

                            mutation: ()=>{
                                return {
                                    style: {
                                        fill: styles.toolTipFlyout.stroke
                                    }
                                };
                            }
                        }
                    ]
                },
                onMouseOut: ()=>{
                    return [
                        {
                            childName: [
                                `chronological-${item}-line`, 
                                `corrected-${item}-line`,
                                `corrected-${item}-scatter`,
                                `chronological-${item}-scatter`,
                                `linkLine-${item}`
                            ],
                        }
                    ]
                }
            }
        }
        returnArray.push(redObject)
    }
    return returnArray;
}