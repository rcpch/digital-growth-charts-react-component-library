import { Measurement } from '../interfaces/RCPCHMeasurementObject';
import { ICentile } from '../interfaces/CentilesObject';
import { ChartStyle, AxisStyle, GridlineStyle, MeasurementStyle, CentileStyle } from '../interfaces/StyleObjects';

export type ComputedData = {
    centileData: null | any[];
    maxDomains: any;
    computedDomains: any;
    chartScaleType: 'prem' | 'infant' | 'smallChild' | 'biggerChild';
    pointsForCentileLabels: { x: number; y: number; centile: string }[];
    updateCentileData: boolean;
};

export type Results = {
    centileData: null | any[];
    computedDomains: any;
    maxDomains: any;
    chartScaleType: 'prem' | 'infant' | 'smallChild' | 'biggerChild';
    pointsForCentileLabels: { x: number; y: number; centile: string }[];
};
export interface CentileChartProps {
    reference: 'uk-who' | 'turner' | 'trisomy-21';
    title: string;
    subtitle: string;
    measurementMethod: 'height' | 'weight' | 'ofc' | 'bmi';
    sex: 'male' | 'female';
    childMeasurements: Measurement[];
    enableZoom: boolean;
    chartStyle: ChartStyle;
    axisStyle?: AxisStyle;
    gridlineStyle?: GridlineStyle;
    centileStyle?: CentileStyle;
    measurementStyle?: MeasurementStyle;
}
