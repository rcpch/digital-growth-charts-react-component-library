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
    measurementFill?: string; // measurement point fill colour
    highlightedMeasurementFill?: string; // measurement point fill colour when hightlighted (SDS charts)
    eventTextStyle?: TextStyle; // styles for text of events: includes fontFamily, fontSize, colour, weight (regular/bold/italic)
}
export interface CentileStyle {
    sdsStroke?: string; // sds line colour
    sdsStrokeWidth?: number; // DEPRECATE - SDS line width
    centileStroke?: string; // centile line colour
    centileStrokeWidth?: number; // DEPRECATE - Centile line width
    delayedPubertyAreaFill?: string; // delayed puberty area colour
    midParentalCentileStrokeWidth?: number; // DEPRECATE - MPH centile line thickness
    midParentalCentileStroke?: string; // Midparental height centile line colour
    midParentalAreaFill?: string; // Midparental height area colour
}

export interface SDSStyle {
    lineStrokeWidth?: number; // DEPRECATE - SDS line width
    heightStroke?: string; // sds line colour
    weightStroke?: string; // sds line colour
    ofcStroke?: string; // sds line colour
    bmiStroke?: string; // sds line colour
}
export interface GridlineStyle {
    gridlines?: boolean; // show or hide gridlines
    stroke?: string; // gridline colour
    strokeWidth?: number; // DEPRECATE  - gridline width
    dashed?: boolean; // DEPRECATE - dashed vs continuous gridlines
}
export interface AxisStyle {
    axisStroke?: string; // Axis colour
    axisLabelTextStyle?: TextStyle; // Axis label text: : includes fontFamily, fontSize, colour, weight (regular/bold/italic)
    tickLabelTextStyle?: TextStyle; // Tick label text : includes fontFamily, fontSize, colour, weight (regular/bold/italic)
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
