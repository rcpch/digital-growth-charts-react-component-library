import ukwhoData from '../../chartdata/uk_who_chart_data'
import { Domains } from "../interfaces/Domains"
import { filterData } from '../functions/filterData'

export function fetchUKWHOData(sex: string, measurementMethod:string, domains:Domains): [][] {

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