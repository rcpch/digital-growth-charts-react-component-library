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
    sex: 'male' | 'female'
): string {

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
    } = datum;

    // flag passed in from user - if clinician, show clinician age advice strings, else show child/family advice 
    const comment = clinicianFocus ? clinician_comment : lay_comment;

    if (corrected_decimal_age_error && age_type === 'corrected_age'){
        return corrected_decimal_age_error
    }
    if (corrected_measurement_error && age_type === 'corrected_age'){
        let corrected_gestational_age=''
        if (gestational_age){
            const finalCorrectedString = comment.replaceAll(', ', ',\n').replaceAll('. ', '.\n');
            corrected_gestational_age=`${gestational_age.corrected_gestation_weeks}+${gestational_age.corrected_gestation_days} weeks`
            return `${calendar_age}\nCorrected age: ${corrected_gestational_age} on ${observation_date}\n${finalCorrectedString}\n${y}${measurementSuffix(measurementMethod)}\n${corrected_measurement_error}`;
        }
        const finalCorrectedString = comment.replaceAll(', ', ',\n').replaceAll('. ', '.\n');
        return `Corrected age: ${calendar_age} on ${observation_date}\n${finalCorrectedString}\n${y} ${measurementSuffix(measurementMethod)} ${corrected_measurement_error}`;
    }

    // midparental height labels
    if (midParentalHeightData){
        const {
            mid_parental_height,
            mid_parental_height_sds,
            mid_parental_height_lower_value,
            mid_parental_height_upper_value
        } = midParentalHeightData;
    
        if (['centileMPH', 'lowerCentileMPH', 'upperCentileMPH', 'areaMPH'].includes(childName) && datum._voronoiX < 20){
            if (childName==="lowerCentileMPH"){
                return `Midparental Height -2SD: ${Math.round(mid_parental_height_lower_value*10)/10} cm`;
            }
            if (childName==="centileMPH" || childName==="areaMPH"){
                return `Midparental Height: ${Math.round(mid_parental_height*10)/10} cm (${addOrdinalSuffix(Math.round(parseFloat(l)))} centile, SDS: ${Math.round(mid_parental_height_sds*100)/100})\nRange(+/-2SD): ${Math.round(mid_parental_height_lower_value*10)/10} cm - ${Math.round(mid_parental_height_upper_value*10)/10} cm`;
            }
            if (childName==="upperCentileMPH"){
                return `Midparental Height +2SD: ${Math.round(mid_parental_height_upper_value*10)/10} cm`;
            }
            return;
        }

    }

    // l represent labels that represent reference transitions, puberty area or sds labels for the BMI SDS lines
    if (l) {
        // reference transit point or puberty shaded area labels
        if (x === 0.0383 && reference === 'uk-who') {
            return 'Transit point from\nUK90 to WHO data';
        }
        if (x === 4 && reference == 'uk-who') {
            return 'Transit point from\nUK-WHO to UK90 data.';
        }
        if (x === 2 && measurementMethod === 'height' && reference == 'uk-who') {
            // step down at 2 y where children measured standing (height), not lying (length)
            return "Measure length until age 2y;\nMeasure height after age 2y.\nA child’s height is usually\nslightly less than their length.";
        }
        if (x === 2 && measurementMethod === 'height' && reference == 'uk-who') {
            // step down at 2 y where children measured standing (height), not lying (length)
            return "Measure length until age 2y;\nMeasure height after age 2y.\nA child’s height is usually\nslightly less than their length.";
        }
        if (l === 'For all Children plotted in this shaded area see instructions.' && reference == 'uk-who') {
            // delayed puberty if plotted in this area
            if (sex==='male'){
                return 'If a plot falls here, pubertal assessment will be required\nand mid-parental centile should be assessed.\nIf they are in puberty or completing puberty,\nthey are below the 0.4th centile and should be referred.\nIn most instances a prepubertal boy plotted in this area\nis growing normally, but comparison with the mid-parental\ncentile and growth trajectory will assist the assessment\nof whether further investigation is needed.';
            } else {
                return 'If a plot falls here, pubertal assessment will be required\nand mid-parental centile should be assessed.\nIf they are in puberty or completing puberty,\nthey are below the 0.4th centile and should be referred.\nIn most instances a prepubertal girl plotted in this area\nis growing normally, but comparison with the mid-parental\ncentile and growth trajectory will assist the assessment\nof whether further investigation is needed.';
            }
        }
        
        // BMI SDS labels
        if (childName.includes("sdsLine")){
            return `${l} SDS`  
        }

        if (childName.includes("centileLine")){
            // these are the centile labels
            if (datum._voronoiX < 20 && y != null){
                // fix for duplicate text if tooltip called from mouse point where x > chart area or 
                // y is ull - situations when hovering below the chart in areas where centile data do not exist
                return `${addOrdinalSuffix(l)} centile`;
            }
        }
    }
    if (centile_band) {

        // bone age text
        if ((childName==="chronologicalboneage" || childName === "correctedboneage") && b){
            let concatenatedText = "Bone Age: "
            
            concatenatedText+=b.toString()+" yrs";
            if (bone_age_sds && !isNaN(bone_age_sds)) {
                concatenatedText+="\nSDS: "+bone_age_sds.toString();
            }
            if (bone_age_centile && !isNaN(bone_age_centile)) {
                concatenatedText+="\nCentile: "+bone_age_centile.toString();
            }
            if (bone_age_type && bone_age_type.length > 0) {
                if (bone_age_type==="greulich-pyle"){
                    concatenatedText+="\nGreulich & Pyle"
                }
                if (bone_age_type==='tanner-whitehouse-ii'){
                    concatenatedText+="\nTanner-Whitehouse II";
                }
                if (bone_age_type==='tanner-whitehouse-iii'){
                    concatenatedText+="\nTanner-Whitehouse III";
                }
                if (bone_age_type==='fels'){
                    concatenatedText+="\nFels";
                }
                if (bone_age_type==='bonexpert'){
                    concatenatedText+="\nBoneXpert";
                }
                if (bone_age_label.length > 0) {
                    concatenatedText+="\n"+bone_age_label
                }
            }
            
            return concatenatedText;
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
            splitCentile[wantedIndex] = 'is\n';
            finalCentile = splitCentile.join(' ').replace('is\n ', 'is\n');
        }
        
        // measurement data points
        if (x <= 0.0383) {
            // <= 42 weeks
            
            /// plots
            if (observation_value_error === null ) {
                // && age_error === null temporarily removed from if statement as error in api return object for EDD < observation_date
                let corrected_gestational_age=''
                if (gestational_age){
                    corrected_gestational_age=`${gestational_age.corrected_gestation_weeks}+${gestational_age.corrected_gestation_days} weeks`
                }
                // sds in square brackets
                const sds_string = `[SDS: ${sds > 0 ? '+' + Math.round(sds*1000)/1000 : Math.round(sds*1000)/1000 }]`;
                if (age_type === 'corrected_age') {
                    const finalCorrectedString = comment.replaceAll(', ', ',\n').replaceAll('. ', '.\n');
                    return `${calendar_age}\nCorrected age: ${corrected_gestational_age} on ${observation_date}\n${finalCorrectedString}\n${y} ${measurementSuffix(measurementMethod)} ${ clinicianFocus ? sds_string : '\n' + finalCentile}`;
                }
                if (age_type === 'chronological_age') {
                    let finalChronologicalString = comment.replaceAll(', ', ',\n').replaceAll('. ', '.\n');
                    return `Chronological age: ${calendar_age}\n${observation_date}\n${finalChronologicalString}\n${y} ${measurementSuffix(measurementMethod)} ${ clinicianFocus ? sds_string : '\n' + finalCentile}`;
                }
            }
        } else {
            // over 42 weeks
            // if no errors, return the ages, measurement and calculations
            
            // sds in square brackets
            const sds_string = `[SDS: ${sds > 0 ? '+' + Math.round(sds*1000)/1000 : Math.round(sds*1000)/1000 }]`;
            
            if (age_type === 'corrected_age' && x > 0.0383) {
                const finalCorrectedString = comment.replaceAll(', ', ',\n').replaceAll('. ', '.\n');
                return `Corrected age: ${calendar_age} on ${observation_date}\n${finalCorrectedString}\n${y} ${measurementSuffix(measurementMethod)} ${ clinicianFocus ? sds_string : '\n' + finalCentile}`;
            }
            if (age_type === 'chronological_age') {
                
                let finalChronologicalString = comment
                    .replaceAll(', ', ',\n')
                    .replaceAll('. ', '.\n')
                    .replaceAll('account ', 'account\n');
                return `Chronological age: ${calendar_age} on ${observation_date}\n${finalChronologicalString}\n${y} ${measurementSuffix(measurementMethod)} ${ clinicianFocus ? sds_string : '\n' + finalCentile}`;
            }
        }
    }
}
