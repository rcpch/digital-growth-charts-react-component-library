import ukwhoData from '../../chartData/uk_who_chart_data';
import turnerData from '../../chartData/turners_chart_data';
import trisomy21Data from '../../chartData/trisomy21Data';

import totalMinPadding from './totalMinPadding';
import { getTickValuesForChartScaling } from './tailoredXTickValues';
import { Measurement } from '../interfaces/RCPCHMeasurementObject';
import { Domains } from '../interfaces/Domains';

import { IPlottedCentileMeasurement } from '../interfaces/CentilesObject';

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

// analyses whole child measurement array to work out top and bottom x and y
function childMeasurementRanges(childMeasurements: Measurement[], showCorrected: boolean, showChronological: boolean) {
    let highestChildX = -500;
    let lowestChildX = 500;
    let highestChildY = -500;
    let lowestChildY = 500;
    let gestationInDays: null | number = null;
    let dateOfBirth: null | string = null;
    let sex: null | string = null;
    for (let measurement of childMeasurements) {
        if (!measurement.plottable_data) {
            throw new Error('No plottable data found. Are you using the correct server version?');
        }
        const tempGestDays = measurement.birth_data.gestation_weeks * 7 + measurement.birth_data.gestation_days;
        if (gestationInDays === null) {
            gestationInDays = tempGestDays;
        } else if (gestationInDays !== tempGestDays) {
            throw new Error(
                'Measurement entries with different gestations detected. Measurements from only one patient at one time are supported',
            );
        }
        const tempDob = measurement.birth_data.birth_date;
        if (dateOfBirth === null) {
            dateOfBirth = tempDob;
        } else if (dateOfBirth !== tempDob) {
            throw new Error(
                'Measurement entries with different date of births detected. Measurements from only one patient at one time are supported',
            );
        }
        const tempSex = measurement.birth_data.sex;
        if (sex === null) {
            sex = tempSex;
        } else if (sex !== tempSex) {
            throw new Error(
                'Measurement entries with different sexes detected. Measurements from only one patient at one time are supported',
            );
        }
        let correctedX = measurement.plottable_data.centile_data.corrected_decimal_age_data.x;
        let chronologicalX = measurement.plottable_data.centile_data.chronological_decimal_age_data.x;
        let correctedY = measurement.plottable_data.centile_data.corrected_decimal_age_data.y;
        let chronologicalY = measurement.plottable_data.centile_data.chronological_decimal_age_data.y;
        const errorsPresent = measurement.measurement_calculated_values.chronological_measurement_error ? true : false;
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
        }
    }
    return { lowestChildX, highestChildX, lowestChildY, highestChildY };
}

// keep track of top and bottom values in visible area:

function makeExtremeValues(native: boolean): ExtremeValues {
    const values = {
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
    return values;
}

// generate objects to plot centile labels in react native:

function makeCentileLabels(
    extremeValues: ExtremeValues,
    lowestXForDomain: number,
    highestXForDomain: number,
    internalChartScaleType: 'prem' | 'infant' | 'smallChild' | 'biggerChild',
) {
    const pointsForCentileLabels = [];
    if (internalChartScaleType === 'prem' && extremeValues.lowestYForX) {
        for (const [key, miniObject] of Object.entries(extremeValues.lowestYForX)) {
            pointsForCentileLabels.push({
                x: lowestXForDomain,
                centile: key,
                y: miniObject.value,
            });
        }
    } else if (extremeValues.highestYForX) {
        for (const [key, miniObject] of Object.entries(extremeValues.highestYForX)) {
            pointsForCentileLabels.push({
                x: highestXForDomain,
                centile: key,
                y: miniObject.value,
            });
        }
    }
    return pointsForCentileLabels;
}

/* update highest / lowest values in visible data set for labels / setting up best y domains. This is run in the filter
 data loops, so that only one run of looping required:
*/
function updateCoordsOfExtremeValues(
    extremeValues: any,
    centileString: string,
    d: IPlottedCentileMeasurement,
    native = true,
): void {
    // transition points can lead to inaccurate coords for centile labels, therefore don't include 2 or 4 years old
    if (d.x !== 4 && d.x !== 2) {
        if (extremeValues.lowestY > d.y) {
            extremeValues.lowestY = d.y;
        }

        if (extremeValues.highestY < d.y) {
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
    native?: boolean,
) {
    const filtered = data.filter(
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
    return filtered;
}

// loops through data sets with filterData function:
function truncate(rawDataSet: any[], lowerX: number, upperX: number, extremeValues?: any, native?: boolean) {
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
) {
    const blankDataset = [
        [
            { centile: 0.4, data: [], sds: -2.67 },
            { centile: 2, data: [], sds: -2 },
            { centile: 9, data: [], sds: -1.33 },
            { centile: 25, data: [], sds: -0.67 },
            { centile: 50, data: [], sds: 0 },
            { centile: 75, data: [], sds: 0.67 },
            { centile: 91, data: [], sds: 1.33 },
            { centile: 98, data: [], sds: 2 },
            { centile: 99.6, data: [], sds: 2.67 },
        ],
        [
            { centile: 0.4, data: [], sds: -2.67 },
            { centile: 2, data: [], sds: -2 },
            { centile: 9, data: [], sds: -1.33 },
            { centile: 25, data: [], sds: -0.67 },
            { centile: 50, data: [], sds: 0 },
            { centile: 75, data: [], sds: 0.67 },
            { centile: 91, data: [], sds: 1.33 },
            { centile: 98, data: [], sds: 2 },
            { centile: 99.6, data: [], sds: 2.67 },
        ],
        [
            { centile: 0.4, data: [], sds: -2.67 },
            { centile: 2, data: [], sds: -2 },
            { centile: 9, data: [], sds: -1.33 },
            { centile: 25, data: [], sds: -0.67 },
            { centile: 50, data: [], sds: 0 },
            { centile: 75, data: [], sds: 0.67 },
            { centile: 91, data: [], sds: 1.33 },
            { centile: 98, data: [], sds: 2 },
            { centile: 99.6, data: [], sds: 2.67 },
        ],
        [
            { centile: 0.4, data: [], sds: -2.67 },
            { centile: 2, data: [], sds: -2 },
            { centile: 9, data: [], sds: -1.33 },
            { centile: 25, data: [], sds: -0.67 },
            { centile: 50, data: [], sds: 0 },
            { centile: 75, data: [], sds: 0.67 },
            { centile: 91, data: [], sds: 1.33 },
            { centile: 98, data: [], sds: 2 },
            { centile: 99.6, data: [], sds: 2.67 },
        ],
    ];
    if (reference === 'uk-who') {
        const dataSetRanges = [
            [-0.33, 0.0383],
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
            ukwhoData.uk90_preterm[sex][measurementMethod],
            ukwhoData.uk_who_infant[sex][measurementMethod],
            ukwhoData.uk_who_child[sex][measurementMethod],
            ukwhoData.uk90_child[sex][measurementMethod],
        ];
        if (startingGroup === 0 && endingGroup === 3) {
            return allData;
        } else {
            let returnArray = blankDataset;
            for (let i = startingGroup; i <= endingGroup; i++) {
                returnArray.splice(i, 1, allData[i]);
            }
            return returnArray;
        }
    } else if (reference === 'trisomy-21') {
        return [trisomy21Data.trisomy21[sex][measurementMethod], blankDataset[0], blankDataset[1], blankDataset[2]];
    } else if (reference === 'turner') {
        if (sex !== 'female' && measurementMethod !== 'height') {
            throw new Error('getRelevantDataSets cannot fetch anything other than height data for turner');
        }
        return [turnerData.turner.female.height, blankDataset[0], blankDataset[1], blankDataset[2]];
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
    showChronological: boolean,
    native = true,
) {
    // variables initialised to chart for bigger child:
    let internalChartScaleType: 'prem' | 'infant' | 'smallChild' | 'biggerChild' = 'biggerChild';
    const twoWeeksPostnatal = 0.038329911019849415;
    const gestWeeks37 = -0.057494866529774126;
    const gestWeeks24 = -0.306639288158795;
    const gestWeeks22 = -0.33;
    let absoluteBottomX = twoWeeksPostnatal;
    let absoluteHighX = 20.05;
    let agePadding = totalMinPadding.biggerChild;

    let finalCentileData: any[] = [];
    let internalDomains: Domains;
    let pointsForCentileLabels: any[] = [];

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
        absoluteBottomX = 0.97;
    }

    let lowestXForDomain = absoluteBottomX;
    let highestXForDomain = absoluteHighX;

    let lowestYFromMeasurements: null | number = null;
    let highestYFromMeasurements: null | number = null;

    if (childMeasurements.length > 0) {
        const childCoordinates = childMeasurementRanges(childMeasurements, showCorrected, showChronological);
        let setDomainsOnMeasurementValues = true;
        for (const value of Object.values(childCoordinates)) {
            if (Math.abs(value) === 500) {
                setDomainsOnMeasurementValues = false;
                break;
            }
        }
        if (setDomainsOnMeasurementValues) {
            const { lowestChildX, highestChildX, lowestChildY, highestChildY } = childCoordinates;
            lowestYFromMeasurements = lowestChildY;
            highestYFromMeasurements = highestChildY;
            const difference = highestChildX - lowestChildX;

            const birthGestationWeeks = childMeasurements[0].birth_data.gestation_weeks;

            // set appropriate chart scale based on data:
            if (birthGestationWeeks < 37 && highestChildX <= twoWeeksPostnatal) {
                // prem:
                absoluteBottomX = gestWeeks22;
                agePadding = totalMinPadding.prem;
                absoluteHighX = twoWeeksPostnatal;
                if (measurementMethod === 'height') {
                    absoluteBottomX = gestWeeks24;
                }
                if (difference > totalMinPadding.prem) {
                    internalChartScaleType = 'infant';
                } else {
                    internalChartScaleType = 'prem';
                }
            } else if (highestChildX <= 1) {
                //infant:
                agePadding = totalMinPadding.infant;
                if (lowestChildX >= gestWeeks37 && lowestChildX < twoWeeksPostnatal) {
                    absoluteBottomX = gestWeeks37;
                } else if (lowestChildX < gestWeeks37) {
                    absoluteBottomX = measurementMethod === 'height' ? gestWeeks24 : gestWeeks22;
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
            }

            // work out most appropriate highest and lowest x coords for domain setting:
            let unroundedLowestX = 0;
            let unroundedHighestX = 0;
            if (agePadding <= difference) {
                // add padding:
                unroundedLowestX = absoluteBottomX > lowestChildX * 0.99 ? absoluteBottomX : lowestChildX * 0.99;
                unroundedHighestX = absoluteHighX < highestChildX * 1.01 ? absoluteHighX : highestChildX * 1.01;
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
                let arrayForOrdering = xTickValues.map((element: number) => element);
                arrayForOrdering.push(unroundedLowestX);
                arrayForOrdering.sort((a: number, b: number) => a - b);
                const lowestXIndex = arrayForOrdering.findIndex((element: number) => element === unroundedLowestX);
                lowestXForDomain = arrayForOrdering[lowestXIndex - 1] || lowestXForDomain;
            }

            highestXForDomain = unroundedHighestX;

            if (highestXForDomain !== absoluteHighX) {
                let arrayForOrdering = xTickValues.map((element: number) => element);
                arrayForOrdering.push(unroundedHighestX);
                arrayForOrdering.sort((a: number, b: number) => a - b);
                const highestXIndex = arrayForOrdering.findIndex((element: number) => element === unroundedHighestX);
                highestXForDomain = arrayForOrdering[highestXIndex + 1] || highestXForDomain;
            }
        }
    }

    // this object keeps track of highest / lowest visible coords to use for chart scaling / labels:
    const extremeValues = makeExtremeValues(native);

    //removes irrelevant datasets before filtering to visible data:
    const relevantDataSets = getRelevantDataSets(
        sex,
        measurementMethod,
        reference,
        lowestXForDomain,
        highestXForDomain,
    );

    //get final centile data set for centile line render:
    for (let referenceSet of relevantDataSets) {
        const truncated = truncate(referenceSet, lowestXForDomain, highestXForDomain, extremeValues, native);
        finalCentileData.push(truncated);
    }

    const lowestDataY = extremeValues.lowestY;
    const highestDataY = extremeValues.highestY;

    // decide if measurement or centile band highest and lowest y:
    let prePaddingLowestY = lowestDataY;
    if (childMeasurements.length > 0 && lowestYFromMeasurements !== null) {
        prePaddingLowestY = lowestYFromMeasurements < lowestDataY ? lowestYFromMeasurements : lowestDataY;
    }

    let prePaddingHighestY = highestDataY;
    if (childMeasurements.length > 0 && highestYFromMeasurements !== null) {
        prePaddingHighestY = highestYFromMeasurements > highestDataY ? highestYFromMeasurements : highestDataY;
    }

    // to give a bit of space in vertical axis:
    const candidatefinalLowestY = prePaddingLowestY - (prePaddingHighestY - prePaddingLowestY) * 0.06;
    const finalLowestY = candidatefinalLowestY < 0 ? 0 : candidatefinalLowestY;
    const finalHighestY = prePaddingHighestY + (prePaddingHighestY - prePaddingLowestY) * 0.06;

    internalDomains = {
        x: [lowestXForDomain, highestXForDomain],
        y: [finalLowestY, finalHighestY],
    };

    let highestPossibleDataY = 400;
    switch (measurementMethod) {
        case 'weight':
            highestPossibleDataY = 120;
            break;
        case 'bmi':
            highestPossibleDataY = 40;
            break;
        case 'ofc':
            highestPossibleDataY = 65;
            break;
        case 'height':
            highestPossibleDataY = 210;
            break;
        default:
            console.error('getDomainsAndData did not pick up a valid measurementMethod for axis scaling');
    }

    const maxDomains = {
        x: [absoluteBottomX, absoluteHighX],
        y: [0, highestPossibleDataY > highestYFromMeasurements ? highestPossibleDataY : highestYFromMeasurements],
    };

    if (native) {
        pointsForCentileLabels = makeCentileLabels(
            extremeValues,
            lowestXForDomain,
            highestXForDomain,
            internalChartScaleType,
        );
    }

    return {
        centileData: finalCentileData,
        computedDomains: internalDomains,
        maxDomains: maxDomains,
        chartScaleType: internalChartScaleType,
        pointsForCentileLabels: pointsForCentileLabels,
    };
}

function getVisibleData(
    sex: 'male' | 'female',
    measurementMethod: 'height' | 'weight' | 'bmi' | 'ofc',
    reference: 'uk-who' | 'trisomy-21' | 'turner',
    domains: any,
    native: boolean,
) {
    if (!domains) {
        return null;
    }
    let chartScaleType: 'prem' | 'infant' | 'smallChild' | 'biggerChild' = 'biggerChild';
    let pointsForCentileLabels = [];
    const extremeValues = native ? makeExtremeValues(native) : null;
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
    const relevantDataSets = getRelevantDataSets(sex, measurementMethod, reference, lowestX, highestX);
    let centileData = [];
    for (let referenceSet of relevantDataSets) {
        const truncated = truncate(referenceSet, lowestX, highestX, extremeValues, native);
        centileData.push(truncated);
    }
    if (native && extremeValues) {
        let internalChartScaleType = chartScaleType;
        if (highestX > 0.038329911019849415 && chartScaleType === 'prem') {
            internalChartScaleType = 'infant';
        }
        pointsForCentileLabels = makeCentileLabels(extremeValues, lowestX, highestX, internalChartScaleType);
    }
    return { chartScaleType, centileData, pointsForCentileLabels };
}

export const delayedPubertyData = {
    male: ukwhoData.uk90_child.male.height[0].data,
    female: ukwhoData.uk90_child.female.height[0].data,
};

export default getDomainsAndData;
export { getVisibleData };
