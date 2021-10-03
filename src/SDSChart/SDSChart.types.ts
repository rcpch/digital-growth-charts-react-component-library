import { ClientMeasurementObject } from '../interfaces/ClientMeasurementObject';
import { MidParentalHeightObject } from '../interfaces/MidParentalHeightObject';
export interface SDSChartProps {
    reference: 'uk-who' | 'turner' | 'trisomy-21';
    title: string;
    subtitle: string;
    sex: 'male' | 'female';
    childMeasurements: ClientMeasurementObject;
    midParentalHeightData: MidParentalHeightObject;
    enableZoom: boolean;
    styles: { [key: string]: any };
}
