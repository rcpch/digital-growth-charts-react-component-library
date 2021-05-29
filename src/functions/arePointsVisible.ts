import { Measurement } from '../interfaces/RCPCHMeasurementObject';

function arePointsVisible(
    domains: any,
    childMeasurements: Measurement[],
    showChronological: boolean,
    showCorrected: boolean,
) {
    for (const measurement of childMeasurements) {
        let numberVisible = 0;
        if (showChronological) {
            const x = measurement.plottable_data.centile_data.chronological_decimal_age_data.x;
            const y = measurement.plottable_data.centile_data.chronological_decimal_age_data.y;
            if (x < domains.x[1] && x > domains.x[0] && y < domains.y[1] && y > domains.y[0]) {
                if (!showCorrected) {
                    return true;
                } else {
                    numberVisible += 1;
                }
            }
        }
        if (showCorrected) {
            const x = measurement.plottable_data.centile_data.corrected_decimal_age_data.x;
            const y = measurement.plottable_data.centile_data.corrected_decimal_age_data.y;
            if (x < domains.x[1] && x > domains.x[0] && y < domains.y[1] && y > domains.y[0]) {
                if (!showChronological) {
                    return true;
                } else {
                    numberVisible += 1;
                }
            }
        }
        if (numberVisible === 2) {
            return true;
        }
    }
    return false;
}

export default arePointsVisible;
