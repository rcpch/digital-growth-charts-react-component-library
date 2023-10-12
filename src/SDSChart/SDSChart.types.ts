import { ClientMeasurementObject } from '../interfaces/ClientMeasurementObject';
import { ClientStyle } from '../interfaces/ClientStyleObjects';
import { MidParentalHeightObject } from '../interfaces/MidParentalHeightObject';
export interface SDSChartProps {
    chartsVersion: string;
    reference: 'uk-who' | 'turner' | 'trisomy-21';
    title: string;
    subtitle: string;
    measurementMethod: 'height' | 'weight' | 'ofc' | 'bmi';
    childMeasurements: ClientMeasurementObject | undefined;
    midParentalHeightData?: MidParentalHeightObject | undefined;
    sex: 'male' | 'female';
    enableZoom: boolean;
    styles: { [key: string]: any };
    enableExport: boolean;
    exportChartCallback(svg: any): any;
    clinicianFocus?: boolean | undefined | null;
}
