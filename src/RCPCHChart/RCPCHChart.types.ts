export interface RCPCHChartProps {
    title: string,
    subtitle: string,
    measurementMethod: 'height' | 'weight' | 'ofc' | 'bmi',
    sex: 'male' | 'female',
    measurementsArray: [],
    measurementsSDSArray: [],
    reference: 'uk-who' | 'turner' | 'trisomy-21',
    width: number,
    height: number,
    measurementDataPointColour: string,
    centileColour: string,
    chartBackground: string
}
