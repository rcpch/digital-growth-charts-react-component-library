import { Measurement } from '../interfaces/RCPCHMeasurementObject';

type returnObject = {
    defaultShowCorrected: boolean;
    defaultShowChronological: boolean;
    showToggle: boolean;
};

function defaultToggles(childMeasurements: Measurement[]): returnObject {
    if (!childMeasurements || childMeasurements.length < 1) {
        return { defaultShowCorrected: false, defaultShowChronological: false, showToggle: false };
    }
    if (!childMeasurements[0].plottable_data) {
        throw new Error('No plottable data found. Are you using the correct server version?');
    }
    // if >= 40 weeks, only show chronological:
    const gestWeeks = childMeasurements[0].birth_data.gestation_weeks;
    if (gestWeeks >= 40) {
        return { defaultShowCorrected: false, defaultShowChronological: true, showToggle: false };
    }
    // get max corrected age from  data:
    const arrayOfCorrectedX = [];
    for (let measurement of childMeasurements) {
        const correctedX = measurement.plottable_data.centile_data.corrected_decimal_age_data.x;
        arrayOfCorrectedX.push(correctedX);
    }
    const maxAge = Math.max(...arrayOfCorrectedX);
    const averageAge = arrayOfCorrectedX.reduce((a, b) => a + b, 0) / arrayOfCorrectedX.length;
    // show 2 points if born prem, max age < 2 and average age >= 2 weeks corrected:
    if (maxAge < 2 && averageAge >= 0.038329911019849415 && gestWeeks < 37) {
        return { defaultShowCorrected: true, defaultShowChronological: true, showToggle: true };
    }
    // all other cases show just corrected:
    return { defaultShowCorrected: true, defaultShowChronological: false, showToggle: true };
}

export default defaultToggles;
