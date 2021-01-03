import { PlottableMeasurement } from '../interfaces/RCPCHMeasurementObject';

// Generated with util/create-component.js
export interface TURNERChartProps {
    title: string,
    subtitle: string,
    measurementMethod: 'height' | 'weight' | 'ofc' | 'bmi',
    sex: 'male' | 'female',
    allMeasurementPairs: []
    chartBackground: string,
    gridlineStroke: string,
    gridlineStrokeWidth: number,
    gridlineDashed: boolean,
    gridlines: boolean,
    centileStroke: string,
    centileStrokeWidth: number,
    axisStroke: string,
    axisLabelFont: string,
    axisLabelColour: string,
    measurementFill: string,
    measurementSize: number,
    measurementShape: 'circle' | 'square' | 'star' | 'diamond' | 'triangleUp' | 'triangleDown'
}
