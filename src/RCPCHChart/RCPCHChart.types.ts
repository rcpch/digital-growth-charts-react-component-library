import { Measurement } from '../interfaces/RCPCHMeasurementObject';
import { MidParentalHeightObject } from '../interfaces/MidParentalHeightObject';
import { AxisStyle, CentileStyle, ChartStyle, GridlineStyle, MeasurementStyle, ReferenceStyle, SDSStyle } from '../interfaces/StyleObjects';
import { ClientMeasurementObject } from '../interfaces/ClientMeasurementObject';

export interface RCPCHChartProps {
    title: string; 
    measurementMethod: 'height' | 'weight' | 'ofc' | 'bmi';
    reference: 'uk-who' | 'turner' | 'trisomy-21' | 'cdc';
    sex: 'male' | 'female';
    measurements: ClientMeasurementObject;
    midParentalHeightData?: MidParentalHeightObject | undefined;
    enableZoom?: boolean;
    chartType?: 'centile' | 'sds';
    enableExport?: boolean | undefined;
    exportChartCallback(svg?: any): any;
    clinicianFocus?: boolean | undefined | null;
    theme?: 'monochrome' | 'traditional' | 'tanner1' | 'tanner2' | 'tanner3' | 'custom';
    height?: number
    width?: number
    logoVariant?: 'top' | 'bottom' | 'legend';
    customThemeStyles?: {
        chartStyle?: ChartStyle 
        axisStyle?: AxisStyle
        gridlineStyle?: GridlineStyle
        measurementStyle?: MeasurementStyle
        centileStyle?: CentileStyle
        sdsStyle?: SDSStyle
        referenceStyle?: ReferenceStyle
    } // individual styles to override in each theme. If 'custom' theme is selected, 'monochrome' styles are defaulted and styles passed here override them 
}