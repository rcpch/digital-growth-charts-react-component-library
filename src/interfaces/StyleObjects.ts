export interface ChartStyle {
    backgroundColour?: string; //background colour of chart
    width?: number; // DEPRECATE - SET TO 800
    height?: number; // DEPRECATE - SET TO 1000
    padding?: Padding; // DEPRECATE - SET TO 0
    titleStyle?: TextStyle; // style of text in title: includes fontFamily, fontSize, colour, weight (regular/bold/italic)
    subTitleStyle?: TextStyle; // style of text in subtitle: includes fontFamily, fontSize, colour, weight (regular/bold/italic)
    tooltipBackgroundColour?: string; //background colour of tooltip
    tooltipStroke?: string; //border colour of tooltip
    tooltipTextStyle?: TextStyle; // tooltip text: includes fontFamily, fontSize, colour, weight (regular/bold/italic)
    termFill?: string; // background colour of weight term area
    termStroke?: string; // border colour of weight term area
    toggleButtonInactiveColour: string; // buttons - inactive colour
    toggleButtonActiveColour: string; // buttons - active colour
    toggleButtonTextStyle: TextStyle; // buttons text: includes fontFamily, fontSize, colour, weight (regular/bold/italic)
}
export interface MeasurementStyle {
    measurementFill?: string;
    highlightedMeasurementFill?: string;
    eventTextStyle?: TextStyle;
}
export interface CentileStyle {
    sdsStroke?: string;
    sdsStrokeWidth?: number;
    centileStroke?: string;
    centileStrokeWidth?: number;
    delayedPubertyAreaFill?: string;
    midParentalCentileStrokeWidth?: number;
    midParentalCentileStroke?: string;
    midParentalAreaFill?: string;
}

export interface SDSStyle {
    lineStrokeWidth?: number;
    heightStroke?: string;
    weightStroke?: string;
    ofcStroke?: string;
    bmiStroke?: string;
}
export interface GridlineStyle {
    gridlines?: boolean;
    stroke?: string;
    strokeWidth?: number;
    dashed?: boolean;
}
export interface AxisStyle {
    axisStroke?: string;
    axisLabelTextStyle?: TextStyle;
    tickLabelTextStyle?: TextStyle;
}

export interface Padding {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
}
export interface TextStyle {
    name?: string;
    colour?: string;
    size?: number;
    weight?: 'bold' | 'italic' | 'normal';
}
