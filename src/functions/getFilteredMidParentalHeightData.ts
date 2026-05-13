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

function filterCentilesByRange(centiles: ICentile[], lowerLimit: number, upperLimit: number): ICentile[] {
    return centiles.map((centile: ICentile) => {
        if (!centile.data) {
            return { ...centile };
        }

        const filteredData = centile.data.filter((measurementItem) => {
            const x = measurementItem['x'];
            return typeof x === 'number' && x >= lowerLimit && x <= upperLimit;
        });

        return {
            ...centile,
            data: filteredData,
        };
    });
}

export const getFilteredMidParentalHeightData = (
    reference: 'uk-who' | 'cdc' | 'turner' | 'trisomy-21' | 'trisomy-21-aap' | 'who',
    childMeasurements: Measurement[],
    midParentalHeightData: MidParentalHeightObject,
    sex: 'male' | 'female',
) => {
    if (reference !== 'uk-who' && reference !== 'cdc') {
        // "Not UK-WHO or CDC"
        return;
    }

    const centileReferenceData = midParentalHeightData.mid_parental_height_centile_data;
    const lowerCentileReferenceData = midParentalHeightData.mid_parental_height_lower_centile_data;
    const upperCentileReferenceData = midParentalHeightData.mid_parental_height_upper_centile_data;

    if (
        midParentalHeightData.mid_parental_height_centile &&
        centileReferenceData &&
        lowerCentileReferenceData &&
        upperCentileReferenceData &&
        centileReferenceData.length > 0
    ) {
        let upperLimit = 20;
        let lowerLimit = 19.75;

        if (childMeasurements.length > 0) {
            const ages = childMeasurements
                .map((measurement) => measurement.plottable_data.centile_data.corrected_decimal_age_data.x)
                .filter((age): age is number => typeof age === 'number' && Number.isFinite(age));

            const latestAge = ages.length > 0 ? Math.max(...ages) : null;

            if (latestAge !== null) {
                if (latestAge < 3 / 12) {
                    upperLimit = latestAge + 2 / 52;
                    lowerLimit = latestAge - 2 / 52;
                } else if (latestAge >= 3 / 12 && latestAge < 3) {
                    upperLimit = latestAge + 1 / 12;
                    lowerLimit = latestAge - 1 / 12;
                } else if (latestAge >= 3 && latestAge < 12) {
                    upperLimit = latestAge + 2 / 12;
                    lowerLimit = latestAge - 2 / 12;
                } else {
                    upperLimit = latestAge + 6 / 12;
                    lowerLimit = latestAge - 6 / 12;
                }
            }
        }

        const newReferenceObject: ClientMidparentalCentilesObject[] = [];

        centileReferenceData.forEach((referenceData: UKWHOReferences | CDCReferences, index) => {
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
                    lowerCentileReferenceData[index].uk90_preterm ||
                    lowerCentileReferenceData[index].uk_who_infant ||
                    lowerCentileReferenceData[index].uk_who_child ||
                    lowerCentileReferenceData[index].uk90_child;
                uppercentiles =
                    upperCentileReferenceData[index].uk90_preterm ||
                    upperCentileReferenceData[index].uk_who_infant ||
                    upperCentileReferenceData[index].uk_who_child ||
                    upperCentileReferenceData[index].uk90_child;
            } else if (reference === 'cdc' && isCDCReferences(referenceData)) {
                centiles = referenceData.fenton || referenceData.cdc_infant || referenceData.cdc_child;
                // Fenton data is not available for CDC references currently so we skip it
                lowercentiles =
                    lowerCentileReferenceData[index].fenton ||
                    lowerCentileReferenceData[index].cdc_infant ||
                    lowerCentileReferenceData[index].cdc_child;
                uppercentiles =
                    upperCentileReferenceData[index].fenton ||
                    upperCentileReferenceData[index].cdc_infant ||
                    upperCentileReferenceData[index].cdc_child;
            } else {
                // Handle the case where the reference type does not match any known types
                throw new Error(`Unknown reference type: ${reference}`);
            }

            const mpcData = sex === 'male' ? (centiles?.male?.height ?? []) : (centiles?.female?.height ?? []);
            const lowerMPCData =
                sex === 'male' ? (lowercentiles?.male?.height ?? []) : (lowercentiles?.female?.height ?? []);
            const upperMPCData =
                sex === 'male' ? (uppercentiles?.male?.height ?? []) : (uppercentiles?.female?.height ?? []);

            // filter the midparental centile data to render only 0.y either side of a given measurement.
            // if no measurement provided, render it from 19.5 to 20 y

            const filteredLowerMPCData = filterCentilesByRange(lowerMPCData, lowerLimit, upperLimit);
            const filteredMPCData = filterCentilesByRange(mpcData, lowerLimit, upperLimit);
            const filteredUpperMPCData = filterCentilesByRange(upperMPCData, lowerLimit, upperLimit);

            newReferenceObject.push({
                lowerParentalCentile: filteredLowerMPCData,
                midParentalCentile: filteredMPCData,
                upperParentalCentile: filteredUpperMPCData,
            });
        });

        return newReferenceObject;
    } else {
        return null;
    }
};
