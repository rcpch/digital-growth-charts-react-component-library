import { AxisStyle, CentileStyle, ChartStyle, GridlineStyle, MeasurementStyle, SDSStyle } from "../../interfaces/StyleObjects"

/*
The following styles are provided to the RCPCHChart component, and define the styles in the Tanner 3 theme
*/

export const Tanner3AxisStyles: AxisStyle = {
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

export const Tanner3ChartStyles: ChartStyle = {
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
        size: 14,
        style: 'normal'
    },
    termFill: "#CDCDCD",
    termStroke: "#CDCDCD",
    toggleButtonInactiveColour: "#f59c99",
    toggleButtonActiveColour: "#e60700",
    toggleButtonTextStyle: {
        name: "Arial",
        colour: "#FFFFFF",
        size: 14,
        style: 'normal'
    }
}

export const Tanner3GridlineStyles: GridlineStyle = {
    gridlines: true,
    stroke: "#d9d9d9",
    strokeWidth: 0.25,
    dashed: false
}

export const Tanner3CentileStyles: CentileStyle = {
    sdsStroke: "#A9A9A9",
    centileStroke: "#e60700",
    delayedPubertyAreaFill: "#f59c99",
    midParentalCentileStroke: "#e60700",
    midParentalAreaFill: "#f59c99",
}

export const Tanner3MeasurementStyles: MeasurementStyle = {
    measurementFill: "#000000",
    highlightedMeasurementFill: "#ff8000",
    eventTextStyle: {
        name: "Montserrat",
        colour: "#000000",
        size: 12,
        style: 'normal'
    }
}
export const Tanner3SDSStyles: SDSStyle = {
    heightStroke: "#e60700ff",
    weightStroke: "#e607007f",
    ofcStroke: "#e607003f",
    bmiStroke: "#e607001f",
}

/*
The following styles are provided to the CentileChart component, and are a step downstream from the user. 
The user style props, passed into the RCPCHChart component, have been processed by the makeAllStyles function and returned in this format
*/

export const Tanner3Styles = {
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
            "fill": "#000000",
            "fontFamily": "Arial"
        },
        "ticks": {
            "stroke": "#000000"
        },
        "tickLabels": {
            "fontSize": 8,
            "padding": 5,
            "fill": "#000000",
            "color": "#000000",
            "fontFamily": "Arial"
        },
        "grid": {
            "stroke": "#d9d9d9",
            "strokeWidth": 0.25,
            "strokeDasharray": ""
        }
    },
    "xTicklabel": {
        "fill": "#000000",
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
            "fill": "#000000",
            "fontFamily": "Arial"
        },
        "ticks": {
            "stroke": "#000000"
        },
        "tickLabels": {
            "fontSize": 8,
            "padding": 5,
            "fill": "#000000",
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
            "stroke": "#f59c99",
            "fill": "#f59c99",
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
        "fill": "#000000",
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
            "stroke": "#e60700",
            "strokeWidth": 1.5,
            "strokeLinecap": "round",
            "strokeDasharray": "5 5"
        }
    },
    "continuousCentile": {
        "data": {
            "stroke": "#e60700",
            "strokeWidth": 1.5,
            "strokeLinecap": "round"
        }
    },
    "centileLabel": {
        "fill": "#e60700",
        "fontSize": 6
    },
    "heightSDS": {
        "data": {
            "stroke": "#e60700ff",
            "strokeWidth": 1.5,
            "strokeLinecap": "round"
        }
    },
    "weightSDS": {
        "data": {
            "stroke": "#e607007f",
            "strokeWidth": 1.5,
            "strokeLinecap": "round"
        }
    },
    "ofcSDS": {
        "data": {
            "stroke": "#e607003f",
            "strokeWidth": 1.5,
            "strokeLinecap": "round"
        }
    },
    "bmiSDS": {
        "data": {
            "stroke": "#e607001f",
            "strokeWidth": 1.5,
            "strokeLinecap": "round"
        }
    },
    "midParentalCentile": {
        "data": {
            "stroke": "#e60700",
            "strokeWidth": 1.5,
            "strokeLinecap": "round",
            "strokeOpacity": 1
        }
    },
    "midParentalSDS": {
        "data": {
            "stroke": "#e60700",
            "strokeWidth": 1.5,
            "strokeLinecap": "round",
            "strokeOpacity": 1,
            "strokeDasharray": "2 5"
        }
    },
    "midParentalArea": {
        "data": {
            "fill": "#f59c99",
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
            "fill": "#e60700"
        }
    },
    "toggleStyle": {
        "activeColour": "#e60700",
        "inactiveColour": "#f59c99",
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