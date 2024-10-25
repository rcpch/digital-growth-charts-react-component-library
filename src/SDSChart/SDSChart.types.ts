import { ClientMeasurementObject } from '../interfaces/ClientMeasurementObject';
import { MidParentalHeightObject } from '../interfaces/MidParentalHeightObject';
export interface SDSChartProps {
    chartsVersion: string;
    reference: 'uk-who' | 'turner' | 'trisomy-21' | 'cdc';
    title: string;
    subtitle: string;
    measurementMethod: 'height' | 'weight' | 'ofc' | 'bmi';
    childMeasurements: ClientMeasurementObject | undefined;
    midParentalHeightData?: MidParentalHeightObject | undefined;
    sex: 'male' | 'female';
    enableZoom: boolean;
    styles: { [key: string]: any };
    height?: number;
    width?: number;
    textScaleFactor?: number;
    enableExport: boolean;
    exportChartCallback(svg: any): any;
    clinicianFocus?: boolean | undefined | null;
}
