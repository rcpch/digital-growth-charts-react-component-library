import { AxisStyle, CentileStyle, ChartStyle, GridlineStyle, MeasurementStyle, TextStyle, Padding } from '../interfaces/StyleObjects'

export function emptyChartValuesReturnDefaults(style: ChartStyle): ChartStyle {
    let newStyle = style
    newStyle.backgroundColour = (newStyle.backgroundColour == null || newStyle.backgroundColour.length === 0) ? "#000000" : newStyle.backgroundColour
    newStyle.height = newStyle.height == null ? 600 : newStyle.height;
    newStyle.width = newStyle.width == null ? 700 : newStyle.width
    newStyle.infoBoxStroke = (newStyle.infoBoxStroke == null || newStyle.infoBoxStroke.length === 0) ? "#CDCDCD" : newStyle.infoBoxStroke
    if (newStyle.infoBoxTextStyle == null) {
        const textStyle: TextStyle = {
            colour: "#CDCDCD",
            name: 'Montserrat',
            size: 0.25,
            weight: "regular"
        }
        newStyle.infoBoxTextStyle = textStyle
    } else {
        newStyle.infoBoxTextStyle.colour = (newStyle.infoBoxTextStyle.colour == null || newStyle.infoBoxTextStyle.colour.length === 0) ? "#CDCDCD" : newStyle.infoBoxTextStyle.colour
        newStyle.infoBoxTextStyle.name = (newStyle.infoBoxTextStyle.name == null || newStyle.infoBoxTextStyle.name.length === 0) ? "Montserrat" : newStyle.infoBoxTextStyle.name
        newStyle.infoBoxTextStyle.size = newStyle.infoBoxTextStyle.size == null ? 0.25 : newStyle.infoBoxTextStyle.size
        newStyle.infoBoxTextStyle.weight = (newStyle.infoBoxTextStyle.weight == null || newStyle.infoBoxTextStyle.weight.length === 0) ? "regular" : newStyle.infoBoxTextStyle.weight
    }
    if (newStyle.padding == null) {
        const padding: Padding = {
            left: 50,
            right: 50,
            top: 50,
            bottom: 50
        }
        newStyle.padding = padding
    } else {
        newStyle.padding.left = newStyle.padding.left == null ? 50 : newStyle.padding.left
        newStyle.padding.right = newStyle.padding.right == null ? 50 : newStyle.padding.right
        newStyle.padding.top = newStyle.padding.top == null ? 50 : newStyle.padding.top
        newStyle.padding.bottom = newStyle.padding.bottom == null ? 50 : newStyle.padding.bottom
    }
    if (newStyle.subTitleStyle == null) {
        const newSubtitleStyle: TextStyle = {
            colour: "#000000",
            name: "Arial",
            size: 10,
            weight: 'regular'
        }
        newStyle.subTitleStyle = newSubtitleStyle
    } else {
        newStyle.subTitleStyle.colour = (newStyle.subTitleStyle.colour == null || newStyle.subTitleStyle.colour.length === 0) ? "#000000" : newStyle.subTitleStyle.colour
        newStyle.subTitleStyle.name = (newStyle.subTitleStyle.name == null || newStyle.subTitleStyle.name.length === 0) ? "Arial" : newStyle.subTitleStyle.name
        newStyle.subTitleStyle.size = newStyle.subTitleStyle.size == null ? 10 : newStyle.subTitleStyle.size
        newStyle.subTitleStyle.weight = (newStyle.subTitleStyle.weight == null || newStyle.subTitleStyle.weight.length === 0) ? 'regular' : newStyle.subTitleStyle.weight
    }
    newStyle.termFill = (newStyle.termFill == null || newStyle.termFill.length === 0) ? "#CDCDCD" : newStyle.termFill
    newStyle.termStroke = (newStyle.termStroke == null || newStyle.termStroke.length === 0) ? "#CDCDCD" : newStyle.termStroke
    if (newStyle.titleStyle == null) {
        const newTitleStyle: TextStyle = {
            colour: "#000000",
            name: "Arial",
            size: 12,
            weight: 'regular'
        }
        newStyle.titleStyle = newTitleStyle
    } else {
        newStyle.titleStyle.colour = (newStyle.titleStyle.colour == null || newStyle.titleStyle.colour.length === 0) ? "#000000" : newStyle.titleStyle.colour
        newStyle.titleStyle.name = (newStyle.titleStyle.name == null || newStyle.titleStyle.name.length === 0) ? "Arial" : newStyle.titleStyle.name
        newStyle.titleStyle.size = newStyle.titleStyle.size == null ? 12 : newStyle.titleStyle.size
        newStyle.titleStyle.weight = (newStyle.titleStyle.weight == null || newStyle.titleStyle.weight.length === 0) ? 'regular' : newStyle.titleStyle.weight
    }
    newStyle.toggleButtonActiveColour = (newStyle.toggleButtonActiveColour == null || newStyle.toggleButtonActiveColour.length === 0) ? '#cb3083' : newStyle.toggleButtonActiveColour
    newStyle.toggleButtonInactiveColour = (newStyle.toggleButtonInactiveColour == null || newStyle.toggleButtonInactiveColour.length === 0) ? "#E497C1" : newStyle.toggleButtonInactiveColour
    newStyle.toggleButtonTextColour = (newStyle.toggleButtonTextColour == null || newStyle.toggleButtonTextColour.length === 0) ? "#000000" : newStyle.toggleButtonTextColour
    
    if (newStyle.tooltipTextStyle == null) {
        const newTooltipTextStyle: TextStyle = {
            colour: "#000000",
            name: "Montserrat",
            size: 0.25,
            weight: 'regular'
        }
        newStyle.tooltipTextStyle = newTooltipTextStyle
    } else {
        newStyle.tooltipTextStyle.colour = (newStyle.tooltipTextStyle.colour == null || newStyle.tooltipTextStyle.colour.length === 0) ? "#000000" : newStyle.tooltipTextStyle.colour
        newStyle.tooltipTextStyle.name = (newStyle.tooltipTextStyle.name == null || newStyle.tooltipTextStyle.name.length === 0) ? "Montserrat" : newStyle.tooltipTextStyle.name
        newStyle.tooltipTextStyle.size = newStyle.tooltipTextStyle.size == null ? 0.25 : newStyle.tooltipTextStyle.size
        newStyle.tooltipTextStyle.weight = (newStyle.tooltipTextStyle.weight == null || newStyle.tooltipTextStyle.weight.length === 0) ? 'regular' : newStyle.tooltipTextStyle.weight
    }
    newStyle.tooltipBackgroundColour = newStyle.tooltipBackgroundColour == null || '' ? '#CDCDCD' : newStyle.tooltipBackgroundColour
    newStyle.tooltipStroke = newStyle.tooltipStroke == null || '' ? '#CDCDCD' : newStyle.tooltipStroke

    return newStyle
}

export function emptyAxisValuesReturnDefaults(style: AxisStyle) {
    let newStyle = style
    if (newStyle.axisLabelTextStyle == null) {
        const newAxisLabelTextStyle: TextStyle = {
            colour: '#000000',
            name: '#Montserrat',
            size: 8,
            weight: 'regular'
        }
        newStyle.axisLabelTextStyle = newAxisLabelTextStyle
    } else {
        newStyle.axisLabelTextStyle.colour = (newStyle.axisLabelTextStyle.colour == null || newStyle.axisLabelTextStyle.colour.length === 0) ? '#000000' : newStyle.axisLabelTextStyle.colour
        newStyle.axisLabelTextStyle.name = (newStyle.axisLabelTextStyle.name == null || newStyle.axisLabelTextStyle.name.length === 0) ? '#Montserrat' : newStyle.axisLabelTextStyle.name
        newStyle.axisLabelTextStyle.size = newStyle.axisLabelTextStyle.size == null ? 8 : newStyle.axisLabelTextStyle.size
        newStyle.axisLabelTextStyle.weight = (newStyle.axisLabelTextStyle.weight == null || newStyle.axisLabelTextStyle.weight.length === 0) ? 'regular' : newStyle.axisLabelTextStyle.weight
    }
    if (newStyle.tickLabelTextStyle === null) {
        const newTickLabelTextStyle: TextStyle = {
            colour: '#000000',
            name: '#Montserrat',
            size: 8,
            weight: 'regular'
        }
        newStyle.tickLabelTextStyle = newTickLabelTextStyle
    } else {
        newStyle.tickLabelTextStyle.colour = (newStyle.tickLabelTextStyle.colour == null || newStyle.tickLabelTextStyle.colour.length === 0) ? '#000000' : newStyle.tickLabelTextStyle.colour
        newStyle.tickLabelTextStyle.name = (newStyle.tickLabelTextStyle.name == null || newStyle.tickLabelTextStyle.name.length === 0) ? '#Montserrat' : newStyle.tickLabelTextStyle.name
        newStyle.tickLabelTextStyle.size = newStyle.tickLabelTextStyle.size == null ? 8 : newStyle.tickLabelTextStyle.size
        newStyle.tickLabelTextStyle.weight = (newStyle.tickLabelTextStyle.weight == null || newStyle.tickLabelTextStyle.weight.length === 0) ? 'regular' : newStyle.tickLabelTextStyle.weight
    }
    newStyle.axisStroke === null && 0.5
    return newStyle
}

export function emptyMeasurementValuesReturnDefaults(style: MeasurementStyle) {
    let newStyle = style
    newStyle.measurementFill = (newStyle.measurementFill == null || newStyle.measurementFill.length === 0) ? "#000000" : newStyle.measurementFill
    newStyle.measurementSize = newStyle.measurementSize == null ? 6 : newStyle.measurementSize
    return newStyle
}

export function emptyGridlineValuesReturnDefaults(style: GridlineStyle) {
    let newStyle = style
    newStyle.dashed = newStyle.dashed == null ? false : newStyle.dashed
    newStyle.gridlines = newStyle.gridlines == null ? true : newStyle.gridlines
    newStyle.stroke = (newStyle.stroke == null || newStyle.stroke.length === 0) ? "#000000" : newStyle.stroke
    newStyle.strokeWidth = newStyle.strokeWidth == null ? 0.125 : newStyle.strokeWidth
    return newStyle
}

export function emptyCentileValuesReturnDefaults(style: CentileStyle) {
    let newStyle = style
    newStyle.centileStroke = (newStyle.centileStroke == null || newStyle.centileStroke.length === 0) ? "#000000" : newStyle.centileStroke
    newStyle.centileStrokeWidth = newStyle.centileStrokeWidth == null ? 0.25 : newStyle.centileStrokeWidth
    return newStyle
}
