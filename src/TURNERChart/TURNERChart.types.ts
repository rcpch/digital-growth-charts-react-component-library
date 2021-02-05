import { AxisStyle, CentileStyle, ChartStyle, GridlineStyle, MeasurementStyle } from "../interfaces/StyleObjects";
import { Domains } from '../interfaces/Domains';
import { PlottableMeasurement } from "../interfaces/RCPCHMeasurementObject";
export interface TURNERChartProps {
    title: string,
    subtitle: string,
    measurementMethod: 'height' | 'weight' | 'ofc' | 'bmi',
    sex: 'male' | 'female',
    allMeasurementPairs: [PlottableMeasurement, PlottableMeasurement][]
    chartStyle?: ChartStyle
    axisStyle?: AxisStyle
    gridlineStyle?: GridlineStyle
    centileStyle?: CentileStyle
    measurementStyle?: MeasurementStyle
    domains: Domains
    setTurnerDomains([lowerXDomain, upperXDomain], [lowerYDomain, upperYDomain]): void
    centileData: [][]
}
