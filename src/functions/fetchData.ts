import ukwhoData from '../../chartdata/uk_who_chart_data'
import { CentilesObject } from '../interfaces/CentilesObject';

export function fetchData(sex, measurementMethod, xDomains): [][] {

    // Fetches the data to render based on the domain thresholds

    const upperThreshold = xDomains[1]
    const lowerThreshold = xDomains[0]
    
    let uk90PretermDataSet = ukwhoData.uk90_preterm[sex][measurementMethod]
    let ukwhoInfantDataSet = ukwhoData.uk_who_infant[sex][measurementMethod]
    let ukwhoChildDataSet = ukwhoData.uk_who_child[sex][measurementMethod]
    let uk90ChildDataSet = ukwhoData.uk90_child[sex][measurementMethod]

    let dataSetsToRender = []
    if (upperThreshold < 0){
        const truncatedDataSet = uk90PretermDataSet //cannot zoom below 0 - the entire preterm dataset is returned
        dataSetsToRender.push(truncatedDataSet)
        return dataSetsToRender
    }
    if (upperThreshold >= 0.0383 && upperThreshold < 2){
        const truncatedDataSet = ukwhoInfantDataSet.map(centile=>{
            return centile.data.filter(
                (d)=> (d.x <= upperThreshold && d.x > lowerThreshold)
            )
        })
        if (lowerThreshold < 0){
            dataSetsToRender.push(uk90PretermDataSet)
        }
        dataSetsToRender.push(truncatedDataSet)
        return dataSetsToRender
    }
    if (upperThreshold >= 2 && upperThreshold < 4){
        const truncatedDataSet = ukwhoChildDataSet.map(centile=>{
            return centile.data.filter(
                (d)=> (d.x <= upperThreshold && d.x > lowerThreshold)
            )
        })
        if (lowerThreshold < 0){
            dataSetsToRender.push(uk90PretermDataSet)
        }
        if (lowerThreshold > 0.0383 && lowerThreshold < 2){
            const truncatedDataSet = ukwhoInfantDataSet.map(centile=>{
                return centile.data.filter(
                    (d) => (d.x > lowerThreshold)
                )
            })
            dataSetsToRender.push(truncatedDataSet)
        }
        dataSetsToRender.push(truncatedDataSet)
        return dataSetsToRender
        
    }
    if (upperThreshold >= 4 && upperThreshold <= 20){
        
        if (lowerThreshold < 0){
            dataSetsToRender.push(uk90PretermDataSet)
        }
        if (lowerThreshold < 2){
            let truncatedDataSet = ukwhoInfantDataSet
            if (lowerThreshold > 0.0383){
                truncatedDataSet = ukwhoInfantDataSet.map(centile => {
                    return centile.data.filter(
                        (d) => (d.x > lowerThreshold)
                    )
                })
            }
            dataSetsToRender.push(truncatedDataSet)
        }
        
        if (lowerThreshold<4){
            let truncatedDataSet = ukwhoChildDataSet
            if(lowerThreshold>=2){
                truncatedDataSet = ukwhoChildDataSet.map(centile => {
                    return centile.data.filter(
                        (d)=> ( d.x > lowerThreshold )
                    )
                })
            }
            dataSetsToRender.push(truncatedDataSet)
        }
        
        let truncatedDataSet = uk90ChildDataSet
        if (upperThreshold<20){
            truncatedDataSet = uk90ChildDataSet.map(centile => {
                return centile.data.filter((d)=> (d.x <= upperThreshold && d.x > lowerThreshold))
            })
        }
        dataSetsToRender.push(truncatedDataSet)
        console.log(lowerThreshold + " " + upperThreshold);
        console.log(dataSetsToRender);
        
        return dataSetsToRender
    }
}