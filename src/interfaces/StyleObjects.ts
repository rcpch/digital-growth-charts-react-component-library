export interface ChartStyle {
    backgroundColour?: string; //background colour of chart
    titleStyle?: TextStyle | undefined; // style of text in title: includes fontFamily, fontSize, colour, weight (regular/bold/italic)
    subTitleStyle?: TextStyle | undefined; // style of text in subtitle: includes fontFamily, fontSize, colour, weight (regular/bold/italic)
    tooltipBackgroundColour?: string; //background colour of tooltip
    tooltipStroke?: string; //border colour of tooltip
    tooltipTextStyle?: TextStyle | undefined; // tooltip text: includes fontFamily, fontSize, colour, weight (regular/bold/italic)
    termFill?: string; // background colour of weight term area
    termStroke?: string; // border colour of weight term area
    toggleButtonInactiveColour?: string; // buttons - inactive colour
    toggleButtonActiveColour?: string; // buttons - active colour
    toggleButtonTextStyle?: TextStyle | undefined; // buttons text: includes fontFamily, fontSize, colour, weight (regular/bold/italic)
}
export interface MeasurementStyle {
    measurementFill?: string; // measurement point fill colour - only apply to SDS charts
    highlightedMeasurementFill?: string; // measurement point fill colour when hightlighted (SDS charts)
    eventTextStyle?: TextStyle; // styles for text of events: includes fontFamily, fontSize, colour, weight (regular/bold/italic)
}
export interface CentileStyle {
    sdsStroke?: string; // sds line colour
    centileStroke?: string; // centile line colour
    delayedPubertyAreaFill?: string; // delayed puberty area colour
    midParentalCentileStroke?: string; // Midparental height centile line colour
    midParentalAreaFill?: string; // Midparental height area colour
    centileTextStyle?: Omit<TextStyle, 'colour' | 'style'> | undefined;
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
    axisThresholdLabelTextStyle?: TextStyle | undefined; // Axis label text: : includes fontFamily, fontSize, colour, weight (regular/bold/italic)
    axisLabelTextStyle?: TextStyle | undefined; // Axis label text: : includes fontFamily, fontSize, colour, weight (regular/bold/italic)
    tickLabelTextStyle?: TickLabelTextStyle | undefined; // Tick label text : includes fontFamily, fontSize, colour, weight (regular/bold/italic)
}

export interface TickLabelTextStyle extends TextStyle {
    padding?: number;
}

export interface ReferenceStyle extends TextStyle {}
export interface TextStyle {
    name?: string;
    colour?: string;
    size?: number;
    style?: 'italic' | 'normal';
    weight?: number;
}

