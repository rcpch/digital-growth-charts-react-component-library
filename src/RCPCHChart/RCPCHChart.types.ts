export interface RCPCHChartProps {
    title: string,
    subtitle: string,
    measurementMethod: 'height' | 'weight' | 'ofc' | 'bmi',
    sex: 'male' | 'female',
    measurementsArray: [],
    reference: 'uk-who' | 'turner' | 'trisomy-21',
    chartBackground: string,
    gridlineStroke: string,
    gridlineStrokeWidth: number,
    gridlineDashed: boolean,
    gridlines: boolean,
    centileStroke: string,
    centileStrokeWidth: number,
    axisStroke: string,
    axisLabelFont: string,
    axisLabelColour: string,
    measurementFill: string,
    measurementSize: number,
    measurementShape: 'circle' | 'square' | 'star' | 'diamond' | 'triangleUp' | 'triangleDown'
}
