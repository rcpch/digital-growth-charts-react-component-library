import { AxisStyle, CentileStyle, ChartStyle, GridlineStyle, MeasurementStyle, SDSStyle } from "../../interfaces/StyleObjects"

/*
The following styles are provided to the RCPCHChart component, and match what the users should be passing in.
*/

export const rCPCH1AxisStyles: AxisStyle = {
    axisStroke: "#000000",
    axisLabelTextStyle: {
        name: "Arial", 
        colour: "#000000",
        size: 10,
        style: 'normal'
    },
    tickLabelTextStyle: {
        name: "Arial", 
        colour: "#000000",
        size: 8,
        style: 'normal'
    }
} 

export const rCPCH1ChartStyles: ChartStyle = {
    backgroundColour: "#FFFFFF",
    titleStyle: {
        name: "Arial", 
        colour: "#000000",
        size: 14,
        style: 'bold'
    },
    subTitleStyle: {
        name: "Arial",
        colour: "#000000",
        size: 12,
        style: 'italic'
    },
    tooltipBackgroundColour: "#fdc300",
    tooltipStroke: "#fdc300",
    tooltipTextStyle: {
        name: "Montserrat",
        colour: "#000000",
        size: 12,
        style: 'normal'
    },
    termFill: "#CDCDCD",
    termStroke: "#CDCDCD",
    toggleButtonInactiveColour: "#c6bddd",
    toggleButtonActiveColour: "#7159aa",
    toggleButtonTextStyle: {
        name: "Arial",
        colour: "#000000",
        size: 14,
        style: 'normal'
    }
}

export const rCPCH1GridlineStyle: GridlineStyle = {
    gridlines: true,
    stroke: "#d9d9d9",
    strokeWidth: 0.25,
    dashed: false
}

export const rCPCH1CentileStyle: CentileStyle = {
    sdsStroke: "#A9A9A9",
    centileStroke: "#7159aa",
    delayedPubertyAreaFill: "#c6bddd",
    midParentalCentileStroke: "#7159aa",
    midParentalAreaFill: "#c6bddd",
}

export const rCPCH1MeasurementStyle: MeasurementStyle = {
    measurementFill: "#000000",
    highlightedMeasurementFill: "#7159aa",
    eventTextStyle: {
        name: "Montserrat",
        colour: "#000000",
        size: 12,
        style: 'normal'
    }
}
export const rCPCH1SDSStyle: SDSStyle = {
    heightStroke: "#7159aaff",
    weightStroke: "#7159aa7f",
    ofcStroke: "#7159aa3f",
    bmiStroke: "#7159aa1f",
}

/*
The following styles are provided to the CentileChart component, and are a step downstream from the user. 
The user style props, passed into the RCPCHChart component, have been processed by the makeAllStyles function and returned in this format
*/

export const rcpch1Styles = {
    "chartMisc": {
        "background": {
            "fill": "#FFFFFF"
        }
    },
    "toolTipFlyout": {
        "stroke": "#fdc300",
        "fill": "#fdc300"
    },
    "toolTipMain": {
        "textAnchor": "end",
        "strokeWidth": 0.25,
        "fill": "#000000",
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
            "stroke": "#c6bddd",
            "fill": "#c6bddd",
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
            "stroke": "#7159aa",
            "strokeWidth": 1.5,
            "strokeLinecap": "round",
            "strokeDasharray": "5 5"
        }
    },
    "continuousCentile": {
        "data": {
            "stroke": "#7159aa",
            "strokeWidth": 1.5,
            "strokeLinecap": "round"
        }
    },
    "centileLabel": {
        "fill": "#7159aa",
        "fontSize": 6
    },
    "heightSDS": {
        "data": {
            "stroke": "#7159aaff",
            "strokeWidth": 1.5,
            "strokeLinecap": "round"
        }
    },
    "weightSDS": {
        "data": {
            "stroke": "#7159aa7f",
            "strokeWidth": 1.5,
            "strokeLinecap": "round"
        }
    },
    "ofcSDS": {
        "data": {
            "stroke": "#7159aa3f",
            "strokeWidth": 1.5,
            "strokeLinecap": "round"
        }
    },
    "bmiSDS": {
        "data": {
            "stroke": "#7159aa1f",
            "strokeWidth": 1.5,
            "strokeLinecap": "round"
        }
    },
    "midParentalCentile": {
        "data": {
            "stroke": "#7159aa",
            "strokeWidth": 1.5,
            "strokeLinecap": "round",
            "strokeOpacity": 1
        }
    },
    "midParentalSDS": {
        "data": {
            "stroke": "#7159aa",
            "strokeWidth": 1.5,
            "strokeLinecap": "round",
            "strokeOpacity": 1,
            "strokeDasharray": "2 5"
        }
    },
    "midParentalArea": {
        "data": {
            "fill": "#c6bddd",
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
            "fill": "#7159aa"
        }
    },
    "toggleStyle": {
        "activeColour": "#7159aa",
        "inactiveColour": "#c6bddd",
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
        "style": "normal"
    }
}