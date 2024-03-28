import { AxisStyle, CentileStyle, ChartStyle, GridlineStyle, MeasurementStyle, SDSStyle } from "../../interfaces/StyleObjects"

/*
The following styles are provided to the RCPCHChart component, and match what the users should be passing in.
*/

export const rCPCH2AxisStyles: AxisStyle = {
    axisStroke: "#000000",
    axisLabelTextStyle: {
        name: "Arial", 
        colour: "#000000",
        size: 10,
        weight: 'normal'
    },
    tickLabelTextStyle: {
        name: "Arial", 
        colour: "#000000",
        size: 8,
        weight: 'normal'
    }
} 

export const rCPCH2ChartStyles: ChartStyle = {
    backgroundColour: "#FFFFFF",
    width: 1000,
    height: 800,
    padding: {
        left: 50,
        right: 50,
        top: 25,
        bottom: 40
    },
    titleStyle: {
        name: "Arial", 
        colour: "#000000",
        size: 14,
        weight: 'bold'
    },
    subTitleStyle: {
        name: "Arial",
        colour: "#000000",
        size: 12,
        weight: 'italic'
    },
    tooltipBackgroundColour: "#fdc300",
    tooltipStroke: "#fdc300",
    tooltipTextStyle: {
        name: "Montserrat",
        colour: "#000000",
        size: 12,
        weight: 'normal'
    },
    termFill: "#CDCDCD",
    termStroke: "#CDCDCD",
    toggleButtonInactiveColour: "#c6bddd",
    toggleButtonActiveColour: "#7159aa",
    toggleButtonTextStyle: {
        name: "Arial",
        colour: "#000000",
        size: 14,
        weight: 'normal'
    }
}

export const rCPCH2GridlineStyle: GridlineStyle = {
    gridlines: true,
    stroke: "#d9d9d9",
    strokeWidth: 0.25,
    dashed: false
}

export const rCPCH2CentileStyle: CentileStyle = {
    sdsStroke: "#A9A9A9",
    sdsStrokeWidth: 1.5,
    centileStroke: "#7159aa",
    centileStrokeWidth: 1.5,
    delayedPubertyAreaFill: "#c6bddd",
    midParentalCentileStrokeWidth: 1.5,
    midParentalCentileStroke: "#ff8000",
    midParentalAreaFill: "#c6bddd",
}

export const rCPCH2MeasurementStyle: MeasurementStyle = {
    measurementFill: "#000000",
    highlightedMeasurementFill: "#ff8000",
    eventTextStyle: {
        name: "Montserrat",
        colour: "#000000",
        size: 12,
        weight: 'normal'
    }
}
export const rCPCH2SDSStyle: SDSStyle = {
    lineStrokeWidth: 1.5,
    heightStroke: "#ff8000ff",
    weightStroke: "#ff80007f",
    ofcStroke: "#ff80003f",
    bmiStroke: "#ff80001f",
}

/*
The following styles are provided to the CentileChart component, and are a step downstream from the user. 
The user style props, passed into the RCPCHChart component, have been processed by the makeAllStyles function and returned in this format
*/

export const rcpch2Styles = {
    "chartHeight": 800,
    "chartWidth": 1000,
    "chartPadding": {
        "left": 50,
        "right": 50,
        "top": 25,
        "bottom": 40
    },
    "chartMisc": {
        "background": {
            "fill": "#FFFFFF"
        }
    },
    "toolTipFlyout": {
        "stroke": "#3366cc",
        "fill": "#3366cc"
    },
    "toolTipMain": {
        "textAnchor": "end",
        "strokeWidth": 0.25,
        "fill": "#FFFFFF",
        "fontFamily": "Montserrat",
        "fontWeight": "normal"
    },
    "chartTitle": {
        "fontFamily": "Arial",
        "color": "#000000",
        "fontSize": 14,
        "fontWeight": "bold",
        "fontStyle": "normal"
    },
    "chartSubTitle": {
        "fontFamily": "Arial",
        "color": "#000000",
        "fontSize": 14,
        "fontWeight": "normal",
        "fontStyle": "normal"
    },
    "termArea": {
        "data": {
            "fill": "#CDCDCD",
            "stroke": "#CDCDCD"
        }
    },
    "xAxis": {
        "axis": {
            "stroke": "#000000",
            "strokeWidth": 1
        },
        "axisLabel": {
            "fontSize": 10,
            "padding": 20,
            "fill": "000000",
            "fontFamily": "Arial"
        },
        "ticks": {
            "stroke": "000000"
        },
        "tickLabels": {
            "fontSize": 8,
            "padding": 5,
            "fill": "000000",
            "color": "000000",
            "fontFamily": "Arial"
        },
        "grid": {
            "stroke": "#d9d9d9",
            "strokeWidth": 0.25,
            "strokeDasharray": ""
        }
    },
    "xTicklabel": {
        "fill": "000000",
        "fontSize": 8,
        "fontFamily": "Arial"
    },
    "yAxis": {
        "axis": {
            "stroke": "#000000",
            "strokeWidth": 1
        },
        "axisLabel": {
            "fontSize": 10,
            "padding": 25,
            "fill": "000000",
            "fontFamily": "Arial"
        },
        "ticks": {
            "stroke": "000000"
        },
        "tickLabels": {
            "fontSize": 8,
            "padding": 5,
            "fill": "000000",
            "fontFamily": "Arial"
        },
        "grid": {
            "stroke": "#d9d9d9",
            "strokeWidth": 0.25,
            "strokeDasharray": ""
        }
    },
    "delayedPubertyArea": {
        "data": {
            "stroke": "#ffc080",
            "fill": "#ffc080",
            "strokeWidth": 1.5
        }
    },
    "delayedPubertyThresholdLine": {
        "data": {
            "stroke": "#000000",
            "strokeWidth": 1
        }
    },
    "delayedPubertyThresholdLabel": {
        "fontSize": 9,
        "fill": "000000",
        "fontFamily": "Arial",
        "textAlign": "start"
    },
    "sdsLine": {
        "data": {
            "stroke": "#A9A9A9",
            "strokeWidth": 1,
            "strokeLinecap": "round",
            "strokeDasharray": "5 5"
        }
    },
    "dashedCentile": {
        "data": {
            "stroke": "#ff8000",
            "strokeWidth": 1.5,
            "strokeLinecap": "round",
            "strokeDasharray": "5 5"
        }
    },
    "continuousCentile": {
        "data": {
            "stroke": "#ff8000",
            "strokeWidth": 1.5,
            "strokeLinecap": "round"
        }
    },
    "centileLabel": {
        "fill": "#ff8000",
        "fontSize": 6
    },
    "heightSDS": {
        "data": {
            "stroke": "#ff8000ff",
            "strokeWidth": 1.5,
            "strokeLinecap": "round"
        }
    },
    "weightSDS": {
        "data": {
            "stroke": "#ff80007f",
            "strokeWidth": 1.5,
            "strokeLinecap": "round"
        }
    },
    "ofcSDS": {
        "data": {
            "stroke": "#ff80003f",
            "strokeWidth": 1.5,
            "strokeLinecap": "round"
        }
    },
    "bmiSDS": {
        "data": {
            "stroke": "#ff80001f",
            "strokeWidth": 1.5,
            "strokeLinecap": "round"
        }
    },
    "midParentalCentile": {
        "data": {
            "stroke": "#ff8000",
            "strokeWidth": 1.5,
            "strokeLinecap": "round",
            "strokeOpacity": 1
        }
    },
    "midParentalSDS": {
        "data": {
            "stroke": "#ff8000",
            "strokeWidth": 1.5,
            "strokeLinecap": "round",
            "strokeOpacity": 1,
            "strokeDasharray": "2 5"
        }
    },
    "midParentalArea": {
        "data": {
            "fill": "#ffc080",
            "opacity": 0.5
        }
    },
    "measurementPoint": {
        "data": {
            "fill": "#000000"
        }
    },
    "measurementLinkLine": {
        "data": {
            "stroke": "#000000",
            "strokeWidth": 1.25
        }
    },
    "highlightedMeasurementFill": {
        "data": {
            "fill": "#ff8000"
        }
    },
    "toggleStyle": {
        "activeColour": "#ff8000",
        "inactiveColour": "#ffc080",
        "fontFamily": "Arial",
        "color": "#FFFFFF",
        "fontSize": 14,
        "fontWeight": "normal",
        "fontStyle": "normal"
    },
    "eventTextStyle": {
        "name": "Montserrat",
        "colour": "#000000",
        "size": 14,
        "weight": "normal"
    }
}