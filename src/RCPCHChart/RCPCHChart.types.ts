import { Measurement } from '../interfaces/RCPCHMeasurementObject';
import { MidParentalHeightObject } from '../interfaces/MidParentalHeightObject';
import { AxisStyle, CentileStyle, ChartStyle, GridlineStyle, MeasurementStyle } from '../interfaces/StyleObjects';

export interface RCPCHChartProps {
    title: string;
    subtitle: string;
    measurementMethod: 'height' | 'weight' | 'ofc' | 'bmi';
    sex: 'male' | 'female';
    measurementsArray: Measurement[];
    midParentalHeightData?: MidParentalHeightObject;
    reference: 'uk-who' | 'turner' | 'trisomy-21';
    enableZoom?: boolean;
    chartStyle?: ChartStyle;
    axisStyle?: AxisStyle;
    gridlineStyle?: GridlineStyle;
    centileStyle?: CentileStyle;
    measurementStyle?: MeasurementStyle;
}
