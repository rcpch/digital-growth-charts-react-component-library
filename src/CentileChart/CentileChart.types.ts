import { Measurement } from '../interfaces/RCPCHMeasurementObject';
import { MidParentalHeightObject } from '../interfaces/MidParentalHeightObject';

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
    chartsVersion?: string;
    reference: 'uk-who' | 'turner' | 'trisomy-21' | 'cdc';
    title: string;
    subtitle: string;
    measurementMethod: 'height' | 'weight' | 'ofc' | 'bmi';
    sex: 'male' | 'female';
    childMeasurements: Measurement[];
    midParentalHeightData?: MidParentalHeightObject | null;
    enableZoom?: boolean;
    styles: { [key: string]: any };
    enableExport?: boolean;
    exportChartCallback(svg: any): any;
    clinicianFocus?: boolean | undefined | null;
}
