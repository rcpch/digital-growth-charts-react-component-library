import { Measurement } from '../interfaces/RCPCHMeasurementObject';

// are the points close enough together that whey would appear crowded (triggers size change in points)

export function isCrowded(domains: any, childMeasurements: Measurement[]) {
    if (childMeasurements.length < 2) {
        return false;
    }
    childMeasurements.sort((a,b)=> (a.measurement_dates.corrected_decimal_age > b.measurement_dates.corrected_decimal_age) ? 1 : (a.measurement_dates.corrected_decimal_age < b.measurement_dates.corrected_decimal_age) ? -1 : 0 )
    let smallestInterval: null | number = null;
    for (let i = 0; i < childMeasurements.length; i++) {
        const lowerValue: number = childMeasurements[i].plottable_data.centile_data.chronological_decimal_age_data.x;
        const higherValue: undefined | number =
            childMeasurements[i + 1]?.plottable_data.centile_data.chronological_decimal_age_data.x;
        if (higherValue) {
            const currentInterval = higherValue - lowerValue;
            if (smallestInterval === null || smallestInterval > currentInterval) {
                smallestInterval = currentInterval;
            }
        }
    }
    const currentDomainInterval = domains.x[1] - domains.x[0];
    const ratio = smallestInterval / currentDomainInterval;
    return ratio < 0.01 ? true : false;
}
