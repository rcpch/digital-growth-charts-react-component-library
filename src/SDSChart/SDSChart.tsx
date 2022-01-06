// libraries and frameworks
import React, { useState, useMemo, MouseEvent } from "react";
import { 
    VictoryAxis, 
    VictoryChart,
    VictoryArea, 
    VictoryGroup, 
    VictoryScatter, 
    VictoryLine,
    VictoryVoronoiContainer,
    VictoryTooltip} from "victory";

// interfaces and props
import { SDSChartProps } from "./SDSChart.types";
import { Domains } from '../interfaces/Domains';

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
import { sdsTooltipText } from "../functions/sdsTooltipTex";

// style sheets
import "./SDSChart.scss";
import { XPoint } from "../SubComponents/XPoint";

const SDSChart: React.FC<SDSChartProps> = (
    { 
        reference,
        title,
        subtitle,
        measurementMethod,
        sex,
        childMeasurements,
        midParentalHeightData,
        enableZoom,
        styles,
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
    
    const childMeasurementsByType = [{measurementType: "height", measurementTypeData: childMeasurements.height}, {measurementType: "weight", measurementTypeData: childMeasurements.weight}, {measurementType: "bmi", measurementTypeData: childMeasurements.bmi}, {measurementType: "ofc", measurementTypeData: childMeasurements.ofc}];
    
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
    

    // set Y domains as the getDomainsAndData function returns only domains on measurement values, not SDS
    let newLowerY = -2
    let newUpperY = 2

    if (childMeasurements[measurementMethod].length > 0){
        const lowestYMeasurement = childMeasurements[measurementMethod].reduce(
            (a,b) => a.plottable_data.sds_data.corrected_decimal_age_data.y < b.plottable_data.sds_data.corrected_decimal_age_data.y ? a : b
        )
        const highestYMeasurement = childMeasurements[measurementMethod].reduce(
            (a,b) => a.plottable_data.sds_data.corrected_decimal_age_data.y > b.plottable_data.sds_data.corrected_decimal_age_data.y ? a : b
        )
        newLowerY = lowestYMeasurement.plottable_data.sds_data.corrected_decimal_age_data.y - 0.25 // add 0.25 SDS padding
        newUpperY = highestYMeasurement.plottable_data.sds_data.corrected_decimal_age_data.y + 0.25 // add 0.25 SDS padding
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

    const colours = {
        monochrome:{
            height: "#D3D3D3",
            weight: '#D3D3D3',
            bmi: "#D3D3D3",
            ofc: "#D3D3D3"
        },
        rcpch_boy_girl: {
            height: "#3A4454",
            weight: '#F5DDDD',
            bmi: "#ffba49",
            ofc: "#EECFD4"
        },
        rcpch_rebrand: {
            height: "#DDFFD9",
            weight: '#6C4B5E',
            bmi: "#B3679B",
            ofc: "#000501"
        }
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
                    labelComponent={
                        <VictoryTooltip
                            constrainToVisibleArea
                            pointerLength={5}
                            cornerRadius={0}
                            flyoutStyle={styles.toolTipFlyout}
                            style={styles.toolTipMain}
                        />
                    }
                    labels={(datum)=> { return sdsTooltipText(datum)}}
                    voronoiBlacklist={['linkLine']}
                />
            }
        >
                {
                    /* Term child shaded area: */
                    termAreaData !== null && <VictoryArea style={styles.termArea} data={termAreaData} />
                }

                {/* X axis: */}
                <VictoryAxis
                    label={xAxisLabel(chartScaleType, domains)}
                    style={styles.xAxis}
                    tickValues={tailoredXTickValues[chartScaleType]}
                    tickLabelComponent={
                        <RenderTickLabel
                            specificStyle={styles.xTicklabel}
                            chartScaleType={chartScaleType}
                            domains={domains}
                        />
                    }
                    gridComponent={<CustomGridComponent chartScaleType={chartScaleType} />}
                />

                {
                    /* render the y axis */
                    <VictoryAxis
                        domain={{y:[newLowerY, newUpperY]}}
                        label={yAxisLabel(measurementMethod, true)}
                        style={styles.yAxis}
                        dependentAxis
                    />
                }

            {/* 
                Measurements by type - loops through the measurement data provided by the API, first by measurement type,
                then by data point.
            */}

            { childMeasurementsByType.map((measurementTypeItem, itemIndex) =>
            
                {   return measurementTypeItem.measurementType===measurementMethod ?
                    <VictoryGroup
                        key={measurementTypeItem.measurementType+"-"+itemIndex}
                    >
                        { showChronologicalAge &&
                            <VictoryLine 
                                name="chronological-line"
                                data={measurementTypeItem.measurementTypeData}
                                x={(datum)=>datum.plottable_data.sds_data.chronological_decimal_age_data.x}
                                y={(datum)=>datum.plottable_data.sds_data.chronological_decimal_age_data.y}
                                // interpolation="natural"
                                style={styles.continuousCentile}
                            /> 
                        }
                        { showCorrectedAge &&
                            <VictoryLine 
                                name="corrected-line"
                                data={measurementTypeItem.measurementTypeData}
                                x={(datum)=>datum.plottable_data.sds_data.corrected_decimal_age_data.x}
                                y={(datum)=>datum.plottable_data.sds_data.corrected_decimal_age_data.y}
                                // interpolation="natural"
                                style={styles.dashedCentile}
                            /> 
                        }
                    </VictoryGroup>
                    :

                    measurementTypeItem.measurementTypeData.map((measurement, index) => {
                        const chronData: any = {
                            ...measurement.plottable_data.sds_data.chronological_decimal_age_data,
                        };
                        const correctData: any = {
                            ...measurement.plottable_data.sds_data.corrected_decimal_age_data,
                        };

                        let chosenColour;
                        if (measurement.child_observation_value.measurement_method==="height"){
                            chosenColour=styles.heightSDSPoint
                        }
                        if (measurement.child_observation_value.measurement_method==="weight"){
                            chosenColour=styles.weightSDSPoint
                        }
                        if (measurement.child_observation_value.measurement_method==="bmi"){
                            chosenColour=styles.bmiSDSPoint
                        }
                        if (measurement.child_observation_value.measurement_method==="ofc"){
                            chosenColour=styles.ofcSDSPoint
                        }
                        
                        return (
                            <VictoryGroup
                                key={measurementTypeItem.measurementType+"-"+index}
                            >
                                {  showChronologicalAge &&
                                    <VictoryScatter
                                        data={[chronData]}
                                        symbol="circle"
                                        style={chosenColour}
                                        name={"chronological-"+measurementTypeItem.measurementType}
                                    />
                                }
                                {  showCorrectedAge &&
                                    <VictoryScatter
                                        data={[correctData]}
                                        dataComponent={
                                            <XPoint
                                                isBoneAge={false}
                                                isSDS={true}
                                            />
                                        }
                                        style={chosenColour}
                                        name={"chronological-"+measurementTypeItem.measurementType}
                                    />
                                }
                                { showCorrectedAge && showChronologicalAge &&
                                    <VictoryLine
                                        name="linkLine"
                                        style={chosenColour}
                                        data={[chronData, correctData]}
                                    />
                                }
                            </VictoryGroup>
                        )
                    });
                })
            }

        </VictoryChart>
        {(showToggle) && (
                <ButtonContainer>
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

