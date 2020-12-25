import { PlottableMeasurement } from '../interfaces/RCPCHMeasurementObject';


export interface TRISOMY21ChartProps {
    title: string,
    subtitle: string,
    allMeasurementPairs: [PlottableMeasurement][]
    allSDSMeasurementPairs: []
    measurementMethod: 'height' | 'weight' | 'ofc' | 'bmi',
    sex: 'male' | 'female',
    width: number,
    height: number,
    measurementDataPointColour: string,
    centileColour: string,
    chartBackground: string
}
