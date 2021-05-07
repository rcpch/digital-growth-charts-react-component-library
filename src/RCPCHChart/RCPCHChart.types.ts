import { Measurement } from '../interfaces/RCPCHMeasurementObject';
import { AxisStyle, CentileStyle, ChartStyle, GridlineStyle, MeasurementStyle } from '../interfaces/StyleObjects';

export interface RCPCHChartProps {
    title: string;
    subtitle: string;
    measurementMethod: 'height' | 'weight' | 'ofc' | 'bmi';
    sex: 'male' | 'female';
    measurementsArray: Measurement[];
    reference: 'uk-who' | 'turner' | 'trisomy-21';
    enableZoom?: boolean;
    chartStyle?: ChartStyle;
    axisStyle?: AxisStyle;
    gridlineStyle?: GridlineStyle;
    centileStyle?: CentileStyle;
    measurementStyle?: MeasurementStyle;
}
