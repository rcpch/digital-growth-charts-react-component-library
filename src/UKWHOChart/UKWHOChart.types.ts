import { Domains } from "../interfaces/Domains";
import { Measurement } from "../interfaces/RCPCHMeasurementObject";
import { MeasurementStyle, CentileStyle, AxisStyle, GridlineStyle, ChartStyle } from "../interfaces/StyleObjects"

export interface UKWHOChartProps {
    title: string,
    subtitle: string,
    measurementMethod: 'height' | 'weight' | 'ofc' | 'bmi',
    sex: 'male' | 'female',
    childMeasurements: Measurement[]
    chartStyle: ChartStyle
    axisStyle?: AxisStyle
    gridlineStyle?: GridlineStyle
    centileStyle?: CentileStyle
    measurementStyle?: MeasurementStyle
    domains: Domains
    setUKWHODomains([lowerXDomain, upperXDomain], [lowerYDomain, upperYDomain]): void
    centileData: [][],
    isPreterm: boolean,
    termUnderThreeMonths: boolean
}