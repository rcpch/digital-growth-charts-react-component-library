export interface ChartPadding {
    left?: number,
    right?: number,
    top?: number,
    bottom?: number,
}

export interface ChartMisc {
    background?: {fill?: string}
}

export interface Label {
    fontSize?: number,
    padding?: number,
    fill?: string,
    fontFamily?: string,
}

export interface Line {
    data: {
        stroke?: string,
        strokeWidth?: number,
        strokeLinecap?: string,
        strokeDasharray?: string,
        strokeOpacity?: number
    }
}

export interface Axis {
    axis?: {
        stroke?: string,
        strokeWidth?: number
    },
    axisLabel?: Label,
    ticks?: {
        stroke?: string
    },
    tickLabel?: Label,
    grid?: {
        stroke?: string;
        strokeWidth?: number;
        strokeDasharray?: string;
    }
}

export interface Data {
    stroke?: string,
    fill?: string,
    strokeWidth?: number,
}

export interface ClientStyle {
    chartHeight?: number,
    chartWidth?: number,
    chartPadding?: ChartPadding,
    chartMisc?: ChartMisc,
    toolTipFlyout?:{
        stroke?: string,
        fill?: string
    },
    toolTipMain?: {
        textAnchor?: 'start' | 'end',
        stroke?: string,
        strokeWidth?: number,
        fill?: string,
        fontFamily?: string,
        fontWeight?: number
    },
    chartTitle?: {
        fontFamily?: string,
        color?: string,
        fontSize?: number,
        fontWeight?: 'italic' | 'normal' | 'bold',
        fontStyle?: 'italic' | 'normal' | 'bold',
    },
    termArea?: {
        data?: Data
    },
    xAxis?: Axis,
    xTicklabel?: Label,
    yAxis?: Axis,
    delayedPubertyArea: {
        data?: Data
    },
    delayedPubertyThresholdLine?:{
        data?: Data
    },
    delayedPubertyThresholdLabel?: {
        fontSize?: number,
        fill?: string,
        fontFamily?: string,
        textAlign?: string,
    },
    sdsLine?: Line,
    dashedCentile?: Line,
    continuousCentile?: Line,
    heightSDS?: Line,
    weightSDS?: Line,
    ofcSDS?: Line,
    bmiSDS?: Line,
    midParentalSDS?: Line,
    midParentalArea?: {
        data?: Data
    },
    measurementPoint?: {
        data?: {
            fill?: string
        }
    },
    measurementLinkLine?: Line,
    highlightedMeasurementFill?: {
        data?: {
            fill?: string
        }
    }
    toggleStyle?:{
        activeColour?: string,
        inactiveColour?: string,
        fontFamily?: string,
        color?: string,
        fontSize?: string,
        fontWeight?: string,
        fontStyle?: string,
    }

}