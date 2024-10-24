import { ClientMeasurementObject } from '../interfaces/ClientMeasurementObject';
import { nameForMeasurementMethod } from './nameForMeasurementMethod';
import { symbolForMeasurementType } from './symbolForMeasurementType';
import { VictoryLegendDatum } from '../interfaces/VictoryLegendData';

export const selectedMeasurementMethods = (
    childMeasurements: ClientMeasurementObject,
    styles: { [key: string]: any },
) => {
    const finalList: VictoryLegendDatum[] = [];
    if (childMeasurements.height.length > 0) {
        const symbol = symbolForMeasurementType('height');
        const name = nameForMeasurementMethod('height');

        finalList.push({
            name: name,
            symbol: {
                fill: styles.heightSDS.data.stroke,
                type: symbol,
            },
            labels: {
                size: 8,
            },
        });
    }
    if (childMeasurements.weight.length > 0) {
        const symbol = symbolForMeasurementType('weight');
        const name = nameForMeasurementMethod('weight');
        finalList.push({
            name: name,
            symbol: {
                fill: styles.weightSDS.data.stroke,
                type: symbol,
            },
            labels: {
                size: 8,
            },
        });
    }
    if (childMeasurements.bmi.length > 0) {
        const symbol = symbolForMeasurementType('bmi');
        const name = nameForMeasurementMethod('bmi');
        finalList.push({
            name: name,
            symbol: {
                fill: styles.bmiSDS.data.stroke,
                type: symbol,
            },
            labels: {
                size: 8,
            },
        });
    }
    if (childMeasurements.ofc.length > 0) {
        const symbol = symbolForMeasurementType('ofc');
        const name = nameForMeasurementMethod('ofc');
        finalList.push({
            name: name,
            symbol: {
                fill: styles.ofcSDS.data.stroke,
                type: symbol,
            },
            labels: {
                size: 8,
            },
        });
    }

    return finalList;
};
