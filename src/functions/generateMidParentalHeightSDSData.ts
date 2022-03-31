import { ClientMeasurementObject } from "../interfaces/ClientMeasurementObject";
import { MidParentalHeightObject } from "../interfaces/MidParentalHeightObject";

export const generateMidParentalHeightSDSData = (
    domains: any,
    midParentalHeightData: MidParentalHeightObject
) => {
    /*
    Generates data for a midparental line using the margins of the chart
    */
    if (midParentalHeightData?.mid_parental_height_sds){
        const array=[]
        let x=domains.x[0];
        while (x <= domains.x[1]){
            array.push(
                {
                    x: x,
                    y: midParentalHeightData.mid_parental_height_sds
                }
            );
            x += 0.25;
        }
        return array;
    } else {
        return null;
    }
}