import { PlottableMeasurement } from "../interfaces/RCPCHMeasurementObject";
import { AxisStyle, CentileStyle, ChartStyle, GridlineStyle, MeasurementStyle } from "../interfaces/StyleObjects";
export interface RCPCHChartProps {
    title: string,
    subtitle: string,
    measurementMethod: 'height' | 'weight' | 'ofc' | 'bmi',
    sex: 'male' | 'female',
    measurementsArray: [PlottableMeasurement, PlottableMeasurement][],
    reference: 'uk-who' | 'turner' | 'trisomy-21',
    chartStyle: ChartStyle,
    axisStyle: AxisStyle,
    gridlineStyle: GridlineStyle,
    centileStyle: CentileStyle,
    measurementStyle: MeasurementStyle
}
