import { AxisStyle, CentileStyle, ChartStyle, GridlineStyle, MeasurementStyle, SDSStyle } from "../../interfaces/StyleObjects"

/*
The following styles are provided to the RCPCHChart component, and define the styles in the Monochrome theme
*/

export const monochromeAxisStyles: AxisStyle = {
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

export const monochromeChartStyles: ChartStyle = {
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
    tooltipBackgroundColour: "#b3b3b3",
    tooltipStroke: "#b3b3b3",
    tooltipTextStyle: {
        name: "Montserrat",
        colour: "#000000",
        size: 14,
        style: 'normal'
    },
    termFill: "#CDCDCD",
    termStroke: "#CDCDCD",
    toggleButtonInactiveColour: "#b3b3b3",
    toggleButtonActiveColour: "#000000",
    toggleButtonTextStyle: {
        name: "Arial",
        colour: "#FFFFFF",
        size: 14,
        style: 'normal'
    }
}

export const monochromeGridlineStyle: GridlineStyle = {
    gridlines: true,
    stroke: "#d9d9d9",
    strokeWidth: 0.25,
    dashed: false
}

export const monochromeCentileStyle: CentileStyle = {
    sdsStroke: "#A9A9A9",
    centileStroke: "#000000",
    delayedPubertyAreaFill: "#b3b3b3",
    midParentalCentileStroke: "#000000",
    midParentalAreaFill: "#b3b3b3",
}

export const monochromeMeasurementStyle: MeasurementStyle = {
    measurementFill: "#000000",
    highlightedMeasurementFill: "#000000",
    eventTextStyle: {
        name: "Montserrat",
        colour: "#000000",
        size: 12,
        style: 'normal'
    }
}
export const monochromeSDSStyle: SDSStyle = {
    heightStroke: "#000000",
    weightStroke: "#000000",
    ofcStroke: "#000000",
    bmiStroke: "#000000",
}

/*
The following styles are provided to the CentileChart component, and are a step downstream from the user. 
The user style props, passed into the RCPCHChart component, have been processed by the makeAllStyles function and returned in this format
*/

export const monochromeStyles = {
    "chartMisc": {
        "background": {
            "fill": "#FFFFFF"
        }
    },
    "toolTipFlyout": {
        "stroke": "#b3b3b3",
        "fill": "#b3b3b3"
    },
    "toolTipMain": {
        "textAnchor": "end",
        "strokeWidth": 0.25,
        "fontSize": 14,
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
            "stroke": "#b3b3b3",
            "fill": "#b3b3b3",
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
        },
    },
    "dashedCentile": {
        "data": {
            "stroke": "#000000",
            "strokeWidth": 1.5,
            "strokeLinecap": "round",
            "strokeDasharray": "5 5"
        }
    },
    "continuousCentile": {
        "data": {
            "stroke": "#000000",
            "strokeWidth": 1.5,
            "strokeLinecap": "round"
        }
    },
    "centileLabel": {
        "fill": "#000000",
        "fontSize": 10,
    },
    "heightSDS": {
        "data": {
            "stroke": "#000000ff",
            "strokeWidth": 1.5,
            "strokeLinecap": "round"
        }
    },
    "weightSDS": {
        "data": {
            "stroke": "#0000007f",
            "strokeWidth": 1.5,
            "strokeLinecap": "round"
        }
    },
    "ofcSDS": {
        "data": {
            "stroke": "#0000003f",
            "strokeWidth": 1.5,
            "strokeLinecap": "round"
        }
    },
    "bmiSDS": {
        "data": {
            "stroke": "#0000001f",
            "strokeWidth": 1.5,
            "strokeLinecap": "round"
        }
    },
    "midParentalCentile": {
        "data": {
            "stroke": "#000000",
            "strokeWidth": 1.5,
            "strokeLinecap": "round",
            "strokeOpacity": 1
        }
    },
    "midParentalSDS": {
        "data": {
            "stroke": "#000000",
            "strokeWidth": 1.5,
            "strokeLinecap": "round",
            "strokeOpacity": 1,
            "strokeDasharray": "2 5"
        }
    },
    "midParentalArea": {
        "data": {
            "fill": "#b3b3b3",
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
            "fill": "#000000"
        }
    },
    "toggleStyle": {
        "activeColour": "#000000",
        "inactiveColour": "#b3b3b3",
        "fontFamily": "Arial",
        "color": "#FFFFFF",
        "fontSize": 14,
        "fontWeight": "normal",
        "fontStyle": "normal"
    },
    "toggleTooltipStyle": {
        "backgroundColor": "#333",
        "color": "#fff",
        "fontSize": 14,
        "fontFamily": "'Montserrat', Helvetica, Arial, sans-serif;",
        "fontWeight": 400,
        "fontStyle": "regular",
        "borderRadius": 4,
    },
    "referenceTextStyle": {
        "fontSize": 8,
        "fontFamily": "Arial",
        "color": "#000000",
        "fontWeight":200,
        "fontStyle": "normal",
    }
  }

export const chartObject: ChartStyle =  {
    "backgroundColour": "#FFFFFF",
    "titleStyle": {
        "name": "Arial",
        "colour": "#000000",
        "size": 14,
        "weight": "700"
    },
    "subTitleStyle": {
        "name": "Arial",
        "colour": "#000000",
        "size": 14,
        "style": "normal"
    },
    "tooltipBackgroundColour": "#b3b3b3",
    "tooltipStroke": "#b3b3b3",
    "tooltipTextStyle": {
        "name": "Montserrat",
        "colour": "#000000",
        "size": 0.25,
        "style": "normal"
    },
    "termFill": "#CDCDCD",
    "termStroke": "#CDCDCD",
    "toggleButtonInactiveColour": "#b3b3b3",
    "toggleButtonActiveColour": "#000000",
    "toggleButtonTextStyle":{
        "name": "Montserrat",
        "colour": "#000000",
        "size": 0.25,
        "style": "normal"
    },
}

export const measurementObjects: MeasurementStyle = {
    "measurementFill": "#000000",
    "highlightedMeasurementFill": "#000000",
    "eventTextStyle": {
        "name": "Montserrat",
        "colour": "#000000",
        "size": 14,
        "style": "normal"
    }
}

export const centilesObject: CentileStyle = {
    "centileStroke": "#000000",
    "delayedPubertyAreaFill": "#b3b3b3",
    "midParentalAreaFill": "#b3b3b3"
}

export const gridlinesObject: GridlineStyle = {
    "gridlines": true,
    "stroke": "#d9d9d9",
    "strokeWidth": 0.25,
    "dashed": false
}

export const axesObject: AxisStyle = {
    "axisStroke": "#000000",
    "axisLabelTextStyle": {
        "name": "Arial",
        "colour": "000000",
        "size": 10,
        "style": "normal"
    },
}

export const sdsObject: SDSStyle = {
    "heightStroke": "#000000",
    "weightStroke": "#000000",
    "ofcStroke": "#000000",
    "bmiStroke": "#000000"
}