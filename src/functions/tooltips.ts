import { measurementSuffix } from '../functions/measurementSuffix';
import addOrdinalSuffix from './addOrdinalSuffix';

export function tooltipText(
    reference: string,
    label: string,
    measurementMethod: string,
    age: number,
    age_type: string,
    centile_band: string,
    calendar_age: string,
    corrected_gestational_age: string,
    y: number,
    observation_value_error: any,
    age_error: any,
    lay_comment: any,
    corrected: boolean,
    chronological: boolean,
): string {
    if (label) {
        if (age === 0.0383 && reference === 'uk-who') {
            return 'Transit point from\nUK90 to WHO data';
        }
        if (age === 4 && reference == 'uk-who') {
            return 'Transit point from\nUK-WHO to UK90 data.';
        }
        if (age === 2 && measurementMethod === 'height' && reference == 'uk-who') {
            // step down at 2 y where children measured standing (height), not lying (length)
            return 'Measure length until age 2;\nMeasure height after age 2.\nA child’s height is usually\nslightly less than their length.';
        }
        if (age === 2 && measurementMethod === 'height' && reference == 'uk-who') {
            // step down at 2 y where children measured standing (height), not lying (length)
            return 'Measure length until age 2;\nMeasure height after age 2.\nA child’s height is usually\nslightly less than their length.';
        }
        if (label === 'For all Children plotted in this shaded area see instructions.' && reference == 'uk-who') {
            // delayed puberty if plotted in this area
            return 'For all Children plotted\nin this shaded area\nsee instructions.';
        }
        if (!isNaN(Number(label))) {
            // these are the centile labels
            return `${addOrdinalSuffix(label)} centile`;
        } else {
            return label;
        }
    }
    if (centile_band || observation_value_error || age_error) {
        // these are the measurement points or the errors

        /// plots
        if (observation_value_error === null && age_error === null) {
            // usually for requests where there is no reference data
            if (age_type === 'corrected_age' && corrected !== chronological && corrected && age > 0.0383) {
                const finalCorrectedString = lay_comment.replaceAll(', ', ',\n').replaceAll('. ', '.\n');
                return (
                    'Corrected age: ' +
                    calendar_age +
                    '\n' +
                    finalCorrectedString +
                    '\n' +
                    y +
                    measurementSuffix(measurementMethod) +
                    '\n'
                );
            }
            if (age_type === 'chronological_age') {
                let finalChronologicalString = lay_comment
                    .replaceAll(', ', ',\n')
                    .replaceAll('. ', '.\n')
                    .replaceAll('account ', 'account\n');
                return (
                    'Actual age: ' +
                    calendar_age +
                    '\n' +
                    finalChronologicalString +
                    '\n' +
                    y +
                    measurementSuffix(measurementMethod) +
                    '\n'
                );
            }
        }

        // errors
        if (observation_value_error !== null || age_error !== null) {
            // usually errors where impossible weights/heights etc

            // the datum.lay_decimal_age_comment and datum.clinician_decimal_age_comment are long strings
            // this adds new lines to ends of sentences or commas.
            let obs_error_calc = '';
            let age_error_calc = calendar_age;
            if (observation_value_error !== null) {
                obs_error_calc = observation_value_error.replaceAll(', ', ',\n').replaceAll('. ', '.\n');
            }
            if (age_error !== null) {
                age_error_calc = age_error.replaceAll(', ', ',\n').replaceAll('. ', '.\n');
            }

            if (age_type === 'corrected_age') {
                return (
                    'Corrected age: ' +
                    age_error_calc +
                    '\n' +
                    y +
                    measurementSuffix(measurementMethod) +
                    '\n' +
                    observation_value_error
                );
            } else {
                return (
                    'Chronological age: ' +
                    age_error_calc +
                    '\n' +
                    y +
                    measurementSuffix(measurementMethod) +
                    '\n' +
                    observation_value_error
                );
            }
        }
        // measurement data points
        if (age <= 0.0383) {
            // <= 42 weeks
            /// plots
            if (observation_value_error === null && age_error === null) {
                // usually for requests where there is no reference data
                if (age_type === 'corrected_age' && corrected) {
                    const finalCorrectedString = lay_comment.replaceAll(', ', ',\n').replaceAll('. ', '.\n');
                    return (
                        'Corrected age: ' +
                        corrected_gestational_age +
                        '\n' +
                        finalCorrectedString +
                        '\n' +
                        y +
                        measurementSuffix(measurementMethod) +
                        '\n'
                    );
                }
                if (age_type === 'chronological_age') {
                    let finalChronologicalString = lay_comment.replaceAll(', ', ',\n').replaceAll('. ', '.\n');
                    return (
                        'Actual age: ' +
                        calendar_age +
                        '\n' +
                        corrected_gestational_age +
                        '\n' +
                        finalChronologicalString +
                        y +
                        measurementSuffix(measurementMethod) +
                        '\n'
                    );
                }
            }
        }
    }
}
