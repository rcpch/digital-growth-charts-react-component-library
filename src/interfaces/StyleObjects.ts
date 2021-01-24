export interface ChartStyle{
    backgroundColour: string, 
    width: number, 
    height: number, 
    tooltipColour: string
}
export interface MeasurementStyle{
    measurementFill: string, 
    measurementSize: number, 
    measurementShape: 'circle' | 'cross' | 'triangleUp' | 'triangleDown' | 'square' | 'star' | 'diamond'
}
export interface CentileStyle{
    centileStroke: string, 
    centileStrokeWidth: number, 
    delayedPubertyAreaFill: string 
}
export interface GridlineStyle{
    gridlines: boolean, 
    stroke: string, 
    strokeWidth: number, 
    dashed: boolean
}
export interface AxisStyle{
    axisStroke: string, 
    axisLabelColour: string, 
    axisLabelFont: string, 
    axisLabelSize: number, 
    tickLabelSize: number
}