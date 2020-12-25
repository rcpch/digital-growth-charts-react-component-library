import { PlottableMeasurement } from '../interfaces/RCPCHMeasurementObject';

// Generated with util/create-component.js
export interface TURNERChartProps {
    title: string,
    subtitle: string,
    allMeasurementPairs: [PlottableMeasurement][],
    allSDSMeasurementPairs: [PlottableMeasurement][],
    measurementMethod: 'height' | 'weight' | 'ofc' | 'bmi',
    sex: 'male' | 'female',
    width: number,
    height: number,
    measurementDataPointColour: string,
    centileColour: string,
    chartBackground: string
}
