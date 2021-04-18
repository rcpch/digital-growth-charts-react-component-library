// libraries
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
    VictoryChart,
    VictoryGroup,
    VictoryLine,
    VictoryScatter,
    VictoryVoronoiContainerProps,
    VictoryTooltip,
    VictoryAxis,
    VictoryLegend,
    VictoryLabel,
    VictoryArea,
    VictoryVoronoiContainer,
} from 'victory';

// helper functions
import getDomainsAndData from '../functions/getDomainsAndData';
import { yAxisLabel } from '../functions/yAxisLabel';
import xAxisLabel from '../functions/xAxisLabel';
import tailoredXTickValues from '../functions/tailoredXTickValues';
import defaultToggles from '../functions/defaultToggles';
import { tooltipText } from '../functions/tooltips';
import { delayedPubertyThreshold, makePubertyThresholds } from '../functions/DelayedPuberty';

// interfaces & props
import { CentileChartProps, ComputedData } from './CentileChart.types';
import { ICentile } from '../interfaces/CentilesObject';
import { Measurement } from '../interfaces/RCPCHMeasurementObject';

// components/subcomponents
import { XPoint } from '../SubComponents/XPoint';
import CustomGridComponent from '../SubComponents/CustomGridComponent';
import RenderTickLabel from '../SubComponents/RenderTickLabel';

// style sheets
import './CentileChart.scss';
import icon from '../images/icon.png';

function CentileChart({
    reference,
    title,
    subtitle,
    measurementMethod,
    sex,
    childMeasurements,
    chartStyle,
    axisStyle,
    gridlineStyle,
    centileStyle,
    measurementStyle,
}: CentileChartProps) {
    if (reference === 'turner' && measurementMethod !== 'height') {
        console.error('Error: only female height data is available to chart for Turner Syndrome');
        return null;
    }

    const blankInternalState: ComputedData = {
        centileData: null,
        domains: null,
        chartScaleType: 'biggerChild',
        pointsForCentileLabels: [],
    };

    const { defaultShowCorrected, defaultShowChronological, showToggle } = defaultToggles(childMeasurements);

    // set state
    const [isLoading, setIsLoading] = useState(true);
    const [showChronologicalAge, setShowChronologicalAge] = useState(defaultShowChronological);
    const [showCorrectedAge, setShowCorrectedAge] = useState(defaultShowCorrected);
    const [internalData, setInternalData] = useState(blankInternalState);

    const centileData = internalData.centileData;
    const domains = internalData.domains;
    const chartScaleType = internalData.chartScaleType;

    const lowerPubertyBorder = (d: any) => {
        if ((sex === 'male' && d.x >= 9 && d.x <= 14) || (sex === 'female' && d.x >= 9 && d.x <= 13)) {
            return d.y0;
        } else {
            return null;
        }
    };

    const pubertyThresholds = makePubertyThresholds(domains, sex);

    let showTermArea = false;

    if (
        childMeasurements[0]?.birth_data.gestation_weeks >= 37 &&
        measurementMethod === 'weight' &&
        reference === 'uk-who'
    ) {
        showTermArea = true;
    }

    const shadedTermAreaText =
        'Babies born in this shaded area\nare term. It is normal for\nbabies to lose weight over\nthe first two weeks of life.\nMedical review should be sought\nif weight has dropped by more\nthan 10% of birth weight or\nweight is still below birth weight\nthree weeks after birth.';

    /*
  if measurements are provided to plot, test if corrected and chronological ages are different
  if they differ then both chronological and corrected ages need plotting, so the radio buttons must be visible
  If there is plottable data preterm or < 3/12 of age then only render the preterm chart
  if there is plottable data preterm/term, but also plottabled data that is older, show the child chart
  */

    useEffect(() => {
        let ignore = false;
        getDomainsAndData(
            childMeasurements,
            sex,
            measurementMethod,
            reference,
            showCorrectedAge,
            showChronologicalAge,
            false,
        )
            .then((results: ComputedData) => {
                if (!ignore) {
                    setInternalData(results);
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                throw new Error(error.message);
            });
        return () => {
            ignore = true;
        };
    }, [sex, measurementMethod, reference, childMeasurements, showCorrectedAge, showChronologicalAge]);

    const onSelectRadioButton = (event) => {
        switch (event.target.value) {
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
    };

    if (isLoading) {
        return (
            <LoadingDiv height={chartStyle.height} width={chartStyle.width}>
                <LoadingH1>Loading...</LoadingH1>
            </LoadingDiv>
        );
    }

    return (
        <div data-testid="CentileChart" className="centred">
            {/* The VictoryChart is the parent component. It contains a Voronoi container, which groups data sets together for the purposes of tooltips */}
            {/* It has an animation object and the domains are the thresholds of ages rendered. This is calculated from the child data supplied by the user. */}
            {/* Tooltips are here as it is the parent component. More information of tooltips in centiles below. */}

            <div className="flex-center-vertically">
                <img src={icon} width={32} height={32} />
            </div>

            <VictoryChart
                width={chartStyle.width}
                height={chartStyle.height}
                padding={{
                    left: chartStyle.padding.left,
                    right: chartStyle.padding.right,
                    top: chartStyle.padding.top,
                    bottom: chartStyle.padding.bottom,
                }}
                style={{
                    background: {
                        fill: chartStyle.backgroundColour,
                    },
                }}
                domain={domains}
                containerComponent={
                    <VictoryVoronoiContainer
                        labelComponent={
                            <VictoryTooltip
                                constrainToVisibleArea
                                pointerLength={5}
                                cornerRadius={0}
                                flyoutStyle={{
                                    stroke: chartStyle.tooltipStroke,
                                    fill: chartStyle.tooltipBackgroundColour,
                                }}
                                style={{
                                    textAnchor: 'start',
                                    stroke: chartStyle.tooltipTextStyle.colour,
                                    strokeWidth: chartStyle.tooltipTextStyle.size,
                                    fill: chartStyle.tooltipTextStyle.colour,
                                    fontFamily: chartStyle.tooltipTextStyle.name,
                                }}
                            />
                        }
                        labels={({ datum }) => {
                            return tooltipText(
                                reference,
                                datum.l,
                                measurementMethod,
                                datum.x,
                                datum.age_type,
                                datum.centile_band,
                                datum.calendar_age,
                                datum.corrected_gestational_age,
                                datum.y,
                                datum.observation_value_error,
                                datum.age_error,
                                datum.lay_comment,
                                showCorrectedAge,
                                showChronologicalAge,
                            );
                        }}
                        voronoiBlacklist={['linkLine']}
                    />
                }
            >
                {/* the legend postion must be hard coded. It automatically reproduces and labels each series - this is hidden with data: fill: "transparent" */}
                <VictoryLegend
                    title={[title, subtitle]}
                    centerTitle
                    titleOrientation="top"
                    orientation="horizontal"
                    style={{
                        data: {
                            fill: 'transparent',
                        },
                        title: {
                            fontFamily: chartStyle.titleStyle.name,
                            color: chartStyle.titleStyle.colour,
                            fontSize: chartStyle.titleStyle.size,
                            fontWeight: chartStyle.titleStyle.weight,
                        },
                    }}
                    x={chartStyle.width / 2 - 50}
                    y={0}
                    data={[]}
                />
                {
                    /* Term child shaded area: */

                    showTermArea && (
                        <VictoryArea
                            style={{ data: { fill: chartStyle.termFill } }}
                            data={[
                                {
                                    x: -0.057494866529774126,
                                    y: domains.y[1],
                                    y0: domains.y[0],
                                    l: shadedTermAreaText,
                                },
                                { x: 0, y: domains.y[1], y0: domains.y[0], l: shadedTermAreaText },
                                {
                                    x: 0.038329911019849415,
                                    y: domains.y[1],
                                    y0: domains.y[0],
                                    l: shadedTermAreaText,
                                },
                            ]}
                        />
                    )
                }

                {/* X axis: */}
                <VictoryAxis
                    label={xAxisLabel(chartScaleType, domains)}
                    style={{
                        axis: {
                            stroke: axisStyle.axisStroke,
                            strokeWidth: 1.0,
                        },
                        axisLabel: {
                            fontSize: axisStyle.axisLabelTextStyle.size,
                            padding: 20,
                            color: axisStyle.axisLabelTextStyle.colour,
                            fontFamily: axisStyle.axisLabelTextStyle.name,
                        },
                        ticks: {
                            stroke: axisStyle.tickLabelTextStyle.colour,
                        },
                        tickLabels: {
                            fontSize: axisStyle.tickLabelTextStyle.size,
                            padding: 5,
                            color: axisStyle.tickLabelTextStyle.colour,
                            fontFamily: axisStyle.axisLabelTextStyle.name,
                        },
                        grid: {
                            stroke: gridlineStyle.gridlines ? gridlineStyle.stroke : null,
                            strokeWidth: ({ t }) =>
                                t % 5 === 0 ? gridlineStyle.strokeWidth + 0.5 : gridlineStyle.strokeWidth,
                            strokeDasharray: gridlineStyle.dashed ? '5 5' : '',
                        },
                    }}
                    tickValues={tailoredXTickValues[chartScaleType]}
                    tickLabelComponent={
                        <RenderTickLabel
                            style={{
                                fill: axisStyle.tickLabelTextStyle?.colour,
                                fontSize: axisStyle.tickLabelTextStyle?.size,
                                fontFamily: axisStyle.tickLabelTextStyle?.name,
                            }}
                            chartScaleType={chartScaleType}
                            domains={domains}
                        />
                    }
                    gridComponent={<CustomGridComponent chartScaleType={chartScaleType} />}
                />

                {
                    /* render the y axis */
                    <VictoryAxis
                        minDomain={0}
                        label={yAxisLabel(measurementMethod)}
                        style={{
                            axis: {
                                stroke: axisStyle.axisStroke,
                                strokeWidth: 1.0,
                            },
                            axisLabel: {
                                fontSize: axisStyle.axisLabelTextStyle.size,
                                padding: 20,
                                color: axisStyle.axisLabelTextStyle.colour,
                                fontFamily: axisStyle.axisLabelTextStyle.name,
                            },
                            ticks: {
                                stroke: axisStyle.tickLabelTextStyle.colour,
                            },
                            tickLabels: {
                                fontSize: axisStyle.tickLabelTextStyle.size,
                                padding: 5,
                                color: axisStyle.tickLabelTextStyle.colour,
                                fontFamily: axisStyle.axisLabelTextStyle.name,
                            },
                            grid: {
                                stroke: gridlineStyle.gridlines ? gridlineStyle.stroke : null,
                                strokeWidth: ({ t }) =>
                                    t % 5 === 0 ? gridlineStyle.strokeWidth + 0.5 : gridlineStyle.strokeWidth,
                                strokeDasharray: gridlineStyle.dashed ? '5 5' : '',
                            },
                        }}
                        dependentAxis
                    />
                }

                {
                    // puberty threshold lines uk90:
                    reference === 'uk-who' &&
                        measurementMethod === 'height' &&
                        pubertyThresholds.map((dataArray) => {
                            if (dataArray[0].x > domains.x[0] && dataArray[1].x < domains.x[1]) {
                                return (
                                    <VictoryLine
                                        key={dataArray[0].x}
                                        name={`puberty-${dataArray[0].x}`}
                                        style={{
                                            data: {
                                                stroke: measurementStyle.measurementFill,
                                                strokeWidth: 1,
                                            },
                                        }}
                                        data={dataArray}
                                        labels={({ datum }) => datum.label}
                                        labelComponent={
                                            <VictoryLabel
                                                textAnchor="start"
                                                angle={-90}
                                                dx={5}
                                                dy={10}
                                                style={{
                                                    fontSize: 8,
                                                    color: axisStyle.axisLabelTextStyle.colour,
                                                    fontFamily: axisStyle.axisLabelTextStyle.name,
                                                    textAlign: 'start',
                                                }}
                                            />
                                        }
                                    />
                                );
                            } else {
                                return null;
                            }
                        })
                }

                {/* This is the shaded area below the 0.4th centile in late childhood/early adolescence */}
                {/* Any measurements plotting here are likely due to delayed puberty */}
                {/* The upper border is the 0.4th centile so this must come before the centiles */}

                {
                    // delayed puberty area:
                    reference === 'uk-who' && measurementMethod === 'height' && (
                        <VictoryArea
                            data={delayedPubertyThreshold(sex)}
                            y0={lowerPubertyBorder}
                            style={{
                                data: {
                                    stroke: centileStyle.delayedPubertyAreaFill,
                                    fill: centileStyle.delayedPubertyAreaFill,
                                    strokeWidth: centileStyle.centileStrokeWidth,
                                },
                            }}
                            name="delayed"
                        />
                    )
                }

                {/* Render the centiles - loop through the data set, create a line for each centile */}
                {/* On the old charts the 50th centile was thicker and darker and this lead parents to believe it was therefore */}
                {/* the line their children should follow. This was a design mistake, since it does not matter which line the child is on  */}
                {/* so long as they follow it. The middle line was therefore 'deemphasised' on the newer charts. */}
                {/* For each reference data set, there are 9 centiles. The 0.4th, 9th, 50th, 91st, 99.6th are all dashed. */}
                {/* The 2nd, 25th, 75th, 98th are all continuous lines. As there are 4 datasets, this means 36 separate line series to render. */}
                {/* It is essential each centile from each reference is plotted as a series to prevent interpolation between centiles of one reference  */}
                {/* and centiles of another. The discontinuos lines reflect the transition between references and are essential */}
                {/* One final line is the VictoryArea, which represents the shaded area at the onset of puberty. Children that plot here */}
                {/* will have delayed puberty. */}
                {/* Tooltips are found in the parent element (VictoryChart). Tooltips included: */}
                {/* 1 for each centile, 1 for the shaded area, 1 at 2years to indicate children are measured standing leading */}
                {/* to a step down in height weight and bmi in the data set. There is another tool tip at 4 years to indicate transition from datasets. */}

                {centileData &&
                    centileData.map((referenceData, index) => {
                        // UK-WHO - 3 references
                        return (
                            <VictoryGroup key={index}>
                                {referenceData.map((centile: ICentile, centileIndex: number) => {
                                    if (centileIndex % 2 === 0) {
                                        // even index - centile is dashed
                                        return (
                                            <VictoryLine
                                                key={centile.centile + '-' + centileIndex}
                                                padding={{ top: 20, bottom: 60 }}
                                                data={centile.data}
                                                style={{
                                                    data: {
                                                        stroke: centileStyle.centileStroke,
                                                        strokeWidth: centileStyle.centileStrokeWidth,
                                                        strokeLinecap: 'round',
                                                        strokeDasharray: '5 5',
                                                    },
                                                }}
                                            />
                                        );
                                    } else {
                                        // uneven index - centile is continuous
                                        return (
                                            <VictoryLine
                                                key={centile.centile + '-' + centileIndex}
                                                padding={{ top: 20, bottom: 60 }}
                                                data={centile.data}
                                                style={{
                                                    data: {
                                                        stroke: centileStyle.centileStroke,
                                                        strokeWidth: centileStyle.centileStrokeWidth,
                                                        strokeLinecap: 'round',
                                                    },
                                                }}
                                            />
                                        );
                                    }
                                })}
                            </VictoryGroup>
                        );
                    })}

                {/* create a series for each child measurements datapoint: a circle for chronological age, a cross for corrected - if the chronological and corrected age are the same, */}
                {/* the removeCorrectedAge function removes the corrected age to prevent plotting a circle on a cross, and having duplicate */}
                {/* text in the tool tip */}

                {childMeasurements.map((childMeasurement: Measurement, index) => {
                    if (!showCorrectedAge && !showChronologicalAge) {
                        return null;
                    }
                    return (
                        <VictoryGroup key={'measurement' + index}>
                            {showCorrectedAge && (
                                <VictoryScatter // corrected age - a custom component that renders a dot or a cross
                                    data={[childMeasurement.plottable_data.centile_data.corrected_decimal_age_data]}
                                    dataComponent={
                                        <XPoint
                                            showChronologicalAge={showChronologicalAge}
                                            showCorrectedAge={showCorrectedAge}
                                        />
                                    }
                                    style={{
                                        data: {
                                            fill: measurementStyle.measurementFill,
                                            strokeWidth: measurementStyle.measurementSize,
                                        },
                                    }}
                                    name="corrected_age"
                                />
                            )}

                            {showChronologicalAge && (
                                <VictoryScatter // chronological age
                                    data={[childMeasurement.plottable_data.centile_data.chronological_decimal_age_data]}
                                    symbol="circle"
                                    style={{
                                        data: {
                                            fill: measurementStyle.measurementFill,
                                            strokeWidth: measurementStyle.measurementSize,
                                        },
                                    }}
                                    name="chronological"
                                />
                            )}

                            {showChronologicalAge &&
                                showCorrectedAge && ( // only show the line if both cross and dot are rendered
                                    <VictoryLine
                                        name="linkLine"
                                        style={{
                                            data: {
                                                stroke: measurementStyle.measurementFill,
                                                strokeWidth: 1.25,
                                            },
                                        }}
                                        data={[
                                            childMeasurement.plottable_data.centile_data.chronological_decimal_age_data,
                                            childMeasurement.plottable_data.centile_data.corrected_decimal_age_data,
                                        ]}
                                    />
                                )}
                        </VictoryGroup>
                    );
                })}
            </VictoryChart>

            {showToggle && (
                <span style={{ display: 'inline-block' }}>
                    <StyledRadioButtonGroup
                        activeColour={chartStyle.toggleButtonActiveColour}
                        inactiveColour={chartStyle.toggleButtonInactiveColour}
                        textColour={chartStyle.toggleButtonTextColour}
                        handleClick={onSelectRadioButton}
                        correctedAge={showCorrectedAge}
                        chronologicalAge={showChronologicalAge}
                        className="PretermToggle"
                    />
                </span>
            )}
        </div>
    );
}

const StyledButton = styled.button<{
    activeColour: string;
    inactiveColour: string;
    textColour: string;
    preterm: boolean;
}>`
    background-color: ${(props) => props.inactiveColour};
    margin: 5px 5px;
    border: 2px solid ${(props) => props.inactiveColour};
    padding: 4px 11px;
    font-family: Arial;
    font-size: 16px;
    color: ${(props) => props.textColour};
    &:hover {
        background-color: ${(props) => props.activeColour};
        color: ${(props) => props.textColour};
        border: 2px solid ${(props) => props.activeColour};
    }
    &:focus {
        outline: ${(props) => props.activeColour} solid 2px;
    }
`;

const PretermChildButton = (props) => {
    return (
        <StyledButton
            onClick={props.handleClick}
            className={props.className}
            activeColour={props.activeColour}
            inactiveColour={props.inactiveColour}
            textColour={props.textColour}
            preterm={props.showPretermChart}
        >
            {props.showPretermChart ? 'Show Child Chart' : 'Show Preterm Chart'}
        </StyledButton>
    );
};

const LoadingDiv = styled.div<{ width: number; height: number }>`
    height: ${({ height }) => height}px;
    width: ${({ width }) => width}px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LoadingH1 = styled.h1`
    text-align: center;
`;

const AgeRadioButtonGroup = (props) => {
    return (
        <div className={props.className} onChange={props.handleClick}>
            <input
                type="radio"
                id="adjusted"
                value="adjusted"
                name="adjustments"
                defaultChecked={props.correctedAge && props.chronologicalAge === false}
            />
            <label htmlFor="adjusted">Adjusted Age</label>
            <input
                type="radio"
                id="unadjusted"
                value="unadjusted"
                name="adjustments"
                defaultChecked={props.chronologicalAge && props.correctedAge === false}
            />
            <label htmlFor="unadjusted">Unadjusted Age</label>
            <input
                type="radio"
                id="both"
                value="both"
                name="adjustments"
                defaultChecked={props.correctedAge === props.chronologicalAge}
            />
            <label htmlFor="both">Both Ages</label>
        </div>
    );
};

const StyledRadioButtonGroup = styled(AgeRadioButtonGroup)<{
    activeColour: string;
    inactiveColour: string;
    textColour: string;
    className: string;
}>`
    label {
        display: inline-block;
        padding: 4px 11px;
        font-family: Arial;
        font-size: 16px;
        cursor: pointer;
        background-color: ${(props) => props.inactiveColour};
        color: ${(props) => props.textColour};
        width: 170px;
    }
    input[type='radio']:checked + label {
        color: ${(props) => props.textColour};
        background-color: ${(props) => props.activeColour};
    }
    input[type='radio'] {
        display: none;
    }
`;

export default CentileChart;
