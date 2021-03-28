import { AxisStyle, CentileStyle, ChartStyle, GridlineStyle, MeasurementStyle, TextStyle, Padding } from '../interfaces/StyleObjects'

export function emptyChartValuesReturnDefaults(style: ChartStyle):ChartStyle{
    let newStyle = style
    newStyle.backgroundColour === null || '' && "#000000"
    newStyle.height === null && 600
    newStyle.width === null && 700
    newStyle.infoBoxStroke === null && "#CDCDCD"
    if (newStyle.infoBoxTextStyle === null){
        const textStyle: TextStyle = {
            colour: "#CDCDCD",
            name: 'Montserrat',
            size: 0.25,
            weight: "regular"
        }
        newStyle["infoBoxTextStyle"] = textStyle
    } else {
        newStyle.infoBoxTextStyle.colour === null && "#CDCDCD"
        newStyle.infoBoxTextStyle.name === null && "Montserrat"
        newStyle.infoBoxTextStyle.size === null && 0.25
        newStyle.infoBoxTextStyle.weight === null && "regular"
    }
    if (newStyle.padding === null){
        const padding: Padding = {
            left:50,
            right: 50,
            top: 50,
            bottom: 50
        }
        newStyle["padding"]=padding
    } else {
        newStyle.padding.left === null && 50
        newStyle.padding.right === null && 50
        newStyle.padding.top === null && 50
        newStyle.padding.bottom === null && 50
    }
    if (newStyle.subTitleStyle === null){
        const newSubtitleStyle: TextStyle = {
            colour: "#000000",
            name: "Arial",
            size: 10,
            weight: 'regular'
        }
        newStyle.subTitleStyle=newSubtitleStyle
    } else {
        newStyle.subTitleStyle.colour === null && "#000000"
        newStyle.subTitleStyle.name=== null && "Arial"
        newStyle.subTitleStyle.size === null && 10
        newStyle.subTitleStyle.weight === null && 'regular'
    }
    newStyle.termFill=== null && "#CDCDCD"
    newStyle.termStroke=== null && "#CDCDCD"
    if (newStyle.titleStyle === null){
        const newTitleStyle: TextStyle = {
            colour: "#000000",
            name: "Arial",
            size: 12,
            weight: 'regular'
        }
    } else {
        newStyle.titleStyle.colour=== null && "#000000"
        newStyle.titleStyle.name === null && "Arial"
        newStyle.titleStyle.size === null && 12
        newStyle.titleStyle.weight === null && 'regular'
    }
    newStyle.toggleButtonActiveColour === null && '#cb3083'
    newStyle.toggleButtonInactiveColour === null && "#E497C1"
    newStyle.toggleButtonTextColour === null && "#000000"
    if (newStyle.tooltipTextStyle === null){
        const newTooltipTextStyle: TextStyle = {
            colour: "#000000",
            name: "Montserrat",
            size: 0.25,
            weight: 'regular'}
        newStyle.tooltipTextStyle = newTooltipTextStyle
    } else {
        newStyle.tooltipTextStyle.colour === null && "#000000"
        newStyle.tooltipTextStyle.name === null && "Montserrat"
        newStyle.tooltipTextStyle.size === null && 0.25
        newStyle.tooltipTextStyle.weight === null && 'regular'
    }
    newStyle.tooltipBackgroundColour === null && '#CDCDCD'
    newStyle.tooltipStroke === null && '#CDCDCD'

    return newStyle
}

export function emptyAxisValuesReturnDefaults(style: AxisStyle){
    let newStyle=style
    if (newStyle.axisLabelTextStyle===null){
        const newAxisLabelTextStyle: TextStyle = {
            colour: '#000000',
            name: '#Montserrat',
            size: 8,
            weight: 'regular'
        }
        newStyle.axisLabelTextStyle = newAxisLabelTextStyle
    } else {
        newStyle.axisLabelTextStyle.colour === null && '#000000'
        newStyle.axisLabelTextStyle.name === null && '#Montserrat'
        newStyle.axisLabelTextStyle.size === null && 8
        newStyle.axisLabelTextStyle.weight === null && 'regular'
    }
    if (newStyle.tickLabelTextStyle===null){
        const newTickLabelTextStyle: TextStyle = {
            colour: '#000000',
            name: '#Montserrat',
            size: 8,
            weight: 'regular'
        }
        newStyle.tickLabelTextStyle=newTickLabelTextStyle
    } else {
        newStyle.tickLabelTextStyle.colour === null && '#000000'
        newStyle.tickLabelTextStyle.name === null && '#Montserrat'
        newStyle.tickLabelTextStyle.size === null && 8
        newStyle.tickLabelTextStyle.weight === null && 'regular'
    }
    newStyle.axisStroke === null && 0.5 
    return newStyle
}

export function emptyMeasurementValuesReturnDefaults(style: MeasurementStyle){
    let newStyle = style
    newStyle.measurementFill === null && "#000000"
    newStyle.measurementSize === null && 6
    return newStyle
}

export function emptyGridlineValuesReturnDefaults(style: GridlineStyle){
    let newStyle = style
    newStyle.dashed === null && false
    newStyle.gridlines === null && true
    newStyle.stroke === null && "#000000"
    newStyle.strokeWidth === null && 0.125
    return newStyle
}

export function emptyCentileValuesReturnDefaults(style: CentileStyle){
    let newStyle = style
    newStyle.centileStroke === null && "#000000"
    newStyle.centileStrokeWidth === null && 0.25
    return newStyle
}
