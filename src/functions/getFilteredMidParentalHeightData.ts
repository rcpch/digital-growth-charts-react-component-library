import { ICentile, UKWHOReferences, CDCReferences } from '../interfaces/CentilesObject';
import { ClientMidparentalCentilesObject } from '../interfaces/ClientMidparentalCentilesObject';
import { MidParentalHeightObject } from '../interfaces/MidParentalHeightObject';
import { Measurement } from '../interfaces/RCPCHMeasurementObject';

function isUKWHOReferences(data: UKWHOReferences | CDCReferences): data is UKWHOReferences {
    return 'uk90_preterm' in data || 'uk_who_infant' in data || 'uk_who_child' in data || 'uk90_child' in data;
}

function isCDCReferences(data: UKWHOReferences | CDCReferences): data is CDCReferences {
    return 'fenton' in data || 'cdc_infant' in data || 'cdc_child' in data;
}

export const getFilteredMidParentalHeightData = (
    reference: 'uk-who' | 'cdc' | 'turner' | 'trisomy-21',
    childMeasurements: Measurement[],
    midParentalHeightData: MidParentalHeightObject,
    sex: 'male' | 'female',
) => {
    if (reference !== 'uk-who' && reference !== 'cdc') {
        // "Not UK-WHO or CDC"
        return;
    }

    if (
        midParentalHeightData.mid_parental_height_centile &&
        midParentalHeightData.mid_parental_height_centile_data.length > 0
    ) {
        let upperLimit = 20;
        let lowerLimit = 19.75;

        if (childMeasurements.length > 0) {
            const latestAge =
                childMeasurements[childMeasurements.length - 1].plottable_data.centile_data.corrected_decimal_age_data
                    .x;

            if (latestAge < 3 / 12) {
                upperLimit = latestAge + 1 / 52;
                lowerLimit = latestAge - 1 / 52;
            } else if (latestAge >= 3 / 12 && latestAge < 3) {
                upperLimit = latestAge + 2 / 52;
                lowerLimit = latestAge - 2 / 52;
            } else if (latestAge >= 3 && latestAge < 12) {
                upperLimit = latestAge + 2 / 12;
                lowerLimit = latestAge - 2 / 12;
            } else {
                upperLimit = latestAge + 6 / 12;
                lowerLimit = latestAge - 6 / 12;
            }
        }

        let newReferenceObject: ClientMidparentalCentilesObject[] = [];

        midParentalHeightData.mid_parental_height_centile_data.map(
            (referenceData: UKWHOReferences | CDCReferences, index) => {
                // get the midparental centile data

                let centiles;
                let lowercentiles;
                let uppercentiles;
                if (reference === 'uk-who' && isUKWHOReferences(referenceData)) {
                    centiles =
                        referenceData.uk90_preterm ||
                        referenceData.uk_who_infant ||
                        referenceData.uk_who_child ||
                        referenceData.uk90_child;
                    lowercentiles =
                        midParentalHeightData.mid_parental_height_lower_centile_data[index].uk90_preterm ||
                        midParentalHeightData.mid_parental_height_lower_centile_data[index].uk_who_infant ||
                        midParentalHeightData.mid_parental_height_lower_centile_data[index].uk_who_child ||
                        midParentalHeightData.mid_parental_height_lower_centile_data[index].uk90_child;
                    uppercentiles =
                        midParentalHeightData.mid_parental_height_upper_centile_data[index].uk90_preterm ||
                        midParentalHeightData.mid_parental_height_upper_centile_data[index].uk_who_infant ||
                        midParentalHeightData.mid_parental_height_upper_centile_data[index].uk_who_child ||
                        midParentalHeightData.mid_parental_height_upper_centile_data[index].uk90_child;
                } else if (reference === 'cdc' && isCDCReferences(referenceData)) {
                    centiles = referenceData.fenton || referenceData.cdc_infant || referenceData.cdc_child;
                    // Fenton data is not available for CDC references currently so we skip it
                    lowercentiles =
                        midParentalHeightData.mid_parental_height_lower_centile_data[index].fenton ||
                        midParentalHeightData.mid_parental_height_lower_centile_data[index].cdc_infant ||
                        midParentalHeightData.mid_parental_height_lower_centile_data[index].cdc_child;
                    uppercentiles =
                        midParentalHeightData.mid_parental_height_upper_centile_data[index].fenton ||
                        midParentalHeightData.mid_parental_height_upper_centile_data[index].cdc_infant ||
                        midParentalHeightData.mid_parental_height_upper_centile_data[index].cdc_child;
                } else {
                    // Handle the case where the reference type does not match any known types
                    throw new Error(`Unknown reference type: ${reference}`);
                }

                const mpcData = sex === 'male' ? centiles.male.height : centiles.female.height;
                const lowerMPCData = sex === 'male' ? lowercentiles.male.height : lowercentiles.female.height;
                const upperMPCData = sex === 'male' ? uppercentiles.male.height : uppercentiles.female.height;

                // filter the midparental centile data to render only 0.y either side of a given measurement.
                // if no measurement provided, render it from 19.5 to 20 y

                lowerMPCData.forEach((centile: ICentile) => {
                    if (centile.data === null) {
                        // skipping empty datasets like fenton
                        return [];
                    }
                    const newData = centile.data.filter((measurementItem) => {
                        if (measurementItem['x'] >= lowerLimit && measurementItem['x'] <= upperLimit) {
                            return measurementItem;
                        }
                    });
                    centile.data = newData;
                    return centile;
                });
                mpcData.forEach((centile: ICentile) => {
                    if (centile.data === null) {
                        // skipping empty datasets like fenton
                        return [];
                    }
                    const newData = centile.data.filter((measurementItem) => {
                        if (measurementItem['x'] >= lowerLimit && measurementItem['x'] <= upperLimit) {
                            return measurementItem;
                        }
                    });
                    centile.data = newData;
                    return centile;
                });
                upperMPCData.forEach((centile: ICentile) => {
                    if (centile.data === null) {
                        // skipping empty datasets like fenton
                        return [];
                    }
                    const newData = centile.data.filter((measurementItem) => {
                        if (measurementItem['x'] >= lowerLimit && measurementItem['x'] <= upperLimit) {
                            return measurementItem;
                        }
                    });
                    centile.data = newData;
                    return centile;
                });

                newReferenceObject.push({
                    lowerParentalCentile: lowerMPCData,
                    midParentalCentile: mpcData,
                    upperParentalCentile: upperMPCData,
                });
            },
        );

        return newReferenceObject;
    } else {
        return null;
    }
};
