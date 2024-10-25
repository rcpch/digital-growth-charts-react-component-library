import { Datum } from 'victory';

export function sdsTooltipText(datum: Datum) {
    /*
    Returns tool tip labels for SDS charts.
    */
    if (datum.datum.childName === 'mid-parental-sds') {
        return `Midparental Height SDS: ${datum.datum.y > 0 ? '+' : ''}${Math.round(datum.datum.y * 1000) / 1000}`;
    }
    // use childName to identify if this is a corrected or chronological age
    const array = datum.datum.childName.split('-');

    // set the measurement methods
    let measurementMethod = array[1];

    let finalString = '';
    if (measurementMethod == 'height') {
        finalString = 'Height';
    }
    if (measurementMethod == 'weight') {
        finalString = 'Weight';
    }
    if (measurementMethod == 'bmi') {
        finalString = 'Body Mass Index';
    }
    if (measurementMethod == 'ofc') {
        finalString = 'Head Circumference';
    }

    // concatenate to form final string
    let finalLabel = '';

    // set the ages
    let correctedChronologicalText = 'Chronological Age: ';
    if (array[0] === 'corrected') {
        correctedChronologicalText = 'Corrected Age: ';
        if (datum?.datum?.plottable_data?.sds_data?.corrected_decimal_age_data?.corrected_gestational_age) {
            correctedChronologicalText = 'Corrected Gestational Age: ';
        }
        finalLabel = `${finalString} SDS: ${Math.round(datum.datum.measurement_calculated_values.corrected_sds * 1000) / 1000}\n${correctedChronologicalText}${datum.datum.measurement_dates.corrected_calendar_age ?? datum.datum.plottable_data.sds_data.corrected_decimal_age_data.corrected_gestational_age}`;
    } else {
        finalLabel = `${finalString} SDS: ${Math.round(datum.datum.measurement_calculated_values.chronological_sds * 1000) / 1000}\n${correctedChronologicalText}${datum.datum.measurement_dates.chronological_calendar_age}`;
    }

    // set the errors to tooltips if present
    if (
        datum.datum.plottable_data?.sds_data?.corrected_decimal_age_data?.age_error ||
        datum.datum.plottable_data?.sds_data?.chronological_decimal_age_data?.age_error
    ) {
        finalLabel +=
            datum.datum.plottable_data?.sds_data?.corrected_decimal_age_data?.age_error ??
            datum.datum.plottable_data?.sds_data?.chronological_decimal_age_data?.age_error;
    }
    if (
        datum.datum.plottable_data?.sds_data?.corrected_decimal_age_data?.observation_value_error ||
        datum.datum.plottable_data?.sds_data?.chronological_decimal_age_data?.observation_value_error
    ) {
        finalLabel +=
            datum.datum.plottable_data?.sds_data?.corrected_decimal_age_data?.observation_value_error ??
            datum.datum.plottable_data?.sds_data?.chronological_decimal_age_data?.observation_value_error;
    }

    return finalLabel;
}
