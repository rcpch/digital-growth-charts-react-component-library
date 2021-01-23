import ukwhoData from '../../chartdata/uk_who_chart_data'
import { Domains } from "../interfaces/Domains"

export function fetchData(sex: string, measurementMethod:string, domains:Domains): [][] {

    // Fetches the data to render based on the domain thresholds
    // truncates arrays based on visible data.

    const upperX = domains.x[1]
    const lowerX = domains.x[0]
    const upperY = domains.y[1]
    const lowerY = domains.y[0]

    const uk90PretermDataSet = ukwhoData.uk90_preterm[sex][measurementMethod]
    const ukwhoInfantDataSet = ukwhoData.uk_who_infant[sex][measurementMethod]
    const ukwhoChildDataSet = ukwhoData.uk_who_child[sex][measurementMethod]
    const uk90ChildDataSet = ukwhoData.uk90_child[sex][measurementMethod]
    

    let dataSetsToRender = []
    

    const truncatedPretermDataSet = uk90PretermDataSet.filter(centile=>{
        return  filterData(centile.data, lowerX, upperX, lowerY, upperY)
    })
    const truncatedUKWHOInfantDataSet = ukwhoInfantDataSet.filter(centile=>{
        return  filterData(centile.data, lowerX, upperX, lowerY, upperY)
    })
    const truncatedUKWHOChildDataSet = ukwhoChildDataSet.filter(centile=>{
        return  filterData(centile.data, lowerX, upperX, lowerY, upperY)
    })
    const truncatedUK90ChildDataSet = uk90ChildDataSet.filter(centile=>{
        return  filterData(centile.data, lowerX, upperX, lowerY, upperY)
    })

    dataSetsToRender.push(truncatedPretermDataSet)
    dataSetsToRender.push(truncatedUKWHOInfantDataSet)
    dataSetsToRender.push(truncatedUKWHOChildDataSet)
    dataSetsToRender.push(truncatedUK90ChildDataSet)
    
    return dataSetsToRender
    
}


function filterData(data, lowerX, upperX, lowerY, upperY){
    const filtered =  data.filter(
        (d)=> (d.x <= upperX && d.x >= lowerX && d.y <= upperY && d.y >= lowerY)
    )
    return filtered
}




// if (upperThreshold < 0){
    //     const truncatedDataSet = uk90PretermDataSet //cannot zoom below 0 - the entire preterm dataset is returned
    //     dataSetsToRender.push(truncatedDataSet)
    //     return dataSetsToRender
    // }
    // if (upperThreshold >= 0.0383 && upperThreshold < 2){
    //     const truncatedDataSet = ukwhoInfantDataSet.map(centile=>{
    //         const filtered =  centile.data.filter(
    //             (d)=> (d.x <= upperThreshold && d.x > lowerThreshold)
    //         )
    //         centile.data = filtered
    //         return centile
    //     })
    //     if (lowerThreshold < 0){
    //         dataSetsToRender.push(uk90PretermDataSet)
    //     }
    //     dataSetsToRender.push(truncatedDataSet)
    //     return dataSetsToRender
    // }
    // if (upperThreshold >= 2 && upperThreshold < 4){
    //     const truncatedDataSet = ukwhoChildDataSet.map(centile=>{
    //         const filtered = centile.data.filter(
    //             (d)=> (d.x <= upperThreshold && d.x > lowerThreshold)
    //         )
    //         centile.data = filtered
    //         return centile
    //     })
    //     if (lowerThreshold < 0){
    //         dataSetsToRender.push(uk90PretermDataSet)
    //     }
    //     if (lowerThreshold >= 0 && lowerThreshold < 2){
    //         const truncatedDataSet = ukwhoInfantDataSet.map(centile=>{
    //             const filtered = centile.data.filter(
    //                 (d) => (d.x > lowerThreshold)
    //             )
    //             centile.data = filtered
    //             return centile
    //         })
    //         dataSetsToRender.push(truncatedDataSet)
    //     }
    //     dataSetsToRender.push(truncatedDataSet)
    //     return dataSetsToRender
        
    // }
    // if (upperThreshold >= 4 && upperThreshold <= 20){
        
    //     if (lowerThreshold < 0){
    //         dataSetsToRender.push(uk90PretermDataSet)
    //     }
    //     if (lowerThreshold < 2 && lowerThreshold >= 0){
    //         let truncatedDataSet = ukwhoInfantDataSet
    //         if (lowerThreshold > 0){
    //             truncatedDataSet = ukwhoInfantDataSet.map(centile => {
    //                 const filtered = centile.data.filter(
    //                     (d) => (d.x > lowerThreshold)
    //                 )
    //                 centile.data = filtered
    //                 return centile
    //             })
    //         }
    //         dataSetsToRender.push(truncatedDataSet)
    //     }
        
    //     if (lowerThreshold<4){
    //         console.log("lower threshold is below 4");
    //         let truncatedDataSet = ukwhoChildDataSet
    //         if(lowerThreshold>=2){
    //             truncatedDataSet = ukwhoChildDataSet.map(centile => {
    //                 const filtered = centile.data.filter(
    //                     (d)=> ( d.x > lowerThreshold )
    //                 )
    //                 centile.data = filtered
    //                 return centile
    //             })
    //         }
    //         dataSetsToRender.push(truncatedDataSet)
    //     }
        
    //     let truncatedDataSet = uk90ChildDataSet
    //     if (upperThreshold<20){
    //         truncatedDataSet = uk90ChildDataSet.map(centile => {
    //             const filtered = centile.data.filter((d)=> (d.x <= upperThreshold && d.x > lowerThreshold))
    //             return centile
    //             centile.data = filtered
    //         })
    //     }
    //     dataSetsToRender.push(truncatedDataSet)
    //     return dataSetsToRender
    // }