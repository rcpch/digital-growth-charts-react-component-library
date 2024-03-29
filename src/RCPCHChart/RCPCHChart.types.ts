import { Measurement } from '../interfaces/RCPCHMeasurementObject';
import { MidParentalHeightObject } from '../interfaces/MidParentalHeightObject';
import { AxisStyle, CentileStyle, ChartStyle, GridlineStyle, MeasurementStyle, SDSStyle } from '../interfaces/StyleObjects';

export interface RCPCHChartProps {
    title: string; // DEPRECATE - SET TO `reference - measurementMethod`
    subtitle: string;
    measurementMethod: 'height' | 'weight' | 'ofc' | 'bmi';
    reference: 'uk-who' | 'turner' | 'trisomy-21';
    sex: 'male' | 'female';
    measurementsArray: Measurement[];
    midParentalHeightData?: MidParentalHeightObject | undefined;
    enableZoom?: boolean;
    chartStyle?: ChartStyle;  //DEPRECATE - replace with theme prop
    axisStyle?: AxisStyle;  //DEPRECATE - replace with theme prop
    gridlineStyle?: GridlineStyle;  //DEPRECATE - replace with theme prop
    centileStyle?: CentileStyle;  //DEPRECATE - replace with theme prop
    sdsStyle?: SDSStyle;  //DEPRECATE - replace with theme prop
    measurementStyle?: MeasurementStyle;  //DEPRECATE - replace with theme prop
    chartType?: 'centile' | 'sds';
    enableExport?: boolean | undefined;
    exportChartCallback(svg?: any): any;
    clinicianFocus?: boolean | undefined | null;
    // theme?: 'monochrome' | 'traditional' | 'tanner1' | 'tanner2' | 'tanner3' | 'custom'
    // themeStyles?: {} // styles to override. If 'custom' theme is selected, 'monochrome' styles are defaulted and styles passed here override them 
}