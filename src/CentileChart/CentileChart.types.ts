import { Measurement } from '../interfaces/RCPCHMeasurementObject';
import { ICentile } from '../interfaces/CentilesObject';
import { ChartStyle, AxisStyle, GridlineStyle, MeasurementStyle, CentileStyle } from '../interfaces/StyleObjects';
import { Domains } from '../interfaces/Domains';

export interface CentileChartProps {
    reference: 'uk-who' | 'turner' | 'trisomy-21';
    title: string;
    subtitle: string;
    measurementMethod: 'height' | 'weight' | 'ofc' | 'bmi';
    sex: 'male' | 'female';
    childMeasurements: Measurement[];
    chartStyle: ChartStyle;
    axisStyle?: AxisStyle;
    gridlineStyle?: GridlineStyle;
    centileStyle?: CentileStyle;
    measurementStyle?: MeasurementStyle;
}

export type ComputedData = {
    centileData: null | any[];
    domains: null | Domains;
    chartScaleType: 'prem' | 'infant' | 'smallChild' | 'biggerChild';
    pointsForCentileLabels: { x: number; y: number; centile: string }[];
};
