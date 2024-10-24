import { AxisStyle, CentileStyle, ChartStyle, GridlineStyle, MeasurementStyle, SDSStyle } from "../../interfaces/StyleObjects"

/*
The following styles are provided to the RCPCHChart component, and define the styles in the Traditional (girls) theme
*/

export const traditionalGirlAxisStyles: AxisStyle = {
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

export const traditionalGirlChartStyles: ChartStyle = {
    backgroundColour: "#FFFFFF",
    titleStyle: {
        name: "Arial", 
        colour: "#000000",
        size: 14,
        weight: '700'
    },
    subTitleStyle: {
        name: "Arial",
        colour: "#000000",
        size: 12,
        style: 'italic'
    },
    tooltipBackgroundColour: "#df99c4",
    tooltipStroke: "#df99c4",
    tooltipTextStyle: {
        name: "Montserrat",
        colour: "#000000",
        size: 14,
        style: 'normal'
    },
    termFill: "#CDCDCD",
    termStroke: "#CDCDCD",
    toggleButtonInactiveColour: "#df99c4",
    toggleButtonActiveColour: "#c9559d",
    toggleButtonTextStyle: {
        name: "Arial",
        colour: "#FFFFFF",
        size: 14,
        style: 'normal'
    }
}

export const traditionalGirlGridlineStyles: GridlineStyle = {
    gridlines: true,
    stroke: "#d9d9d9",
    strokeWidth: 0.5,
    dashed: false
}

export const traditionalGirlCentileStyles: CentileStyle = {
    sdsStroke: "#A9A9A9",
    centileStroke: "#c9559d",
    delayedPubertyAreaFill: "#df99c4",
    midParentalCentileStroke: "#df99c4",
    midParentalAreaFill: "##df99c4",
}

export const traditionalGirlMeasurementStyles: MeasurementStyle = {
    measurementFill: "#000000",
    highlightedMeasurementFill: "#c9559d",
    eventTextStyle: {
        name: "Montserrat",
        colour: "#000000",
        size: 16,
        style: 'normal'
    }
}
export const traditionalGirlSDSStyles: SDSStyle = {
    heightStroke: "#c9559dff",
    weightStroke: "#c9559d7f",
    ofcStroke: "#c9559d3f",
    bmiStroke: "#c9559d1f",
}





/*
The following styles are provided to the CentileChart component, and are a step downstream from the user. 
The user style props, passed into the RCPCHChart component, have been processed by the makeAllStyles function and returned in this format
*/

export const traditionalGirlsStyles = {
    "chartMisc": {
        "background": {
            "fill": "#FFFFFF"
        }
    },
    "toolTipFlyout": {
        "stroke": "#df99c4",
        "fill": "#df99c4"
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
            "stroke": "#df99c4",
            "fill": "#df99c4",
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
            "stroke": "#c9559d",
            "strokeWidth": 1.5,
            "strokeLinecap": "round",
            "strokeDasharray": "5 5"
        }
    },
    "continuousCentile": {
        "data": {
            "stroke": "#c9559d",
            "strokeWidth": 1.5,
            "strokeLinecap": "round"
        }
    },
    "centileLabel": {
        "fill": "#c9559d",
        "fontSize": 6
    },
    "heightSDS": {
        "data": {
            "stroke": "#c9559dff",
            "strokeWidth": 1.5,
            "strokeLinecap": "round"
        }
    },
    "weightSDS": {
        "data": {
            "stroke": "#c9559d7f",
            "strokeWidth": 1.5,
            "strokeLinecap": "round"
        }
    },
    "ofcSDS": {
        "data": {
            "stroke": "#c9559d3f",
            "strokeWidth": 1.5,
            "strokeLinecap": "round"
        }
    },
    "bmiSDS": {
        "data": {
            "stroke": "#c9559d1f",
            "strokeWidth": 1.5,
            "strokeLinecap": "round"
        }
    },
    "midParentalCentile": {
        "data": {
            "stroke": "#c9559d",
            "strokeWidth": 1.5,
            "strokeLinecap": "round",
            "strokeOpacity": 1
        }
    },
    "midParentalSDS": {
        "data": {
            "stroke": "#c9559d",
            "strokeWidth": 1.5,
            "strokeLinecap": "round",
            "strokeOpacity": 1,
            "strokeDasharray": "2 5"
        }
    },
    "midParentalArea": {
        "data": {
            "fill": "#df99c4",
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
            "fill": "#c9559d"
        }
    },
    "toggleStyle": {
        "activeColour": "#c9559d",
        "inactiveColour": "#df99c4",
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