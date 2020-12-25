// Generated with util/create-component.js
import { PlottableMeasurement } from '../interfaces/RCPCHMeasurementObject'

export interface RCPCHChartProps {
    title: string,
    subtitle: string,
    measurementMethod: 'height' | 'weight' | 'ofc' | 'bmi',
    sex: 'male' | 'female',
    measurementsArray: [PlottableMeasurement][],
    measurementsSDSArray: [PlottableMeasurement][],
    reference: 'uk-who' | 'turner' | 'trisomy-21',
    width: number,
    height: number,
    measurementDataPointColour: string,
    centileColour: string,
    chartBackground: string
}
