import { ClientMeasurementObject } from '../interfaces/ClientMeasurementObject';
import { MidParentalHeightObject } from '../interfaces/MidParentalHeightObject';
export interface SDSChartProps {
    reference: 'uk-who' | 'turner' | 'trisomy-21';
    title: string;
    subtitle: string;
    measurementMethod: 'height' | 'weight' | 'ofc' | 'bmi';
    childMeasurements: ClientMeasurementObject;
    midParentalHeightData: MidParentalHeightObject;
    sex: 'male' | 'female';
    enableZoom: boolean;
    styles: { [key: string]: any };
    enableExport: boolean;
    exportChartCallback(svg: any);
}
