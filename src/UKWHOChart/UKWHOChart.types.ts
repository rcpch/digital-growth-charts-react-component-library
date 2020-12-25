import { PlottableMeasurement } from '../interfaces/RCPCHMeasurementObject'

export interface UKWHOChartProps {
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
