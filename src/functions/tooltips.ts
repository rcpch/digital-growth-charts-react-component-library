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
    if (centile_band) {
        /// plots
        let finalCentile = centile_band;
        const splitCentile = centile_band.split(' ');
        if (splitCentile.length >= 11) {
            const wantedIndex = splitCentile.findIndex((element: string) => element === 'is');
            splitCentile[wantedIndex] = 'is\n';
            finalCentile = splitCentile.join(' ').replace('is\n ', 'is\n');
        }
        if (observation_value_error === null && age_error === null) {
            if (age_type === 'corrected_age' && age > 0.0383) {
                const finalCorrectedString = lay_comment.replaceAll(', ', ',\n').replaceAll('. ', '.\n');
                return (
                    'Corrected age: ' +
                    calendar_age +
                    '\n' +
                    finalCorrectedString +
                    '\n' +
                    y +
                    measurementSuffix(measurementMethod) +
                    '\n' +
                    finalCentile
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
                    '\n' +
                    finalCentile
                );
            }
        }
        // measurement data points
        if (age <= 0.0383) {
            // <= 42 weeks
            /// plots
            if (observation_value_error === null && age_error === null) {
                if (age_type === 'corrected_age') {
                    const finalCorrectedString = lay_comment.replaceAll(', ', ',\n').replaceAll('. ', '.\n');
                    return (
                        'Corrected age: ' +
                        corrected_gestational_age +
                        '\n' +
                        finalCorrectedString +
                        '\n' +
                        y +
                        measurementSuffix(measurementMethod) +
                        '\n' +
                        finalCentile
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
                        '\n' +
                        finalCentile
                    );
                }
            }
        }
    }
}
