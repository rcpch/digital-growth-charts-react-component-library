// libraries and frameworks
import React from "react";
import { 
    VictoryAxis, 
    VictoryChart, 
    VictoryGroup, 
    VictoryScatter, 
    VictoryLine } from "victory";

// interfaces and props
import { SDSChartProps } from "./SDSChart.types";
import { Domains } from '../interfaces/Domains';

// components
import { MainContainer } from "../SubComponents/MainContainer";
import { LogoContainer } from "../SubComponents/LogoContainer";
import { TitleContainer } from "../SubComponents/TitleContainer";
import { ChartTitle } from "../SubComponents/ChartTitle";
import icon from '../images/icon.png';

// style sheets
import "./SDSChart.scss";

const SDSChart: React.FC<SDSChartProps> = (
    { 
        reference,
        title,
        subtitle,
        sex,
        childMeasurements,
        midParentalHeightData,
        enableZoom,
        styles,
    }
) => {

    const childMeasurementsByType = [{measurementType: "height", measurementTypeData: childMeasurements.height}, {measurementType: "weight", measurementTypeData: childMeasurements.weight}, {measurementType: "bmi", measurementTypeData: childMeasurements.bmi}, {measurementType: "ofc", measurementTypeData: childMeasurements.ofc}];

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
        >
            <VictoryAxis crossAxis 
                standalone={false}
                style={styles.xAxis}
            />
            <VictoryAxis crossAxis dependentAxis
                style={styles.yAxis}
                standalone={false}
            />

            {/* 
                Measurements by type - loops through the measurement data provided by the API, first by measurement type,
                then by data point.
            */}

            { childMeasurementsByType.map((measurementTypeItem, itemIndex) =>
                {
                    return measurementTypeItem.measurementTypeData.map((measurement, index) => {
                        const chronData: any = {
                            ...measurement.plottable_data.sds_data.chronological_decimal_age_data,
                        };
                        const correctData: any = {
                            ...measurement.plottable_data.sds_data.corrected_decimal_age_data,
                        };
                        const dataColours = [
                            {datapoint_measurementMethod: "height", datapoint_colour: "red"},
                            {datapoint_measurementMethod: "weight", datapoint_colour: "blue "},
                            {datapoint_measurementMethod: "height", datapoint_colour: "green"},
                            {datapoint_measurementMethod: "height", datapoint_colour: "yellow"},
                        ]
                        const dataColour = dataColours[itemIndex].datapoint_colour;
                        return (
                            <VictoryGroup
                                key={measurementTypeItem.measurementType+"-"+index}
                            >
                                <VictoryScatter
                                    data={[chronData]}
                                    symbol="circle"
                                    style={{
                                        data: {
                                            fill: dataColour
                                        }
                                    }}
                                    name={"chronological-"+measurementTypeItem.measurementType}
                                />
                                {/* <VictoryScatter
                                    data={[correctData]}
                                    symbol="circle"
                                    style={styles.measurementPoint}
                                    name={"chronological-"+measurementTypeItem.measurementType}
                                /> */}
                                <VictoryLine
                                    name="linkLine"
                                    style={styles.measurementLinkLine}
                                    data={[chronData, correctData]}
                                />
                            </VictoryGroup>
                        )
                    });
                })
            }

        </VictoryChart>
    </MainContainer>
)
};

export default SDSChart;

