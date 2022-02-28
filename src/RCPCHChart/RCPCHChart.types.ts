import { Measurement } from '../interfaces/RCPCHMeasurementObject';
import { MidParentalHeightObject } from '../interfaces/MidParentalHeightObject';
import { AxisStyle, CentileStyle, ChartStyle, GridlineStyle, MeasurementStyle } from '../interfaces/StyleObjects';

export interface RCPCHChartProps {
    title: string;
    subtitle: string;
    measurementMethod: 'height' | 'weight' | 'ofc' | 'bmi';
    reference: 'uk-who' | 'turner' | 'trisomy-21';
    sex: 'male' | 'female';
    measurementsArray: Measurement[];
    midParentalHeightData?: MidParentalHeightObject;
    enableZoom?: boolean;
    chartStyle?: ChartStyle;
    axisStyle?: AxisStyle;
    gridlineStyle?: GridlineStyle;
    centileStyle?: CentileStyle;
    measurementStyle?: MeasurementStyle;
    chartType?: 'centile' | 'sds';
    enableExport: boolean;
    exportChartCallback(svg: any);
}