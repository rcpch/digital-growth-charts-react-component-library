import { Domains } from "../interfaces/Domains";
import { PlottableMeasurement } from "../interfaces/RCPCHMeasurementObject";
import { MeasurementStyle, CentileStyle, AxisStyle, GridlineStyle, ChartStyle } from "../interfaces/StyleObjects"

export interface PRETERMChartProps {
    title: string,
    subtitle: string,
    measurementMethod: 'height' | 'weight' | 'ofc' | 'bmi',
    sex: 'male' | 'female',
    allMeasurementPairs: [PlottableMeasurement, PlottableMeasurement][]
    chartStyle: ChartStyle
    axisStyle: AxisStyle
    gridlineStyle: GridlineStyle
    centileStyle: CentileStyle
    measurementStyle: MeasurementStyle
    domains: Domains
    centileData: [][],
    termUnderThreeMonths: boolean,
    showChronologicalAge: boolean,
    showCorrectedAge: boolean
}
