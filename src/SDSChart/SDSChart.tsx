// libraries and frameworks
import React, { useState, useMemo, MouseEvent, useRef } from "react";
import { 
    VictoryAxis, 
    VictoryChart,
    VictoryArea, 
    VictoryGroup, 
    VictoryScatter, 
    VictoryLine,
    VictoryLabel,
    VictoryVoronoiContainer,
    VictoryTooltip,
    VictoryLegend,
    Point} from "victory";

// interfaces and props
import { SDSChartProps } from "./SDSChart.types";

// components
import { MainContainer } from "../SubComponents/MainContainer";
import { LogoContainer } from "../SubComponents/LogoContainer";
import { TitleContainer } from "../SubComponents/TitleContainer";
import { ChartTitle } from "../SubComponents/ChartTitle";
import { yAxisLabel } from '../functions/yAxisLabel';
import CustomGridComponent from "../SubComponents/CustomGridComponent";
import RenderTickLabel from "../SubComponents/RenderTickLabel";
import icon from '../images/icon.png';
import { ButtonContainer } from "../SubComponents/ButtonContainer";
import { StyledRadioButtonGroup } from "../SubComponents/StyledRadioButtonGroup";

// helper functions
import { getDomainsAndData, getVisibleData } from '../functions/getDomainsAndData';
import xAxisLabel from '../functions/xAxisLabel';
import tailoredXTickValues from '../functions/tailoredXTickValues';
import defaultToggles from '../functions/defaultToggles';
import { sdsTooltipText } from "../functions/sdsTooltipText";
import { createSDSPointMouseOverObject } from '../functions/sdsPointMouseOverObject';

// style sheets
import "./SDSChart.scss";
import { XPoint } from "../SubComponents/XPoint";
import { CopiedLabel } from "../SubComponents/CopiedLabel";
import { ShareButtonWrapper } from "../SubComponents/ShareButtonWrapper";
import { ShareIcon } from "../SubComponents/ShareIcon";
import { StyledShareButton } from "../SubComponents/StyledShareButton";
import { generateMidParentalHeightSDSData } from "../functions/generateMidParentalHeightSDSData";
import { symbolForMeasurementType } from "../functions/symbolForMeasurementType";
import { selectedMeasurementMethods } from "../functions/buildListOfMeasurementMethods";
import { measurementMethodForName } from "../functions/measurementMethodForName";

const SDSChart: React.FC<SDSChartProps> = (
    { 
        reference,
        title,
        subtitle,
        measurementMethod,
        childMeasurements,
        midParentalHeightData,
        sex,
        enableZoom,
        styles,
        enableExport,
        exportChartCallback
    }
) => {
    const [userDomains, setUserDomains] = useState(null);
    
    let measurements = [];
    if (measurementMethod==="height"){
        measurements=childMeasurements.height;
    }
    if (measurementMethod==="weight"){
        measurements=childMeasurements.weight;
    }
    if (measurementMethod==="bmi"){
        measurements=childMeasurements.bmi;
    }
    if (measurementMethod==="ofc"){
        measurements=childMeasurements.ofc;
    }
    
    const { defaultShowCorrected, defaultShowChronological, showToggle } = defaultToggles(measurements);

    const [showChronologicalAge, setShowChronologicalAge] = useState(defaultShowChronological);
    const [showCorrectedAge, setShowCorrectedAge] = useState(defaultShowCorrected);
    const chartRef=useRef<any>();
    const [active, setActive] = useState(false);
    const [showHeight, setShowHeight] = useState(true);
    const [showWeight, setShowWeight] = useState(true);
    const [showBMI, setShowBMI] = useState(true);
    const [showOFC, setShowOFC] = useState(true);

    const childMeasurementsByType = [
        {
            measurementType: "height", 
            measurementTypeData: childMeasurements.height
        }, 
        {
            measurementType: "weight", 
            measurementTypeData: childMeasurements.weight
        }, 
        {
            measurementType: "bmi", 
            measurementTypeData: childMeasurements.bmi
        }, 
        {
            measurementType: "ofc", 
            measurementTypeData: childMeasurements.ofc
        }
    ];

    const legendMeasurements = useMemo( 
        // returns array of measurement methods and symbols for which there is data to display, for the legend 
        ()=> selectedMeasurementMethods(childMeasurements, styles), [childMeasurements, styles]);
    
    const [legendSelections, setLegendSelections] = useState(legendMeasurements);
    
    
    
    let termAreaData: null | any[] = null;
    
    const shadedTermAreaText =
    'Babies born in this shaded area\nare term. It is normal for\nbabies to lose weight over\nthe first two weeks of life.\nMedical review should be sought\nif weight has dropped by more\nthan 10% of birth weight or\nweight is still below birth weight\nthree weeks after birth.';
    
    let { computedDomains, chartScaleType } = useMemo(
        () =>
            getDomainsAndData(
                measurements,
                sex,
                measurementMethod,
                reference,
                showCorrectedAge,
                showChronologicalAge,
            ),
        [childMeasurements, sex, measurementMethod, reference, showCorrectedAge, showChronologicalAge],
    );

    const domains = userDomains || computedDomains;
    
    const midParentalHeightSDSData = useMemo(() => generateMidParentalHeightSDSData(domains, midParentalHeightData),[
        domains,
        midParentalHeightData
    ]);

    // set Y domains as the getDomainsAndData function returns only domains on measurement values, not SDS
    let newLowerY = -2;
    let newUpperY = 2;

    // retrieve lower and upper values from measurements if supplied
    // if lower than -2 of greater than 2, set these with padding to be the limits
    if (childMeasurements[measurementMethod].length > 0){
        const lowestYMeasurement = childMeasurements[measurementMethod].reduce(
            (a,b) => a.plottable_data.sds_data.corrected_decimal_age_data.y < b.plottable_data.sds_data.corrected_decimal_age_data.y ? a : b
        )
        const highestYMeasurement = childMeasurements[measurementMethod].reduce(
            (a,b) => a.plottable_data.sds_data.corrected_decimal_age_data.y > b.plottable_data.sds_data.corrected_decimal_age_data.y ? a : b
        )
        const lowestYVal = lowestYMeasurement.plottable_data.sds_data.corrected_decimal_age_data.y - 0.25; // add 0.25 SDS padding
        const highestYVal = highestYMeasurement.plottable_data.sds_data.corrected_decimal_age_data.y + 0.25; // add 0.25 SDS padding
        newLowerY = lowestYVal < newLowerY ? lowestYVal : newLowerY;
        newUpperY = highestYVal > newUpperY ? highestYVal : newUpperY;
    }

    if (
        (
            childMeasurements.height[0]?.birth_data.gestation_weeks >= 37 ||
            childMeasurements.weight[0]?.birth_data.gestation_weeks >= 37 ||
            childMeasurements.bmi[0]?.birth_data.gestation_weeks >= 37 ||
            childMeasurements.ofc[0]?.birth_data.gestation_weeks >= 37
        ) &&
        measurementMethod === 'weight' &&
        reference === 'uk-who' &&
        domains?.x[0] < 0.038329911019849415 && // 2 weeks postnatal
        domains?.x[1] >= -0.057494866529774126 // 37 weeks gest
    ) {

        termAreaData = [
            {
                x: -0.057494866529774126,
                y: newUpperY,
                y0: newLowerY,
                l: shadedTermAreaText,
            },
            {
                x: 0.038329911019849415,
                y: newUpperY,
                y0: newLowerY,
                l: shadedTermAreaText,
            },
        ];
    }

    const onSelectRadioButton = (event: MouseEvent<HTMLButtonElement>) => {
        switch ((event.target as HTMLInputElement).value) {
            case 'unadjusted':
                setShowChronologicalAge(true);
                setShowCorrectedAge(false);
                break;
            case 'adjusted':
                setShowChronologicalAge(false);
                setShowCorrectedAge(true);
                break;
            case 'both':
                setShowChronologicalAge(true);
                setShowCorrectedAge(true);
                break;
            default:
                console.warn('Fall through case on toggle adjusted age function');
        }
        setUserDomains(null);
    };

    const exportPressed = () => {
        if (enableExport) {
            setActive(true);
            exportChartCallback(chartRef.current.firstChild) // this passes the raw SVG back to the client for converting
        } 
    };

    const labelFadeEnd = () => { // fade out the 'copied' label
        setActive(false);
    };

    const chartEvents = createSDSPointMouseOverObject(styles); // highlight a given series on mouseover

    return (
        <MainContainer>
            <LogoContainer>
                <img src={icon} width={32} height={32} />
            </LogoContainer>

            <TitleContainer>
                <ChartTitle {...styles.chartTitle}>{title}</ChartTitle>
                <ChartTitle {...styles.chartSubTitle}>{subtitle}</ChartTitle>
            </TitleContainer>

            {/* The VictoryChart is the parent component. It contains a Voronoi container, which groups data sets together for the purposes of tooltips */}
            {/* It has an animation object and the domains are the thresholds of ages rendered. This is calculated from the child data supplied by the user. */}
            {/* Tooltips are here as it is the parent component. More information of tooltips in centiles below. */}
        <VictoryChart
            width={styles.chartWidth}
            height={styles.chartHeight}
            padding={styles.chartPadding}
            style={styles.chartMisc}
            containerComponent={
                <VictoryVoronoiContainer
                    containerRef={ref => { chartRef.current=ref} }
                    labelComponent={
                        <VictoryTooltip
                            constrainToVisibleArea
                            pointerLength={5}
                            cornerRadius={0}
                            flyoutStyle={styles.toolTipFlyout}
                            style={styles.toolTipMain}
                        />   
                    }
                    labels={(datum)=> { 
                        return sdsTooltipText(datum)}
                    }
                    voronoiBlacklist={[
                        'linkLine-height', 
                        'linkLine-weight', 
                        'linkLine-ofc',
                        'linkLine-bmi',
                        'chronological-height-line', 
                        'corrected-height-line', 
                        'chronological-weight-line', 
                        'corrected-weight-line', 
                        'chronological-bmi-line', 
                        'corrected-bmi-line', 
                        'chronological-ofc-line', 
                        'corrected-ofc-line']
                    }
                />
            }
            events={chartEvents}  // create events objects for each measurement that will highlight datapoints on mouse hover
        >
            
                {
                    /* Term child shaded area: */
                    termAreaData !== null && <VictoryArea style={styles.termArea} data={termAreaData} />
                }

                {/* X axis: */}
                <VictoryAxis
                    domain={{x:[domains.x[0],domains.x[1]]}}
                    label={xAxisLabel(chartScaleType, domains)}
                    style={styles.xAxis}
                    tickValues={tailoredXTickValues[chartScaleType]}
                    tickLabelComponent={
                        <RenderTickLabel
                            domains={{x:[domains.x[0],domains.x[1]]}}
                            specificStyle={styles.xTicklabel}
                            chartScaleType={chartScaleType}
                        />
                    }
                    gridComponent={<CustomGridComponent chartScaleType={chartScaleType} />}
                />

                {
                    /* render the y axis */
                    <VictoryAxis
                        domain={{y:[newLowerY, newUpperY]}}
                        label={yAxisLabel(measurementMethod, true)}
                        tickValues={[-5.33, -4.67, -4.0, -3.33, -2.67, -2.0, -1.33, -0.67, 0, 0.67, 1.33, 2.0, 2.67, 3.33, 4.0, 4.67, 5.33]}
                        style={styles.yAxis}
                        dependentAxis
                    />
                }

                {/* 
                    Measurements by type - loops through the measurement data provided by the API, first by measurement type,
                    then by data point.
                */}

                

                { childMeasurementsByType.map((measurementTypeItem, itemIndex) =>
                
                    {   
                        
                        /*
                        Set the SDS line style and line colour. Note if not supplied from the client, the centile line colour is used,
                        with an opacity level set based on the itemIndex to differentiate the lines. This happens in the 
                        makeAllStyles function.
                        Each line is associated with a scatter also, whose symbol varies
                        */
                        let measurementStyles;
                        let linkLineStyles;
                        let showData: boolean;
                        
                        if (measurementTypeItem.measurementType==="height"){
                            measurementStyles=styles?.heightSDS;
                            linkLineStyles=styles?.heightSDS;
                            showData = showHeight;
                        }
                        if (measurementTypeItem.measurementType==="weight"){
                            measurementStyles=styles?.weightSDS;
                            linkLineStyles=styles?.weightSDS;
                            showData = showWeight;
                        }
                        if (measurementTypeItem.measurementType==="bmi"){
                            measurementStyles=styles?.bmiSDS;
                            linkLineStyles=styles?.bmiSDS;
                            showData = showBMI;
                        }
                        if (measurementTypeItem.measurementType==="ofc"){
                            measurementStyles=styles?.ofcSDS;
                            linkLineStyles=styles?.ofcSDS;
                            showData=showOFC;
                        }                        
                        
                        return (
                            <VictoryGroup
                                key={measurementTypeItem.measurementType+"-"+itemIndex}
                            >
                                { showChronologicalAge && showData &&
                                    <VictoryGroup 
                                        key={`chronological-${itemIndex}`}
                                        name={`chronological-${measurementTypeItem.measurementType}-group`}
                                    >
                                        <VictoryLine 
                                            name={`chronological-${measurementTypeItem.measurementType}-line`}
                                            data={measurementTypeItem.measurementTypeData}
                                            x={(datum)=>datum.plottable_data.sds_data.chronological_decimal_age_data.x}
                                            y={(datum)=>datum.plottable_data.sds_data.chronological_decimal_age_data.y}
                                            labelComponent={
                                                <VictoryLabel 
                                                    renderInPortal 
                                                    dx={20}
                                                    title="height"
                                                />
                                            }
                                            style={measurementStyles}
                                        /> 
                                        <VictoryScatter
                                            data={measurementTypeItem.measurementTypeData}
                                            x={(datum)=>datum.plottable_data.sds_data.chronological_decimal_age_data.x}
                                            y={(datum)=>datum.plottable_data.sds_data.chronological_decimal_age_data.y}
                                            symbol={symbolForMeasurementType(measurementTypeItem.measurementType)}
                                            style={{
                                                data: {
                                                    fill: measurementStyles.data.stroke
                                                }
                                            }}
                                            name={`chronological-${measurementTypeItem.measurementType}-scatter`}
                                        />
                                    </VictoryGroup>
                                }
                                { showCorrectedAge && showData &&
                                <VictoryGroup 
                                        key={`corrected-${itemIndex}`}
                                        name={`corrected-${measurementTypeItem.measurementType}-group`}
                                    >
                                    <VictoryLine 
                                        name={`corrected-${measurementTypeItem.measurementType}-line`}
                                        data={measurementTypeItem.measurementTypeData}
                                        x={(datum)=>datum.plottable_data.sds_data.corrected_decimal_age_data.x}
                                        y={(datum)=>datum.plottable_data.sds_data.corrected_decimal_age_data.y}
                                        style={styles.dashedCentile}
                                    />
                                    <VictoryScatter
                                        data={measurementTypeItem.measurementTypeData}
                                        x={(datum)=>datum.plottable_data.sds_data.corrected_decimal_age_data.x}
                                        y={(datum)=>datum.plottable_data.sds_data.corrected_decimal_age_data.y}
                                        dataComponent={
                                            <XPoint
                                                isBoneAge={false}
                                                isSDS={true}
                                                colour={measurementStyles.data.stroke}
                                            />
                                        }
                                        style={{
                                            data: {
                                                fill: measurementStyles.data.stroke
                                            }
                                        }}
                                        name={`corrected-${measurementTypeItem.measurementType}-scatter`}
                                    />
                                </VictoryGroup>
                                }

                                { showCorrectedAge && showChronologicalAge && showData &&
                                    measurementTypeItem.measurementTypeData.map((measurement, index)=>{
                                        const chron = {...measurement.plottable_data.sds_data.chronological_decimal_age_data};
                                        const correct = {...measurement.plottable_data.sds_data.corrected_decimal_age_data};
                                        return <VictoryLine 
                                            key={`linkLine-${measurementTypeItem.measurementType}-${index}`}
                                            name={`linkLine-${measurementTypeItem.measurementType}`}
                                            data={[chron, correct]}
                                            style={linkLineStyles}
                                        />
                                    })
                                }

                            </VictoryGroup>)
                    
                    })
                }
            
                {
                    midParentalHeightData?.mid_parental_height_sds && reference==="uk-who" && measurementMethod==="height" &&
                    // only show midparental line if data present and height is selected
                        <VictoryLine 
                            name="mid-parental-sds"
                            data={midParentalHeightSDSData}
                            style={styles.midParentalSDS}
                        />
                    
                }

                {   /* 
                        legend - comes last to allow it to sit atop the axes and lines
                    */
                }
                <VictoryLegend
                    orientation="vertical"
                    x={styles.chartWidth - 200}
                    y={0}
                    style={{
                        border: {
                            stroke: "black",
                            fill: "#FFFFFF"
                        },
                        title: {
                            fontSize: 12
                        }
                    }}
                    data={legendSelections}
                    dataComponent={
                        <Point />
                    }
                    name="legend"
                    title={["(Show/Hide on select)"]}
                    events={[{
                        target: "data",
                        eventHandlers: {
                            onClick: ()=>{
                                return [
                                    {
                                        target: "data",
                                        mutation: (props)=>{
                                            const fill = props.style && props.style.fill;
                                            const name = measurementMethodForName(props.datum.name);
                                            if (name==="height"){
                                                setShowHeight(!showHeight);
                                            }
                                            if (name==="weight"){
                                                setShowWeight(!showWeight);
                                            }
                                            if (name==="bmi"){
                                                setShowBMI(!showBMI);
                                            }
                                            if (name==="ofc"){
                                                setShowOFC(!showOFC);
                                            }
                                            return fill === "grey" ? null : { style: { fill: "grey" } };
                                        }
                                    },
                                    {
                                        target: "labels",
                                        mutation: (props)=>{
                                            const fill = props.style && props.style.fill;
                                            const name = measurementMethodForName(props.datum.name);
                                            if (name==="height"){
                                                setShowHeight(!showHeight);
                                            }
                                            if (name==="weight"){
                                                setShowWeight(!showWeight);
                                            }
                                            if (name==="bmi"){
                                                setShowBMI(!showBMI);
                                            }
                                            if (name==="ofc"){
                                                setShowOFC(!showOFC);
                                            }
                                            return fill === "grey" ? null : { style: { fill: "grey" } };
                                        }
                                    }
                                ]
                            }
                        }
                    }]}
                />

        </VictoryChart>
        {(showToggle || enableExport) && (
            <ButtonContainer>
                { enableExport && (
                        <ShareButtonWrapper>
                            <StyledShareButton 
                                color={styles.toggleStyle.activeColour}
                                size={5}
                                onClick={exportPressed}
                            >
                                <ShareIcon/>
                            </StyledShareButton>
                            <CopiedLabel
                                active={active}
                                onAnimationEnd={labelFadeEnd}
                            >
                                Copied!
                            </CopiedLabel>
                        </ShareButtonWrapper>
                    )}
                    {showToggle && (
                        <StyledRadioButtonGroup
                            {...styles.toggleStyle}
                            handleClick={onSelectRadioButton}
                            correctedAge={showCorrectedAge}
                            chronologicalAge={showChronologicalAge}
                            className="toggleButtons"
                        />
                    )}
            </ButtonContainer>
        )}
    </MainContainer>
)
};

export default SDSChart;

