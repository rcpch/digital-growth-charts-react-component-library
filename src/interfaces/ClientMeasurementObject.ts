import { Measurement } from './RCPCHMeasurementObject';

export interface ClientMeasurementObject {
    height?: Measurement[];
    weight?: Measurement[];
    bmi?: Measurement[];
    ofc?: Measurement[];
}
