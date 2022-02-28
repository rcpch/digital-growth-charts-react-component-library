import { ICentile } from "../interfaces/CentilesObject";
import { Measurement } from "../interfaces/RCPCHMeasurementObject";

export const getFilteredMidParentalHeightData = (
    childMeasurements: Measurement[],
    midParentalHeightData,
    sex
) => {
    
    if (midParentalHeightData.mid_parental_height && midParentalHeightData.mid_parental_height_centile_data.length > 0){
    
        let upperLimit = 20;
        let lowerLimit = 19.75;


        if (childMeasurements.length > 0){
            upperLimit = childMeasurements[childMeasurements.length-1].plottable_data.centile_data.corrected_decimal_age_data.x + (1/12);
            lowerLimit = childMeasurements[childMeasurements.length-1].plottable_data.centile_data.corrected_decimal_age_data.x - (1/12);
        }

        let newReferenceObject = [];
        midParentalHeightData.mid_parental_height_centile_data.map((referenceData, index) => {

                // get the midparental centile data
            const centiles = referenceData.uk90_preterm || referenceData.uk_who_infant || referenceData.uk_who_child || referenceData.uk90_child;
            const lowercentiles = midParentalHeightData.mid_parental_height_lower_centile_data[index].uk90_preterm || midParentalHeightData.mid_parental_height_lower_centile_data[index].uk_who_infant || midParentalHeightData.mid_parental_height_lower_centile_data[index].uk_who_child || midParentalHeightData.mid_parental_height_lower_centile_data[index].uk90_child;
            const uppercentiles = midParentalHeightData.mid_parental_height_upper_centile_data[index].uk90_preterm || midParentalHeightData.mid_parental_height_upper_centile_data[index].uk_who_infant || midParentalHeightData.mid_parental_height_upper_centile_data[index].uk_who_child || midParentalHeightData.mid_parental_height_upper_centile_data[index].uk90_child;
            const mpcData = sex === "male" ? centiles.male.height : centiles.female.height;
            const lowerMPCData = sex === "male" ? lowercentiles.male.height : lowercentiles.female.height;
            const upperMPCData = sex === "male" ? uppercentiles.male.height : uppercentiles.female.height;

            // filter the midparental centile data to render only 0.y either side of a given measurement.
            // if no measurement provided, render it from 19.5 to 20 y

            lowerMPCData.forEach((centile: ICentile)=>{
                const newData = centile.data.filter(measurementItem=>{
                    if (measurementItem["x"] >= lowerLimit && measurementItem["x"] <= upperLimit){
                        return measurementItem
                    }
                })
                centile.data = newData
                return centile
            })
            mpcData.forEach((centile: ICentile)=>{
                const newData = centile.data.filter(measurementItem=>{
                    if (measurementItem["x"] >= lowerLimit && measurementItem["x"] <= upperLimit){
                        return measurementItem
                    }
                })
                centile.data = newData
                return centile
            })
            upperMPCData.forEach((centile: ICentile)=>{
                const newData = centile.data.filter(measurementItem=>{
                    if (measurementItem["x"] >= lowerLimit && measurementItem["x"] <= upperLimit){
                        return measurementItem
                    }
                })
                centile.data = newData
                return centile
            })

            newReferenceObject.push({
                lowerParentalCentile: lowerMPCData,
                midParentalCentile: mpcData,
                upperParentalCentile: upperMPCData
            });
        });

        return newReferenceObject;
    } else {
        return null;
    }

}