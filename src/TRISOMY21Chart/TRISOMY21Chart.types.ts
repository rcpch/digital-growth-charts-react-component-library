import { AxisStyle, CentileStyle, ChartStyle, GridlineStyle, MeasurementStyle } from "../interfaces/StyleObjects";
import { Domains } from '../interfaces/Domains';
export interface TRISOMY21ChartProps {
    title: string,
    subtitle: string,
    measurementMethod: 'height' | 'weight' | 'ofc' | 'bmi',
    sex: 'male' | 'female',
    allMeasurementPairs: []
    chartBackground?: string,
    gridlineStroke?: string,
    gridlineStrokeWidth?: number,
    gridlineDashed?: boolean,
    gridlines?: boolean,
    centileStroke?: string,
    centileStrokeWidth?: number,
    axisStroke?: string,
    axisLabelFont?: string,
    axisLabelColour?: string,
    measurementFill?: string,
    measurementSize?: number,
    measurementShape?: 'circle' | 'cross' | 'triangleUp' | 'triangleDown' | 'square' | 'star' | 'diamond'
}

