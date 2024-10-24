import {
    AxisStyle,
    CentileStyle,
    ChartStyle,
    GridlineStyle,
    MeasurementStyle,
    SDSStyle,
} from '../../interfaces/StyleObjects';

/*
The following styles are provided to the RCPCHChart component, and define the styles in the Tanner 2 theme
*/

export const Tanner2AxisStyles: AxisStyle = {
    axisStroke: '#000000',
    axisLabelTextStyle: {
        name: 'Arial',
        colour: '#000000',
        size: 10,
        style: 'normal',
    },
    tickLabelTextStyle: {
        name: 'Arial',
        colour: '#000000',
        size: 8,
        style: 'normal',
    },
};

export const Tanner2ChartStyles: ChartStyle = {
    backgroundColour: '#FFFFFF',
    titleStyle: {
        name: 'Arial',
        colour: '#000000',
        size: 14,
        weight: '700',
    },
    subTitleStyle: {
        name: 'Arial',
        colour: '#000000',
        size: 12,
        style: 'italic',
    },
    tooltipBackgroundColour: '#3366cc',
    tooltipStroke: '##3366cc',
    tooltipTextStyle: {
        name: 'Montserrat',
        colour: '#FFFFFF',
        size: 14,
        style: 'normal',
    },
    termFill: '#CDCDCD',
    termStroke: '#CDCDCD',
    toggleButtonInactiveColour: '#ffc080',
    toggleButtonActiveColour: '#ff8000',
    toggleButtonTextStyle: {
        name: 'Arial',
        colour: '#FFFFFF',
        size: 14,
        style: 'normal',
    },
};

export const Tanner2GridlineStyles: GridlineStyle = {
    gridlines: true,
    stroke: '#d9d9d9',
    strokeWidth: 0.25,
    dashed: false,
};

export const Tanner2CentileStyles: CentileStyle = {
    sdsStroke: '#A9A9A9',
    centileStroke: '#ff8000',
    delayedPubertyAreaFill: '#ffc080',
    midParentalCentileStroke: '#ff8000',
    midParentalAreaFill: '#ffc080',
};

export const Tanner2MeasurementStyles: MeasurementStyle = {
    measurementFill: '#000000',
    highlightedMeasurementFill: '#ff8000',
    eventTextStyle: {
        name: 'Montserrat',
        colour: '#000000',
        size: 12,
        style: 'normal',
    },
};
export const Tanner2SDSStyles: SDSStyle = {
    heightStroke: '#7159aa',
    weightStroke: '#ff8000',
    ofcStroke: '#e60700',
    bmiStroke: '#c2a712',
};

/*
The following styles are provided to the CentileChart component, and are a step downstream from the user. 
The user style props, passed into the RCPCHChart component, have been processed by the makeAllStyles function and returned in this format
*/

export const Tanner2Styles = {
    chartMisc: {
        background: {
            fill: '#FFFFFF',
        },
    },
    toolTipFlyout: {
        stroke: '#3366cc',
        fill: '#3366cc',
    },
    toolTipMain: {
        textAnchor: 'end',
        strokeWidth: 0.25,
        fill: '#FFFFFF',
        fontFamily: 'Montserrat',
        fontWeight: 'normal',
    },
    chartTitle: {
        fontFamily: 'Arial',
        color: '#000000',
        fontSize: 14,
        fontWeight: 'bold',
        fontStyle: 'normal',
    },
    chartSubTitle: {
        fontFamily: 'Arial',
        color: '#000000',
        fontSize: 14,
        fontWeight: 'normal',
        fontStyle: 'normal',
    },
    termArea: {
        data: {
            fill: '#CDCDCD',
            stroke: '#CDCDCD',
        },
    },
    xAxis: {
        axis: {
            stroke: '#000000',
            strokeWidth: 1,
        },
        axisLabel: {
            fontSize: 10,
            padding: 20,
            fill: '000000',
            fontFamily: 'Arial',
        },
        ticks: {
            stroke: '000000',
        },
        tickLabels: {
            fontSize: 8,
            padding: 5,
            fill: '000000',
            color: '000000',
            fontFamily: 'Arial',
        },
        grid: {
            stroke: '#d9d9d9',
            strokeWidth: 0.25,
            strokeDasharray: '',
        },
    },
    xTicklabel: {
        fill: '000000',
        fontSize: 8,
        fontFamily: 'Arial',
    },
    yAxis: {
        axis: {
            stroke: '#000000',
            strokeWidth: 1,
        },
        axisLabel: {
            fontSize: 10,
            padding: 25,
            fill: '000000',
            fontFamily: 'Arial',
        },
        ticks: {
            stroke: '000000',
        },
        tickLabels: {
            fontSize: 8,
            padding: 5,
            fill: '000000',
            fontFamily: 'Arial',
        },
        grid: {
            stroke: '#d9d9d9',
            strokeWidth: 0.25,
            strokeDasharray: '',
        },
    },
    delayedPubertyArea: {
        data: {
            stroke: '#ffc080',
            fill: '#ffc080',
            strokeWidth: 1.5,
        },
    },
    delayedPubertyThresholdLine: {
        data: {
            stroke: '#000000',
            strokeWidth: 1,
        },
    },
    delayedPubertyThresholdLabel: {
        fontSize: 9,
        fill: '000000',
        fontFamily: 'Arial',
        textAlign: 'start',
    },
    sdsLine: {
        data: {
            stroke: '#A9A9A9',
            strokeWidth: 1,
            strokeLinecap: 'round',
            strokeDasharray: '5 5',
        },
    },
    dashedCentile: {
        data: {
            stroke: '#ff8000',
            strokeWidth: 1.5,
            strokeLinecap: 'round',
            strokeDasharray: '5 5',
        },
    },
    continuousCentile: {
        data: {
            stroke: '#ff8000',
            strokeWidth: 1.5,
            strokeLinecap: 'round',
        },
    },
    centileLabel: {
        fill: '#ff8000',
        fontSize: 6,
    },
    heightSDS: {
        data: {
            stroke: '#7159aa',
            strokeWidth: 1.5,
            strokeLinecap: 'round',
        },
    },
    weightSDS: {
        data: {
            stroke: '#ff8000',
            strokeWidth: 1.5,
            strokeLinecap: 'round',
        },
    },
    ofcSDS: {
        data: {
            stroke: '#e60700',
            strokeWidth: 1.5,
            strokeLinecap: 'round',
        },
    },
    bmiSDS: {
        data: {
            stroke: '#c2a712',
            strokeWidth: 1.5,
            strokeLinecap: 'round',
        },
    },
    midParentalCentile: {
        data: {
            stroke: '#ff8000',
            strokeWidth: 1.5,
            strokeLinecap: 'round',
            strokeOpacity: 1,
        },
    },
    midParentalSDS: {
        data: {
            stroke: '#ff8000',
            strokeWidth: 1.5,
            strokeLinecap: 'round',
            strokeOpacity: 1,
            strokeDasharray: '2 5',
        },
    },
    midParentalArea: {
        data: {
            fill: '#ffc080',
            opacity: 0.5,
        },
    },
    measurementPoint: {
        data: {
            fill: '#000000',
        },
    },
    measurementLinkLine: {
        data: {
            stroke: '#000000',
            strokeWidth: 1.25,
        },
    },
    highlightedMeasurementFill: {
        data: {
            fill: '#ff8000',
        },
    },
    toggleStyle: {
        activeColour: '#ff8000',
        inactiveColour: '#ffc080',
        fontFamily: 'Arial',
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'normal',
        fontStyle: 'normal',
    },
    eventTextStyle: {
        name: 'Montserrat',
        colour: '#000000',
        size: 14,
        style: 'normal',
    },
};
