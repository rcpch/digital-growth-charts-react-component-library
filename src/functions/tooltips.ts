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
    sex: string,
    b: number,
    bone_age_label: string,
    bone_age_sds: number,
    bone_age_centile: number,
    bone_age_type: string,
    midparental_height: number,
    midparental_sds: number,
    midparental_lower: number,
    midparental_upper: number,
    childName: any // the name of the component hit
): string {
    if (['centileMPH', 'lowerCentileMPH', 'upperCentileMPH', 'areaMPH'].includes(childName)){
        if (childName=="lowerCentileMPH"){
            return "Expected Height for age: "+Math.round(y*10)/10+" cm\n(based on midparental -2SD)"
        }
        if (childName==="centileMPH"){
            return "Expected Height for age: "+Math.round(y*10)/10+" cm\nMidparental Centile: "+addOrdinalSuffix(Math.round(parseFloat(label)))+"\nMidparental SDS: "+Math.round(midparental_sds*100)/100+"\nMidparental Final Height: "+Math.round(midparental_height*10)/10+" cm\nMidparental Final Height (-2 SD): "+Math.round(midparental_lower*10)/10+" cm\nMidparental Final Height (+2 SD): "+Math.round(midparental_upper*10)/10 + " cm";
        }
        if (childName ==="upperCentileMPH"){
            return "Expected Height for age: "+Math.round(y*10)/10 + "cm\n (based on midparental height +2SD)"
        }
        return;
    }
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
            if (sex==='male'){
                return 'If a plot falls here, pubertal assessment will be required\nand mid-parental centile should be assessed.\nIf they are in puberty or completing puberty,\nthey are below the 0.4th centile and should be referred.\nIn most instances a prepubertal boy plotted in this area\nis growing normally, but comparison with the mid-parental\ncentile and growth trajectory will assist the assessment\nof whether further investigation is needed.';
            } else {
                return 'If a plot falls here, pubertal assessment will be required\nand mid-parental centile should be assessed.\nIf they are in puberty or completing puberty,\nthey are below the 0.4th centile and should be referred.\nIn most instances a prepubertal girl plotted in this area\nis growing normally, but comparison with the mid-parental\ncentile and growth trajectory will assist the assessment\nof whether further investigation is needed.';
            }
        }
        if (!isNaN(Number(label))) {
            // these are the centile labels
            return `${addOrdinalSuffix(label)} centile`;
        } else {
            return label;
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
                concatenatedText+="\nCentile: "+bone_age_sds.toString();
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
