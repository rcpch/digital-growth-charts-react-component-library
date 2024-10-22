export interface ChartStyle {
    backgroundColour?: string; //background colour of chart
    titleStyle?: TextStyle; // style of text in title: includes fontFamily, fontSize, colour, style, weight
    subTitleStyle?: TextStyle; // style of text in subtitle: includes fontFamily, fontSize, colour, style, weight
    tooltipBackgroundColour?: string; //background colour of tooltip
    tooltipStroke?: string; //border colour of tooltip
    tooltipTextStyle?: TextStyle; // tooltip text: includes fontFamily, fontSize, colour, style, weight
    termFill?: string; // background colour of weight term area
    termStroke?: string; // border colour of weight term area
    toggleButtonInactiveColour?: string; // buttons - inactive colour
    toggleButtonActiveColour?: string; // buttons - active colour
    toggleButtonTextStyle?: TextStyle; // buttons text: includes fontFamily, fontSize, colour, style, weight
}
export interface MeasurementStyle {
    measurementFill?: string; // measurement point fill colour - only apply to SDS charts
    highlightedMeasurementFill?: string; // measurement point fill colour when hightlighted (SDS charts)
    eventTextStyle?: TextStyle; // styles for text of events: includes fontFamily, fontSize, colour, style, weight
}
export interface CentileStyle {
    sdsStroke?: string; // sds line colour
    centileStroke?: string; // centile line colour
    nondisjunctionThresholdLabel ?: string; // label for nondisjunctionThresholdLabel
    nondisjunctionThresholdLine ?: string; // colour of nondisjunctionThresholdLine
    delayedPubertyAreaFill?: string; // delayed puberty area colour
    midParentalCentileStroke?: string; // Midparental height centile line colour
    midParentalAreaFill?: string; // Midparental height area colour
    centileTextStyle?: Pick<TextStyle, 'name' | 'size' | 'weight'>; // centile text style : includes name, size, weight
}

export interface SDSStyle {
    heightStroke?: string; // sds line colour
    weightStroke?: string; // sds line colour
    ofcStroke?: string; // sds line colour
    bmiStroke?: string; // sds line colour
}
export interface GridlineStyle {
    gridlines?: boolean; // show or hide gridlines
    stroke?: string; // gridline colour
    strokeWidth?: number; // gridline width
    dashed?: boolean; // dashed vs continuous gridlines
}
export interface AxisStyle {
    axisStroke?: string; // Axis colour
    axisThresholdLabelTextStyle?: TextStyle; // Axis label text: : includes fontFamily, fontSize, colour, style, weight
    axisThresholdLineStyle?: AxisThresholdLineStyle; // Axis line: includes colour
    axisLabelTextStyle?: TextStyle; // Axis label text: : includes fontFamily, fontSize, colour, style, weight
    tickLabelTextStyle?: TickLabelTextStyle; // Tick label text : includes fontFamily, fontSize, colour, style, weight
}

export interface TickLabelTextStyle extends TextStyle {
    padding?: number;
}

export interface AxisThresholdLineStyle {
    colour?: string;
}

export interface ReferenceStyle extends TextStyle {}
export interface TextStyle {
    name?: string;
    colour?: string;
    size?: number;
    style?: 'italic' | 'normal';
    weight?: number | string;
}
