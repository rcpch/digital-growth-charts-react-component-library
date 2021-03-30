import { AxisStyle, CentileStyle, ChartStyle, GridlineStyle, MeasurementStyle, TextStyle, Padding } from '../interfaces/StyleObjects'

export function emptyChartValuesReturnDefaults(style: ChartStyle): ChartStyle {
    let newStyle = style
    newStyle.backgroundColour = newStyle.backgroundColour == null || '' ? "#000000" : newStyle.backgroundColour
    newStyle.height = newStyle.height == null || '' ? 600 : newStyle.height;
    newStyle.width = newStyle.width == null || '' ? 700 : newStyle.width
    newStyle.infoBoxStroke = newStyle.infoBoxStroke == null || '' ? "#CDCDCD" : newStyle.infoBoxStroke
    if (newStyle.infoBoxTextStyle == null) {
        const textStyle: TextStyle = {
            colour: "#CDCDCD",
            name: 'Montserrat',
            size: 0.25,
            weight: "regular"
        }
        newStyle.infoBoxTextStyle = textStyle
    } else {
        newStyle.infoBoxTextStyle.colour = newStyle.infoBoxTextStyle.colour == null || '' ? "#CDCDCD" : newStyle.infoBoxTextStyle.colour
        newStyle.infoBoxTextStyle.name = newStyle.infoBoxTextStyle.name == null || '' ? "Montserrat" : newStyle.infoBoxTextStyle.name
        newStyle.infoBoxTextStyle.size = newStyle.infoBoxTextStyle.size == null || '' ? 0.25 : newStyle.infoBoxTextStyle.size
        newStyle.infoBoxTextStyle.weight = newStyle.infoBoxTextStyle.weight == null || '' ? "regular" : newStyle.infoBoxTextStyle.weight
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
        newStyle.padding.left = newStyle.padding.left == null || '' ? 50 : newStyle.padding.left
        newStyle.padding.right = newStyle.padding.right == null || '' ? 50 : newStyle.padding.right
        newStyle.padding.top = newStyle.padding.top == null || '' ? 50 : newStyle.padding.top
        newStyle.padding.bottom = newStyle.padding.bottom == null || '' ? 50 : newStyle.padding.bottom
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
        newStyle.subTitleStyle.colour = newStyle.subTitleStyle.colour == null || '' ? "#000000" : newStyle.subTitleStyle.colour
        newStyle.subTitleStyle.name = newStyle.subTitleStyle.name == null || '' ? "Arial" : newStyle.subTitleStyle.name
        newStyle.subTitleStyle.size = newStyle.subTitleStyle.size == null || '' ? 10 : newStyle.subTitleStyle.size
        newStyle.subTitleStyle.weight = newStyle.subTitleStyle.weight == null || '' ? 'regular' : newStyle.subTitleStyle.weight
    }
    newStyle.termFill = newStyle.termFill == null || '' ? "#CDCDCD" : newStyle.termFill
    newStyle.termStroke = newStyle.termStroke == null || '' ? "#CDCDCD" : newStyle.termStroke
    if (newStyle.titleStyle == null) {
        const newTitleStyle: TextStyle = {
            colour: "#000000",
            name: "Arial",
            size: 12,
            weight: 'regular'
        }
        newStyle.titleStyle = newTitleStyle
    } else {
        newStyle.titleStyle.colour = newStyle.titleStyle.colour == null || '' ? "#000000" : newStyle.titleStyle.colour
        newStyle.titleStyle.name = newStyle.titleStyle.name == null || '' ? "Arial" : newStyle.titleStyle.name
        newStyle.titleStyle.size = newStyle.titleStyle.size == null || '' ? 12 : newStyle.titleStyle.size
        newStyle.titleStyle.weight = newStyle.titleStyle.weight == null || '' ? 'regular' : newStyle.titleStyle.weight
    }
    newStyle.toggleButtonActiveColour = newStyle.toggleButtonActiveColour == null || '' ? '#cb3083' : newStyle.toggleButtonActiveColour
    newStyle.toggleButtonInactiveColour = newStyle.toggleButtonInactiveColour == null || '' ? "#E497C1" : newStyle.toggleButtonInactiveColour
    newStyle.toggleButtonTextColour = newStyle.toggleButtonTextColour == null || '' ? "#000000" : newStyle.toggleButtonTextColour
    if (newStyle.tooltipTextStyle == null) {
        const newTooltipTextStyle: TextStyle = {
            colour: "#000000",
            name: "Montserrat",
            size: 0.25,
            weight: 'regular'
        }
        newStyle.tooltipTextStyle = newTooltipTextStyle
    } else {
        newStyle.tooltipTextStyle.colour = newStyle.tooltipTextStyle.colour == null || '' ? "#000000" : newStyle.tooltipTextStyle.colour
        newStyle.tooltipTextStyle.name = newStyle.tooltipTextStyle.name == null || '' ? "Montserrat" : newStyle.tooltipTextStyle.name
        newStyle.tooltipTextStyle.size = newStyle.tooltipTextStyle.size == null || '' ? 0.25 : newStyle.tooltipTextStyle.size
        newStyle.tooltipTextStyle.weight = newStyle.tooltipTextStyle.weight == null || '' ? 'regular' : newStyle.tooltipTextStyle.weight
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
        newStyle.axisLabelTextStyle.colour = newStyle.axisLabelTextStyle.colour == null || '' ? '#000000' : newStyle.axisLabelTextStyle.colour
        newStyle.axisLabelTextStyle.name = newStyle.axisLabelTextStyle.name == null || '' ? '#Montserrat' : newStyle.axisLabelTextStyle.name
        newStyle.axisLabelTextStyle.size = newStyle.axisLabelTextStyle.size == null || '' ? 8 : newStyle.axisLabelTextStyle.size
        newStyle.axisLabelTextStyle.weight = newStyle.axisLabelTextStyle.weight == null || '' ? 'regular' : newStyle.axisLabelTextStyle.weight
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
        newStyle.tickLabelTextStyle.colour = newStyle.tickLabelTextStyle.colour == null || '' ? '#000000' : newStyle.tickLabelTextStyle.colour
        newStyle.tickLabelTextStyle.name = newStyle.tickLabelTextStyle.name == null || '' ? '#Montserrat' : newStyle.tickLabelTextStyle.name
        newStyle.tickLabelTextStyle.size = newStyle.tickLabelTextStyle.size == null || '' ? 8 : newStyle.tickLabelTextStyle.size
        newStyle.tickLabelTextStyle.weight = newStyle.tickLabelTextStyle.weight == null || '' ? 'regular' : newStyle.tickLabelTextStyle.weight
    }
    newStyle.axisStroke === null && 0.5
    return newStyle
}

export function emptyMeasurementValuesReturnDefaults(style: MeasurementStyle) {
    let newStyle = style
    newStyle.measurementFill = newStyle.measurementFill == null || '' ? "#000000" : newStyle.measurementFill
    newStyle.measurementSize = newStyle.measurementSize == null || '' ? 6 : newStyle.measurementSize
    return newStyle
}

export function emptyGridlineValuesReturnDefaults(style: GridlineStyle) {
    let newStyle = style
    newStyle.dashed = newStyle.dashed == null || '' ? false : newStyle.dashed
    newStyle.gridlines = newStyle.gridlines == null || '' ? true : newStyle.gridlines
    newStyle.stroke = newStyle.stroke == null || '' ? "#000000" : newStyle.stroke
    newStyle.strokeWidth = newStyle.strokeWidth == null || '' ? 0.125 : newStyle.strokeWidth
    return newStyle
}

export function emptyCentileValuesReturnDefaults(style: CentileStyle) {
    let newStyle = style
    newStyle.centileStroke = newStyle.centileStroke == null ? "#000000" : newStyle.centileStroke
    newStyle.centileStrokeWidth = newStyle.centileStrokeWidth == null ? 0.25 : newStyle.centileStrokeWidth
    return newStyle
}
