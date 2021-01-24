import { AxisStyle, CentileStyle, ChartStyle, GridlineStyle, MeasurementStyle } from "../interfaces/StyleObjects";
export interface TURNERChartProps {
    title: string,
    subtitle: string,
    measurementMethod: 'height' | 'weight' | 'ofc' | 'bmi',
    sex: 'male' | 'female',
    allMeasurementPairs: []
    chartStyle: ChartStyle
    axisStyle: AxisStyle
    gridlineStyle: GridlineStyle
    centileStyle: CentileStyle
    measurementStyle: MeasurementStyle
}
