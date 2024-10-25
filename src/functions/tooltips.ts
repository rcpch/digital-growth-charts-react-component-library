import { Datum } from 'victory';
import { measurementSuffix } from '../functions/measurementSuffix';
import { MidParentalHeightObject } from '../interfaces/MidParentalHeightObject';
import addOrdinalSuffix from './addOrdinalSuffix';

export function tooltipText(
    reference: string,
    measurementMethod: string,
    datum: Datum,
    midParentalHeightData: MidParentalHeightObject,
    clinicianFocus: boolean, // flag passed in from user - defines if tooltip text aimed at clinicians or families
    sex: 'male' | 'female',
): string[] {
    /*
    This function returns an array of strings that represent the tooltip text for a given data point.
    The strings in each array represent a new line in the tooltip.
    */

    const {
        childName,
        x, // the decimal age
        l, // labels
        observation_date,
        age_type,
        centile_band,
        calendar_age,
        gestational_age,
        y,
        observation_value_error,
        corrected_measurement_error,
        corrected_decimal_age_error,
        chronological_decimal_age_error,
        age_error,
        lay_comment,
        clinician_comment,
        b,
        centile,
        sds,
        bone_age_label,
        bone_age_sds,
        bone_age_centile,
        bone_age_type,
        corrected_percentage_median_bmi,
        chronological_percentage_median_bmi,
    } = datum;

    if (datum.y === null) {
        return;
    }

    let returnStringList = [];

    // flag passed in from user - if clinician, show clinician age advice strings, else show child/family advice
    const comment = clinicianFocus ? clinician_comment : lay_comment;

    if (corrected_decimal_age_error && age_type === 'corrected_age') {
        returnStringList.push(`${corrected_decimal_age_error}`);
        return returnStringList;
        // return corrected_decimal_age_error
    }
    if (corrected_measurement_error && age_type === 'corrected_age') {
        let corrected_gestational_age = '';
        if (gestational_age) {
            corrected_gestational_age = `${gestational_age.corrected_gestation_weeks}+${gestational_age.corrected_gestation_days} weeks`;
            returnStringList.push(
                `${calendar_age}\nCorrected age: ${corrected_gestational_age} on ${observation_date}`,
            );
            returnStringList.push(`${comment}`);
            returnStringList.push(`${y} ${measurementSuffix(measurementMethod)}`);
            returnStringList.push(`${corrected_measurement_error}`);
        }
        returnStringList.push(`Corrected age: ${calendar_age} on ${observation_date}`);
        returnStringList.push(`${comment}`);
        returnStringList.push(`${y} ${measurementSuffix(measurementMethod)}`);
        returnStringList.push(`${corrected_measurement_error}`);
        return returnStringList;
    }
    if (chronological_decimal_age_error && age_type === 'chronological_age') {
        returnStringList.push(`${chronological_decimal_age_error}`);
        return returnStringList;
    }

    // midparental height labels
    if (midParentalHeightData) {
        const {
            mid_parental_height,
            mid_parental_height_sds,
            mid_parental_height_lower_value,
            mid_parental_height_upper_value,
        } = midParentalHeightData;

        if (
            ['centileMPH', 'lowerCentileMPH', 'upperCentileMPH', 'areaMPH'].includes(childName) &&
            datum._voronoiX < 20
        ) {
            let returnStringList = [];
            if (childName === 'lowerCentileMPH') {
                returnStringList.push(
                    `Midparental Height -2SD: ${Math.round(mid_parental_height_lower_value * 10) / 10} cm`,
                );
                return returnStringList;
            }
            if (childName === 'centileMPH' || childName === 'areaMPH') {
                returnStringList.push(
                    `Midparental Height: ${Math.round(mid_parental_height * 10) / 10} cm (${addOrdinalSuffix(Math.round(parseFloat(l)))}) centile, SDS: ${Math.round(mid_parental_height_sds * 100) / 100})`,
                );
                returnStringList.push(
                    `Range(+/-2SD): ${Math.round(mid_parental_height_lower_value * 10) / 10} cm - ${Math.round(mid_parental_height_upper_value * 10) / 10} cm`,
                );

                return returnStringList;
            }
            if (childName === 'upperCentileMPH') {
                returnStringList.push(
                    `Midparental Height +2SD: ${Math.round(mid_parental_height_upper_value * 10) / 10} cm`,
                );
                return returnStringList;
            }
            return;
        }
    }

    // l represent labels that represent reference transitions, puberty area or sds labels for the BMI SDS lines
    if (l) {
        let returnStringList = [];
        // reference transit point or puberty shaded area labels
        if (x === 0.0383 && reference === 'uk-who') {
            returnStringList.push();
            returnStringList.push('UK90 to WHO data');
            return returnStringList;
        }
        if (x === 4 && reference == 'uk-who') {
            returnStringList.push('Transit point from');
            returnStringList.push('UK90 to WHO data');
            return returnStringList;
        }
        if (x === 2 && measurementMethod === 'height' && reference == 'uk-who') {
            // step down at 2 y where children measured standing (height), not lying (length)
            returnStringList.push('Measure length until age 2y');
            returnStringList.push('Measure height after age 2y');
            returnStringList.push('A child’s height is usually');
            returnStringList.push('slightly less than their length.');
            return returnStringList;
            // return "Measure length until age 2y;\nMeasure height after age 2y.\nA child’s height is usually\nslightly less than their length.";
        }
        if (l === 'For all Children plotted in this shaded area see instructions.' && reference == 'uk-who') {
            let returnStringList = [];
            // delayed puberty if plotted in this area
            if (sex === 'male') {
                returnStringList.push('If a plot falls here, pubertal assessment will be required');
                returnStringList.push('and mid-parental centile should be assessed.');
                returnStringList.push('If they are in puberty or completing puberty,');
                returnStringList.push('they are below the 0.4th centile and should be referred.');
                returnStringList.push('In most instances a prepubertal boy plotted in this area');
                returnStringList.push('is growing normally, but comparison with the mid-parental');
                returnStringList.push('centile and growth trajectory will assist the assessment');
                returnStringList.push('of whether further investigation is needed.');
                return returnStringList;
            } else {
                returnStringList.push('If a plot falls here, pubertal assessment will be required');
                returnStringList.push('and mid-parental centile should be assessed.');
                returnStringList.push('If they are in puberty or completing puberty,');
                returnStringList.push('they are below the 0.4th centile and should be referred.');
                returnStringList.push('In most instances a prepubertal girl plotted in this area');
                returnStringList.push('is growing normally, but comparison with the mid-parental');
                returnStringList.push('centile and growth trajectory will assist the assessment');
                returnStringList.push('of whether further investigation is needed.');
                return returnStringList;
            }
        }

        // Term shaded area text
        if (
            x < 0.038329911019849415 &&
            x > -0.057494866529774126 &&
            reference === 'uk-who' &&
            measurementMethod === 'weight'
        ) {
            let returnStringList = [];
            // returnStringList.push(`${addOrdinalSuffix(l)} centile:`);
            returnStringList.push('Babies born in this shaded area');
            returnStringList.push('are term. It is normal for');
            returnStringList.push('babies to lose weight over');
            returnStringList.push('the first two weeks of life.');
            returnStringList.push('Medical review should be sought');
            returnStringList.push('if weight has dropped by more');
            returnStringList.push('than 10% of birth weight or');
            returnStringList.push('weight is still below birth weight');
            returnStringList.push('three weeks after birth.');
            return returnStringList;
        }

        // BMI SDS labels
        if (childName.includes('sdsLine')) {
            let returnStringList = [];
            returnStringList.push(`${l} SDS`);
            return returnStringList;
        }

        if (childName.includes('centileLine')) {
            // these are the centile labels

            if (datum.x < 20 && y != null) {
                // fix for duplicate text if tooltip called from mouse point where x > chart area or
                // y is null - situations when hovering below the chart in areas where centile data do not exist

                let returnStringList = [];
                returnStringList.push(`${addOrdinalSuffix(l)} centile`);
                return returnStringList;
            }
        }
    }
    if (centile_band) {
        // bone age text
        if ((childName === 'chronologicalboneage' || childName === 'correctedboneage') && b) {
            let returnStringList = [];
            returnStringList.push(`Bone Age: ${b.toString()} yrs`);

            if (bone_age_sds && !isNaN(bone_age_sds)) {
                returnStringList.push(`SDS: ${bone_age_sds.toString()}`);
            }
            if (bone_age_centile && !isNaN(bone_age_centile)) {
                returnStringList.push(`Centile: ${bone_age_centile.toString()}`);
            }
            if (bone_age_type && bone_age_type.length > 0) {
                if (bone_age_type === 'greulich-pyle') {
                    returnStringList.push('Greulich & Pyle');
                }
                if (bone_age_type === 'tanner-whitehouse-ii') {
                    returnStringList.push('Tanner-Whitehouse II');
                }
                if (bone_age_type === 'tanner-whitehouse-iii') {
                    returnStringList.push('Tanner-Whitehouse III');
                }
                if (bone_age_type === 'fels') {
                    returnStringList.push('Fels');
                }
                if (bone_age_type === 'bonexpert') {
                    returnStringList.push('BoneXpert');
                }
                if (bone_age_label && bone_age_label.length > 0) {
                    returnStringList.push(bone_age_label);
                }
            }

            return returnStringList;
        }

        /* 
        plots - this returns a long string with Corrected or Chronological calendar age concatenated with 
        age explanation advice (personalised for clinicians or patients based on clinicianFocused flag),
        the measurement, units and SDS in square brackets.
        If not clinicianFocused (ie for patients), a further string is added describing which centiles the 
        measurement falls on/near or between.
        */

        let finalCentile = centile_band;
        const splitCentile = centile_band.split(' ');
        if (splitCentile.length >= 11) {
            const wantedIndex = splitCentile.findIndex((element: string) => element === 'is');
            splitCentile[wantedIndex] = 'is';
            finalCentile = splitCentile.join(' ').replace('is ', 'is');
        }

        const year = observation_date.split('/')[2];
        const month = observation_date.split('/')[1] - 1;
        const day = observation_date.split('/')[0];
        const formatted_observation_date = new Date(year, month, day).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });

        let returnStringList = [];

        // measurement data points
        if (x <= 0.0383) {
            // <= 42 weeks

            /// plots
            if (observation_value_error === null) {
                // && age_error === null temporarily removed from if statement as error in api return object for EDD < observation_date
                let corrected_gestational_age = '';
                if (gestational_age) {
                    corrected_gestational_age = `${gestational_age.corrected_gestation_weeks}+${gestational_age.corrected_gestation_days} weeks`;
                    returnStringList.push(`${calendar_age}`);
                    returnStringList.push(
                        `Corrected age: ${corrected_gestational_age} on ${formatted_observation_date} )`,
                    );
                }
                // sds in square brackets
                const sds_string = `[SDS: ${sds > 0 ? '+' + Math.round(sds * 1000) / 1000 : Math.round(sds * 1000) / 1000}]`;
                if (age_type === 'corrected_age') {
                    returnStringList.push(
                        `Corrected age: ${calendar_age} on ${formatted_observation_date} on ${formatted_observation_date}`,
                    );
                    returnStringList.push(`${comment}`);
                    returnStringList.push(`${y} ${measurementSuffix(measurementMethod)}`);
                    returnStringList.push(`${clinicianFocus ? sds_string : finalCentile}`);
                    return returnStringList;
                }
                if (age_type === 'chronological_age') {
                    returnStringList.push(`Chronological age: ${calendar_age} on ${formatted_observation_date}`);
                    returnStringList.push(`${comment}`);
                    returnStringList.push(`${y} ${measurementSuffix(measurementMethod)}`);
                    returnStringList.push(`${clinicianFocus ? sds_string : finalCentile}`);
                    return returnStringList;
                }
            }
        } else {
            // over 42 weeks
            // if no errors, return the ages, measurement and calculations
            let correctedPercentageMedianBMI = '';
            let chronologicalPercentageMedianBMI = '';
            if (measurementMethod === 'bmi') {
                correctedPercentageMedianBMI = `Percentage median BMI: ${Math.round(corrected_percentage_median_bmi)}%`;
                chronologicalPercentageMedianBMI = `Percentage median BMI: ${Math.round(chronological_percentage_median_bmi)}%`;
                returnStringList.push(correctedPercentageMedianBMI);
                returnStringList.push(chronologicalPercentageMedianBMI);
            }

            // sds in square brackets
            const sds_string = `[SDS: ${sds > 0 ? '+' + Math.round(sds * 1000) / 1000 : Math.round(sds * 1000) / 1000}]`;

            if (age_type === 'corrected_age' && x > 0.0383) {
                returnStringList.push(`Corrected age: ${calendar_age} on ${formatted_observation_date}`);
                returnStringList.push(`${comment}`);
                returnStringList.push(`${y} ${measurementSuffix(measurementMethod)}`);
                returnStringList.push(`${clinicianFocus ? sds_string : finalCentile}`);
                if (measurementMethod === 'bmi') {
                    returnStringList.push(`${correctedPercentageMedianBMI}`);
                }
                return returnStringList;
            }
            if (age_type === 'chronological_age') {
                let returnString = `Chronological age: ${calendar_age} on ${formatted_observation_date}`;
                returnStringList.push(returnString);
                returnStringList.push(`${comment}`);
                returnStringList.push(`${y} ${measurementSuffix(measurementMethod)}`);
                returnStringList.push(`${clinicianFocus ? sds_string : finalCentile}`);
                if (measurementMethod === 'bmi') {
                    returnStringList.push(`${chronologicalPercentageMedianBMI}`);
                }
                return returnStringList;
            }
        }
    }
}
