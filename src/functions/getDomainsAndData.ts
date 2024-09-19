
import { ukwhoHeightMaleCentileData } from '../chartdata/uk_who_height_male_centile_data';
import { ukwhoHeightFemaleCentileData } from '../chartdata/uk_who_height_female_centile_data';
import { ukwhoWeightMaleCentileData } from '../chartdata/uk_who_weight_male_centile_data';
import { ukwhoWeightFemaleCentileData } from '../chartdata/uk_who_weight_female_centile_data';
import { ukwhoOFCMaleCentileData } from '../chartdata/uk_who_ofc_male_centile_data';
import { ukwhoOFCFemaleCentileData } from '../chartdata/uk_who_ofc_female_centile_data';
import { ukwhoBMIMaleCentileData } from '../chartdata/uk_who_bmi_male_centile_data';
import { ukwhoBMIFemaleCentileData } from '../chartdata/uk_who_bmi_female_centile_data';

import { ukwhoBMIMaleSDSData } from '../chartdata/uk_who_bmi_sds_male';
import { ukwhoBMIFemaleSDSData } from '../chartdata/uk_who_bmi_female_sds_data';
import { trisomy21BMIMaleSDSData } from '../chartdata/trisomy21_bmi_male_sds_data';
import { trisomy21BMIFemaleSDSData } from '../chartdata/trisomy21_bmi_female_sds_data';


import totalMinPadding from './totalMinPadding';
import { getTickValuesForChartScaling } from './tailoredXTickValues';
import { Measurement } from '../interfaces/RCPCHMeasurementObject';
import { Domains, IDomainSex } from '../interfaces/Domains';

import { IPlottedCentileMeasurement, Reference, ICentile } from '../interfaces/CentilesObject';
import deepCopy from './deepCopy';
import { trisomy21HeightMaleCentileData } from '../chartdata/trisomy21_height_male_centile_data';
import { trisomy21HeightFemaleCentileData } from '../chartdata/trisomy21_height_female_centile_data';
import { trisomy21BMIFemaleCentileData } from '../chartdata/trisomy21_bmi_female_centile_data';
import { trisomy21BMIMaleCentileData } from '../chartdata/trisomy21_bmi_male_centile_data';
import { trisomy21WeightMaleCentileData } from '../chartdata/trisomy21_weight_male_centile_data';
import { trisomy21WeightFemaleCentileData } from '../chartdata/trisomy21_weight_female_centile_data';
import { trisomy21OFCMaleCentileData } from '../chartdata/trisomy21_ofc_male_centile_data';
import { trisomy21OFCFemaleCentileData } from '../chartdata/trisomy21_ofc_female_centile_data';
import { turnerHeightFemaleCentileData } from '../chartdata/turner_height_female_centile_data';

import { cdcHeightMaleCentileData } from '../chartdata/cdc_height_male_centile_data';
import { cdcHeightFemaleCentileData } from '../chartdata/cdc_height_female_centile_data';

type CentileLabelValues = {
    0.4: { value: number; workingX: number };
    2: { value: number; workingX: number };
    9: { value: number; workingX: number };
    25: { value: number; workingX: number };
    50: { value: number; workingX: number };
    75: { value: number; workingX: number };
    91: { value: number; workingX: number };
    98: { value: number; workingX: number };
    99.6: { value: number; workingX: number };
};

type ExtremeValues = {
    lowestY: number;
    highestY: number;
    lowestYForX: null | CentileLabelValues;
    highestYForX: null | CentileLabelValues;
};

const blankDataset = [
    [
        { centile: 0.4, data: [] as ICentile[], sds: -2.67 },
        { centile: 2, data: [] as ICentile[], sds: -2 },
        { centile: 9, data: [] as ICentile[], sds: -1.33 },
        { centile: 25, data: [] as ICentile[], sds: -0.67 },
        { centile: 50, data: [] as ICentile[], sds: 0 },
        { centile: 75, data: [] as ICentile[], sds: 0.67 },
        { centile: 91, data: [] as ICentile[], sds: 1.33 },
        { centile: 98, data: [] as ICentile[], sds: 2 },
        { centile: 99.6, data: [] as ICentile[], sds: 2.67 },
    ],
    [
        { centile: 0.4, data: [] as ICentile[], sds: -2.67 },
        { centile: 2, data: [] as ICentile[], sds: -2 },
        { centile: 9, data: [] as ICentile[], sds: -1.33 },
        { centile: 25, data: [] as ICentile[], sds: -0.67 },
        { centile: 50, data: [] as ICentile[], sds: 0 },
        { centile: 75, data: [] as ICentile[], sds: 0.67 },
        { centile: 91, data: [] as ICentile[], sds: 1.33 },
        { centile: 98, data: [] as ICentile[], sds: 2 },
        { centile: 99.6, data: [], sds: 2.67 },
    ],
    [
        { centile: 0.4, data: [] as ICentile[], sds: -2.67 },
        { centile: 2, data: [] as ICentile[], sds: -2 },
        { centile: 9, data: [] as ICentile[], sds: -1.33 },
        { centile: 25, data: [] as ICentile[], sds: -0.67 },
        { centile: 50, data: [] as ICentile[], sds: 0 },
        { centile: 75, data: [] as ICentile[], sds: 0.67 },
        { centile: 91, data: [] as ICentile[], sds: 1.33 },
        { centile: 98, data: [] as ICentile[], sds: 2 },
        { centile: 99.6, data: [] as ICentile[], sds: 2.67 },
    ],
    [
        { centile: 0.4, data: [] as ICentile[], sds: -2.67 },
        { centile: 2, data: [] as ICentile[], sds: -2 },
        { centile: 9, data: [] as ICentile[], sds: -1.33 },
        { centile: 25, data: [] as ICentile[], sds: -0.67 },
        { centile: 50, data: [] as ICentile[], sds: 0 },
        { centile: 75, data: [] as ICentile[], sds: 0.67 },
        { centile: 91, data: [] as ICentile[], sds: 1.33 },
        { centile: 98, data: [] as ICentile[], sds: 2 },
        { centile: 99.6, data: [] as ICentile[], sds: 2.67 },
    ],
];

function makeDefaultDomains(
    sex: 'male' | 'female',
    reference: 'uk-who' | 'trisomy-21' | 'turner',
    measurementMethod: 'height' | 'weight' | 'bmi' | 'ofc',
) {
    const all: IDomainSex = {
        'male': {
            'uk-who': {
                'height': {
                    x: [0.038329911019849415, 20.05],
                    y: [36.841246, 204.840832],
                },
                'weight': {
                    x: [0.038329911019849415, 20.05],
                    y: [0, 109.984056],
                },
                'bmi': {
                    x: [0.038329911019849415, 20.05],
                    y: [8.878608, 34.219536000000005],
                },
                'ofc': {
                    x: [0.038329911019849415, 18.05],
                    y: [30.716032000000002, 63.533944000000005],
                },
            },
            'trisomy-21': {
                'height': {
                    x: [-0.01, 20.05],
                    y: [33.456711999999996, 185.010504],
                },
                'weight': {
                    x: [-0.01, 20.05],
                    y: [0, 113.55046],
                },
                'bmi': {
                    x: [-0.01, 18.87],
                    y: [0, 67.871482],
                },
                'ofc': {
                    x: [-0.01, 18.05],
                    y: [28.033898999999998, 59.464058],
                },
            },
        },
        'female': {
            'uk-who': {
                'height': {
                    x: [0.038329911019849415, 20.05],
                    y: [37.106385, 187.74047],
                },
                'weight': {
                    x: [0.038329911019849415, 20.05],
                    y: [0, 94.233692],
                },
                'bmi': {
                    x: [0.038329911019849415, 20.05],
                    y: [8.569247, 34.568174],
                },
                'ofc': {
                    x: [0.038329911019849415, 17.05],
                    y: [30.280771, 60.829982],
                },
            },
            'trisomy-21': {
                'height': {
                    x: [-0.01, 20.05],
                    y: [34.805428, 170.823076],
                },
                'weight': {
                    x: [-0.01, 20.05],
                    y: [0, 110.50604799999999],
                },
                'bmi': {
                    x: [-0.01, 18.87],
                    y: [0, 48.775794],
                },
                'ofc': {
                    x: [-0.01, 18.05],
                    y: [27.716357000000002, 56.751594],
                },
            },
            'turner': {
                'height': {
                    x: [0.99, 20.05],
                    y: [54.450081, 169.723302],
                },
            },
        },
    };
    
    return all[sex][reference][measurementMethod];
}

// data validation / analyses whole child measurement array to work out top and bottom x and y
function childMeasurementRanges(
    childMeasurements: Measurement[],
    showCorrected: boolean,
    showChronological: boolean,
    sex: 'male' | 'female',
    measurementMethod: 'height' | 'weight' | 'bmi' | 'ofc',
) {
    let highestChildX = -500;
    let lowestChildX = 500;
    let highestChildY = -500;
    let lowestChildY = 500;
    let gestationInDays: null | number = null;
    let dateOfBirth: null | string = null;
    let internalSex: null | 'male' | 'female' = null;
    let internalMeasurementMethod: null | 'height' | 'weight' | 'bmi' | 'ofc' = null;
    let workingMeasurement: null | string = null;
    for (const measurement of childMeasurements) {
        if (workingMeasurement === JSON.stringify(measurement)) {
            throw new Error('Duplicate measurement entries detected.');
        }
        workingMeasurement = JSON.stringify(measurement);
        if (!measurement.plottable_data) {
            throw new Error('No plottable data found. Are you using the correct server version?');
        }
        const tempGestDays = measurement.birth_data.gestation_weeks * 7 + measurement.birth_data.gestation_days;
        if (gestationInDays === null) {
            gestationInDays = tempGestDays;
        } else if (gestationInDays !== tempGestDays) {
            throw new Error(
                'Measurement entries with different gestations detected. Measurements from only one patient at one time are supported.',
            );
        }
        const tempDob = measurement.birth_data.birth_date;
        if (dateOfBirth === null) {
            dateOfBirth = tempDob;
        } else if (dateOfBirth !== tempDob) {
            throw new Error(
                'Measurement entries with different date of births detected. Measurements from only one patient at one time are supported.',
            );
        }
        const tempSex = measurement.birth_data.sex;
        if (internalSex === null) {
            internalSex = tempSex;
            if (internalSex !== sex) {
                throw new Error('Sex supplied by chart props does not match sex supplied in measurements array.');
            }
        } else if (internalSex !== tempSex) {
            throw new Error(
                'Measurement entries with different sexes detected. Measurements from only one patient at one time are supported',
            );
        } else if (internalSex !== sex) {
            throw new Error('Sex supplied by chart props does not match sex supplied in measurements array.');
        }
        const tempMeasurementMethod = measurement.child_observation_value.measurement_method;
        if (internalMeasurementMethod === null) {
            internalMeasurementMethod = tempMeasurementMethod;
            if (internalMeasurementMethod !== measurementMethod) {
                throw new Error(
                    'Measurement method supplied by chart props does not match measurement method supplied in measurements array.',
                );
            }
        } else if (internalMeasurementMethod !== tempMeasurementMethod) {
            throw new Error(
                'Measurement entries with different measurement methods detected. Only one measurement method is supported at a time.',
            );
        } else if (internalMeasurementMethod !== measurementMethod) {
            throw new Error(
                'Measurement method supplied by chart props does not match measurement method supplied in measurements array.',
            );
        }
        let correctedX = measurement.plottable_data.centile_data.corrected_decimal_age_data.x;
        let chronologicalX = measurement.plottable_data.centile_data.chronological_decimal_age_data.x;
        let correctedY = measurement.plottable_data.centile_data.corrected_decimal_age_data.y;
        let chronologicalY = measurement.plottable_data.centile_data.chronological_decimal_age_data.y;
        const boneAgeX = measurement.bone_age.bone_age;
        const errorsPresent = false;
        
        if (!errorsPresent) {
            if (showCorrected && !showChronological) {
                chronologicalX = correctedX;
                chronologicalY = correctedY;
            } else if (showChronological && !showCorrected) {
                correctedX = chronologicalX;
                correctedY = chronologicalY;
            }
            const arrayOfX = [chronologicalX, correctedX];
            const arrayOfY = [chronologicalY, correctedY];
            for (let coord of arrayOfX) {
                if (highestChildX < coord) {
                    highestChildX = coord;
                }
                if (lowestChildX > coord) {
                    lowestChildX = coord;
                }
            }
            for (let coord of arrayOfY) {
                if (highestChildY < coord) {
                    highestChildY = coord;
                }
                if (lowestChildY > coord) {
                    lowestChildY = coord;
                }
            }
            // if bone age is present and value is more extreme than the highest or lowest x, update:
            if (boneAgeX) {
                if (highestChildX < boneAgeX) {
                    highestChildX = boneAgeX;
                }
                if (lowestChildX > boneAgeX) {
                    lowestChildX = boneAgeX;
                }
            }
        } else {
            console.warn('Measurements considered invalid by the API given to the chart. The chart will ignore them.');
        }
    }

    return { lowestChildX, highestChildX, lowestChildY, highestChildY };
}

// keep track of top and bottom values in visible area:

function makeExtremeValues(native: boolean = false): ExtremeValues {

    return {
        lowestY: 500,
        highestY: -500,
        lowestYForX: native
            ? {
                  0.4: { value: 500, workingX: 500 },
                  2: { value: 500, workingX: 500 },
                  9: { value: 500, workingX: 500 },
                  25: { value: 500, workingX: 500 },
                  50: { value: 500, workingX: 500 },
                  75: { value: 500, workingX: 500 },
                  91: { value: 500, workingX: 500 },
                  98: { value: 500, workingX: 500 },
                  99.6: { value: 500, workingX: 500 },
              }
            : null,
        highestYForX: native
            ? {
                  0.4: { value: -500, workingX: -500 },
                  2: { value: -500, workingX: -500 },
                  9: { value: -500, workingX: -500 },
                  25: { value: -500, workingX: -500 },
                  50: { value: -500, workingX: -500 },
                  75: { value: -500, workingX: -500 },
                  91: { value: -500, workingX: -500 },
                  98: { value: -500, workingX: -500 },
                  99.6: { value: -500, workingX: -500 },
              }
            : null,
    };
}

/* update highest / lowest values in visible data set for labels / setting up best y domains. This is run in the filter
 data loops, so that only one run of looping required:
*/
function updateCoordsOfExtremeValues(
    extremeValues: any,
    centileString: string,
    d: IPlottedCentileMeasurement,
    native = false,
): void {
    
    // transition points can lead to inaccurate coords for centile labels, therefore don't include 2 or 4 years old
    if (!native || (d.x !== 4 && d.x !== 2)) {
        if (extremeValues.lowestY > d.y) {
            extremeValues.lowestY = d.y;
        }

        if (extremeValues.highestY < d.y) {
            extremeValues.highestY = d.y;
        }
        // this is necessary because in the BMI dataset (esp Trisomy-21), the values for Y ramp up to infinitity towards the end of the dataset
        // this is a hack to prevent the chart from scaling to infinity - see discussion in #93 about the nature of SDS calculation when L is 0 or negative
        if (extremeValues.highestY > 500){
            extremeValues.highestY = d.y;
        }

        if (native) {
            if (extremeValues.highestYForX[centileString].workingX < d.x) {
                extremeValues.highestYForX[centileString].value = d.y;
                extremeValues.highestYForX[centileString].workingX = d.x;
            }
            if (extremeValues.lowestYForX[centileString].workingX > d.x) {
                extremeValues.lowestYForX[centileString].value = d.y;
                extremeValues.lowestYForX[centileString].workingX = d.x;
            }
        }
    }
}

//filter data to data that will be visible on screen:
function filterData(
    data: any,
    lowerX: number,
    upperX: number,
    centileString: string,
    extremeValues?: { [key: string]: any },
    native: boolean = false,
) {
    return data.filter(
        (d: IPlottedCentileMeasurement, currentIndex: number, wholeArray: IPlottedCentileMeasurement[]) => {
            //as centile data is to 4 decimal places, this prevents premature chopping off at either end:
            const upperXTo4 = Number(upperX?.toFixed(4));
            const lowerXTo4 = Number(lowerX?.toFixed(4));
            if (d.x <= upperXTo4 && d.x >= lowerXTo4) {
                if (extremeValues) {
                    updateCoordsOfExtremeValues(extremeValues, centileString, d, native);
                }
                return true;
            } else {
                const xBelow: undefined | number = wholeArray[currentIndex - 1]?.x;
                const xAbove: undefined | number = wholeArray[currentIndex + 1]?.x;
                if ((xBelow <= upperXTo4 && xBelow >= lowerXTo4) || (xAbove <= upperXTo4 && xAbove >= lowerXTo4)) {
                    return true;
                } else {
                    return false;
                }
            }
        },
    );
}

// loops through data sets with filterData function:
function truncate(rawDataSet: any[], lowerX: number, upperX: number, extremeValues?: any, native: boolean = false) {
    const truncatedDataSet: any[] = [];
    for (const originalCentileObject of rawDataSet) {
        const rawData = originalCentileObject.data;
        if (rawData.length > 0) {
            const centileString = originalCentileObject.centile;
            const truncatedData = filterData(rawData, lowerX, upperX, centileString, extremeValues, native);
            truncatedDataSet.push({
                ...originalCentileObject,
                ...{ data: truncatedData },
            });
        } else {
            truncatedDataSet.push(originalCentileObject);
        }
    }
    return truncatedDataSet;
}

// gets relevant data sets:
function getRelevantDataSets(
    sex: 'male' | 'female',
    measurementMethod: 'height' | 'weight' | 'bmi' | 'ofc',
    reference: 'uk-who' | 'trisomy-21' | 'turner',
    lowestChildX: number,
    highestChildX: number,
    isSDS: boolean
) {
    if (reference === 'uk-who') {
        let ukwhoData: Reference[]
        if (measurementMethod === 'height'){
            ukwhoData = sex==="male" ? ukwhoHeightMaleCentileData.centile_data : ukwhoHeightFemaleCentileData.centile_data;
        }
        if (measurementMethod === 'weight'){
            ukwhoData = sex==="male" ? ukwhoWeightMaleCentileData.centile_data : ukwhoWeightFemaleCentileData.centile_data;
        }
        if (measurementMethod === 'ofc'){
            ukwhoData = sex==="male" ? ukwhoOFCMaleCentileData.centile_data : ukwhoOFCFemaleCentileData.centile_data;
        }
        if (measurementMethod === 'bmi'){
            if (isSDS){
                ukwhoData = sex ==="male" ? ukwhoBMIMaleSDSData.centile_data : ukwhoBMIFemaleSDSData.centile_data;
            } else {
                ukwhoData = sex==="male" ? ukwhoBMIMaleCentileData.centile_data : ukwhoBMIFemaleCentileData.centile_data;
            }
        }

        const dataSetRanges = [
            [-0.345, 0.0383],
            [0.0383, 2],
            [2, 4],
            [4, 21],
        ];
        let startingGroup = 0;
        let endingGroup = 3;
        for (let i = 0; i < dataSetRanges.length; i++) {
            const range = dataSetRanges[i];
            if (lowestChildX >= range[0] && lowestChildX < range[1]) {
                startingGroup = i;
                break;
            }
        }
        for (let i = 0; i < dataSetRanges.length; i++) {
            const range = dataSetRanges[i];
            if (highestChildX >= range[0] && highestChildX < range[1]) {
                endingGroup = i;
                break;
            }
        }
        const allData: any = [
            measurementMethod !== 'bmi' ? ukwhoData[0].uk90_preterm[sex][measurementMethod] : deepCopy(blankDataset[0]),
            ukwhoData[1].uk_who_infant[sex][measurementMethod],
            ukwhoData[2].uk_who_child[sex][measurementMethod],
            ukwhoData[3].uk90_child[sex][measurementMethod],
        ];
        let returnArray = deepCopy(blankDataset);
        for (let i = startingGroup; i <= endingGroup; i++) {
            returnArray.splice(i, 1, allData[i]);
        }
        return returnArray;
    } else if (reference === 'trisomy-21') {
        let trisomy21Data: Reference[]
        // let trisomy21SDSData: Reference[]
        if (measurementMethod === 'height'){
            trisomy21Data = sex==="male" ? trisomy21HeightMaleCentileData.centile_data : trisomy21HeightFemaleCentileData.centile_data;
        }
        if (measurementMethod === 'weight'){
            trisomy21Data = sex==="male" ? trisomy21WeightMaleCentileData.centile_data : trisomy21WeightFemaleCentileData.centile_data;
        }
        if (measurementMethod === 'ofc'){
            trisomy21Data = sex==="male" ? trisomy21OFCMaleCentileData.centile_data : trisomy21OFCFemaleCentileData.centile_data;
        }
        if (measurementMethod === 'bmi'){
            if (isSDS){
                trisomy21Data = sex ==="male" ? trisomy21BMIMaleSDSData.centile_data : trisomy21BMIFemaleSDSData.centile_data;
            } else {
                trisomy21Data = sex==="male" ? trisomy21BMIMaleCentileData.centile_data : trisomy21BMIFemaleCentileData.centile_data;
            }
        }
        const blankSubSet = deepCopy(blankDataset[0]);
        return [trisomy21Data[0]['trisomy-21'][sex][measurementMethod], blankSubSet, blankSubSet, blankSubSet];
    } else if (reference === 'turner') {
        const turnerData: Reference[] = turnerHeightFemaleCentileData.centile_data
        const blankSubSet = deepCopy(blankDataset[0]);
        if (sex !== 'female' && measurementMethod !== 'height') {
            throw new Error('No centile lines have rendered, as only height data is supported for turner reference.');
        }
        return [turnerData[0]['turners-syndrome'].female.height, blankSubSet, blankSubSet, blankSubSet];
    } else if(reference === 'cdc'){
        let cdcData: Reference[]
        if (measurementMethod === 'height'){
            cdcData = sex =="male" ? cdcHeightMaleCentileData.centile_data : cdcHeightFemaleCentileData.centile_data;
            const blankSubSet = deepCopy(blankDataset[0]);
            return [cdcData[0]['cdc'][sex][measurementMethod], blankSubSet, blankSubSet, blankSubSet];
        }
    } else {
        throw new Error('No valid reference given to getRelevantDataSets');
    }
}

// main function to get best domains, fetch relevant data.
function getDomainsAndData(
    childMeasurements: Measurement[],
    sex: 'male' | 'female',
    measurementMethod: 'height' | 'weight' | 'bmi' | 'ofc',
    reference: 'uk-who' | 'trisomy-21' | 'turner',
    showCorrected: boolean,
    showChronological: boolean
) {
    // variables initialised to chart for bigger child:
    let internalChartScaleType: 'prem' | 'infant' | 'smallChild' | 'biggerChild' = 'biggerChild';
    let finalCentileData: any[] = [];
    let finalSDSData: any[] = [];
    let internalDomains: Domains;

    if (childMeasurements.length > 0) {
        const twoWeeksPostnatal = 0.038329911019849415;
        const gestWeeks37 = -0.057494866529774126;
        const gestWeeks24 = -0.306639288158795;
        let absoluteBottomX = twoWeeksPostnatal;
        const gestWeeks23 = -0.33;
        const gestWeeks22 = -0.345;
        let absoluteHighX = 20.05;
        let agePadding = totalMinPadding.biggerChild;
        if (reference === 'uk-who') {
            if (measurementMethod === 'ofc') {
                if (sex === 'female') {
                    absoluteHighX = 17.05;
                } else {
                    absoluteHighX = 18.05;
                }
            }
        }

        if (reference === 'trisomy-21') {
            absoluteBottomX = -0.01;
            if (measurementMethod === 'ofc') {
                absoluteHighX = 18.05;
            }
            if (measurementMethod === 'bmi') {
                absoluteHighX = 18.87;
            }
        }

        if (reference === 'turner') {
            absoluteBottomX = 0.99;
        }

        let lowestXForDomain = absoluteBottomX;
        let highestXForDomain = absoluteHighX;

        let lowestYFromMeasurements: null | number = null;
        let highestYFromMeasurements: null | number = null;

        const childCoordinates = childMeasurementRanges(
            childMeasurements,
            showCorrected,
            showChronological,
            sex,
            measurementMethod,
        );
        let errorFree = true;
        for (const value of Object.values(childCoordinates)) {
            if (Math.abs(value) === 500) {
                errorFree = false;
                break;
            }
        }
        if (errorFree) {
            const { lowestChildX, highestChildX, lowestChildY, highestChildY } = childCoordinates;
            
            lowestYFromMeasurements = lowestChildY;
            highestYFromMeasurements = highestChildY;
            const difference = highestChildX - lowestChildX;

            const birthGestationWeeks = childMeasurements[0].birth_data.gestation_weeks;

            // set appropriate chart scale based on data:
            if (birthGestationWeeks < 37 && highestChildX <= twoWeeksPostnatal && reference === 'uk-who') {
                // prem:
                absoluteBottomX = gestWeeks22;
                agePadding = totalMinPadding.prem;
                absoluteHighX = twoWeeksPostnatal;
                // if (measurementMethod === 'height') {
                //     absoluteBottomX = gestWeeks24;
                // }
                if (difference > totalMinPadding.prem) {
                    internalChartScaleType = 'infant';
                } else {
                    internalChartScaleType = 'prem';
                }
            } else if (highestChildX <= 2) {
                //infant:
                agePadding = totalMinPadding.infant;
                if (lowestChildX >= gestWeeks37 && lowestChildX < twoWeeksPostnatal && reference === 'uk-who') {
                    absoluteBottomX = gestWeeks37;
                } else if (lowestChildX < gestWeeks37) {
                    // absoluteBottomX = measurementMethod === 'height' ? gestWeeks24 : gestWeeks22;
                    absoluteBottomX = gestWeeks22;
                }
                if (difference > totalMinPadding.infant) {
                    internalChartScaleType = 'smallChild';
                } else {
                    internalChartScaleType = 'infant';
                }
            } else if (highestChildX <= 4) {
                // small child:
                agePadding = totalMinPadding.smallChild;
                if (difference <= totalMinPadding.smallChild) {
                    internalChartScaleType = 'smallChild';
                }
                if(lowestChildX < twoWeeksPostnatal && lowestChildX >= gestWeeks37){
                    absoluteBottomX = lowestChildX-totalMinPadding.prem;
                } else if(lowestChildX < gestWeeks37){
                    absoluteBottomX = lowestChildX-totalMinPadding.prem
                }
            } else {
                absoluteBottomX = lowestChildX-totalMinPadding.prem
            }


            // work out most appropriate highest and lowest x coords for domain setting:
            let unroundedLowestX = 0;
            let unroundedHighestX = 0;
            if (agePadding <= difference) {
                unroundedLowestX = absoluteBottomX > lowestChildX - 0.01 ? absoluteBottomX : lowestChildX - 0.01;
                unroundedHighestX = absoluteHighX < highestChildX + 0.01 ? absoluteHighX : highestChildX + 0.01;
            } else {
                const leftOverAgePadding = agePadding - difference;
                let addToHighest = 0;
                const candidateLowX = lowestChildX - leftOverAgePadding / 2;
                if (candidateLowX < absoluteBottomX) {
                    unroundedLowestX = absoluteBottomX;
                    addToHighest = absoluteBottomX - candidateLowX;
                } else {
                    unroundedLowestX = candidateLowX;
                }
                const candidateHighX = highestChildX + leftOverAgePadding / 2;
                if (candidateHighX > absoluteHighX) {
                    unroundedHighestX = absoluteHighX;
                    unroundedLowestX = unroundedLowestX - (candidateHighX - absoluteHighX);
                } else {
                    unroundedHighestX = candidateHighX + addToHighest;
                }
            }

            lowestXForDomain = unroundedLowestX;

            const xTickValues = getTickValuesForChartScaling(internalChartScaleType);


            if (lowestXForDomain !== absoluteBottomX) {
                const arrayForOrdering = [...xTickValues];
                arrayForOrdering.push(unroundedLowestX);
                arrayForOrdering.sort((a: number, b: number) => a - b);
                const lowestXIndex = arrayForOrdering.findIndex((element: number) => element === unroundedLowestX);
                lowestXForDomain = arrayForOrdering[lowestXIndex - 1] || lowestXForDomain;
            }

            highestXForDomain = unroundedHighestX;

            if (highestXForDomain !== absoluteHighX) {
                const arrayForOrdering = [...xTickValues];
                arrayForOrdering.push(unroundedHighestX);
                arrayForOrdering.sort((a: number, b: number) => a - b);
                const highestXIndex = arrayForOrdering.findIndex((element: number) => element === unroundedHighestX);
                highestXForDomain = arrayForOrdering[highestXIndex + 1] || highestXForDomain;
            }
        } else {
            let errorString = 'No valid measurements entered. Error message from the server: ';
            for (const measurement of childMeasurements) {
                if (measurement.measurement_calculated_values.corrected_measurement_error && measurement.measurement_dates.corrected_decimal_age < gestWeeks22) {
                    errorString += ` ${measurement.measurement_calculated_values.corrected_measurement_error}`;
                    throw new Error(errorString);
                }
            }
        }

        // this object keeps track of highest / lowest visible coords to use for chart scaling / labels:
        const extremeValues = makeExtremeValues();

        //removes irrelevant datasets before filtering to visible data:
        const relevantCentileDataSets = getRelevantDataSets(
            sex,
            measurementMethod,
            reference,
            lowestXForDomain,
            highestXForDomain,
            false
        );

        if (measurementMethod==="bmi" && reference !== "turner") {
            const relevantSDSDataSets = getRelevantDataSets(
                sex,
                'bmi',
                reference,
                lowestXForDomain,
                highestXForDomain,
                true
            );
            //get final sds data set for centile line render:
            for (let referenceSet of relevantSDSDataSets) {
                const truncatedSDS = truncate(referenceSet, lowestXForDomain, highestXForDomain, extremeValues);
                finalSDSData.push(truncatedSDS);
            }
        }


        //get final centile data set for centile line render:
        for (let referenceSet of relevantCentileDataSets) {
            const truncated = truncate(referenceSet, lowestXForDomain, highestXForDomain, extremeValues);
            finalCentileData.push(truncated);
        }

        const lowestDataY = extremeValues.lowestY;
        const highestDataY = extremeValues.highestY;
        let prePaddingLowestY = lowestDataY;
        let prePaddingHighestY = highestDataY;

        // decide if measurement or centile band highest and lowest y:
        // lowest y
        if (childMeasurements.length > 0 && lowestYFromMeasurements !== null) {
            prePaddingLowestY = lowestYFromMeasurements < lowestDataY ? lowestYFromMeasurements : lowestDataY;
        }

        // highest y
        if (childMeasurements.length > 0 && highestYFromMeasurements !== null) {
            prePaddingHighestY = highestYFromMeasurements > highestDataY ? highestYFromMeasurements : highestDataY;
        }

        // to give a bit of space in vertical axis:
        const candidatefinalLowestY = prePaddingLowestY - (prePaddingHighestY - prePaddingLowestY) * 0.07;
        const finalLowestY = candidatefinalLowestY < 0 ? 0 : candidatefinalLowestY;
        const finalHighestY = prePaddingHighestY + (prePaddingHighestY - prePaddingLowestY) * 0.06;

        internalDomains = {
            x: [lowestXForDomain, highestXForDomain],
            y: [finalLowestY, finalHighestY],
        };
    } else {
        internalDomains = makeDefaultDomains(sex, reference, measurementMethod);
        finalCentileData = getRelevantDataSets(
            sex,
            measurementMethod,
            reference,
            internalDomains.x[0],
            internalDomains.x[1],
            false
        );
        finalSDSData = getRelevantDataSets(
            sex,
            measurementMethod,
            reference,
            internalDomains.x[0],
            internalDomains.x[1],
            true
        );
    }

    return {
        bmiSDSData: finalSDSData,
        centileData: finalCentileData,
        computedDomains: internalDomains,
        chartScaleType: internalChartScaleType
    };
}

function getVisibleData(
    sex: 'male' | 'female',
    measurementMethod: 'height' | 'weight' | 'bmi' | 'ofc',
    reference: 'uk-who' | 'trisomy-21' | 'turner',
    domains: any,
) {
    if (!domains) {
        return null;
    }
    let chartScaleType: 'prem' | 'infant' | 'smallChild' | 'biggerChild' = 'biggerChild';
    const lowestX = domains.x[0];
    const highestX = domains.x[1];
    const xDifference = highestX - lowestX;
    switch (true) {
        case xDifference <= totalMinPadding.prem:
            chartScaleType = 'prem';
            break;
            case xDifference <= totalMinPadding.infant:
                chartScaleType = 'infant';
                break;
                case xDifference <= totalMinPadding.smallChild:
                    chartScaleType = 'smallChild';
            break;
    }
    const relevantCentileDataSets = getRelevantDataSets(sex, measurementMethod, reference, lowestX, highestX, false);
    const relevantSDSDataSets = getRelevantDataSets(sex, measurementMethod, reference, lowestX, highestX, true);
    let centileData = [];
    let sdsData = [];
    for (let referenceSet of relevantCentileDataSets) {
        const truncated = truncate(referenceSet, lowestX, highestX);
        centileData.push(truncated);
    }
    for (let referenceSet of relevantSDSDataSets) {
        const truncated = truncate(referenceSet, lowestX, highestX);
        sdsData.push(truncated);
    }
    return { chartScaleType, centileData, sdsData };
}

export const delayedPubertyData = {
    male:  ukwhoHeightMaleCentileData.centile_data[3].uk90_child.male.height[0].data, //ukwhoData.uk90_child.male.height[0].data,
    female: ukwhoHeightFemaleCentileData.centile_data[3].uk90_child.female.height[0].data //ukwhoData.uk90_child.female.height[0].data,
};


export { getVisibleData, getDomainsAndData };
