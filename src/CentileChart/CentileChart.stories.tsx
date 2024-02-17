// Generated with util/create-component.js
import * as React from "react";
import CentileChart from "./CentileChart";
import { monochromeStyles } from "../testParameters/styles/monochromeStyles";
import { rcpch1Styles } from "../testParameters/styles/rcpch1Styles";
import { rcpch2Styles } from "../testParameters/styles/rcpch2Styles";
import { rcpch3Styles } from "../testParameters/styles/rcpch3Styles";
import { twoHeightMeasurements } from "../testParameters/measurements/twoHeightMeasurements"
import { twoToEight } from "../testParameters/measurements/twoToEight"
import { prematureThreeMonths } from "../testParameters/measurements/prematureThreeMonths"
import { smallChildJustOverTwo } from "../testParameters/measurements/smallChildJustOverTwo"
import { prematureTwentyTwoWeeksWeight } from "../testParameters/measurements/prematureTwentyTwoWeeks"
import { prematureTwentyTwoWeeksHeight } from "../testParameters/measurements/prematureTwentyTwoWeeksHeight"
import { prematureTwentyTwoWeeksOFC } from "../testParameters/measurements/prematureTwentyTwoWeeksOFC"

export default {
    title: "CentileChart"
};

export const WithHeightAndNoData = () => (
    <CentileChart 
        chartsVersion="testChart"
        reference="uk-who"
        title="Simon"
        subtitle="rules"
        measurementMethod="height"
        sex="male"
        childMeasurements={[]}
        midParentalHeightData={midParentalHeights}
        enableZoom={true}
        styles={rcpch2Styles}
        enableExport={true}
        exportChartCallback={()=>null}
        clinicianFocus={true}
        showCentileLabels={true}
        showSDSLabels={true}
    />
);

export const WithTurnerHeightAndNoData = () => (
    <CentileChart 
        chartsVersion="testChart"
        reference="turner"
        title="Simon"
        subtitle="rules"
        measurementMethod="height"
        sex="female"
        childMeasurements={[]}
        midParentalHeightData={midParentalHeights}
        enableZoom={true}
        styles={rcpch3Styles}
        enableExport={true}
        exportChartCallback={()=>null}
        clinicianFocus={true}
        showCentileLabels={true}
        showSDSLabels={true}
    />
);

export const WithWeightAndNoData = () => (
    <CentileChart 
        chartsVersion="bar"
        reference="uk-who"
        title="Simon"
        subtitle="rules"
        measurementMethod="weight"
        sex="male"
        childMeasurements={[]}
        midParentalHeightData={midParentalHeights}
        enableZoom={true}
        styles={rcpch3Styles}
        enableExport={true}
        exportChartCallback={()=>null}
        clinicianFocus={true}
        showCentileLabels={true}
        showSDSLabels={true}
    />
);

export const WithBMIAndNoData = () => (
    <CentileChart 
        chartsVersion="bar"
        reference="uk-who"
        title="Simon"
        subtitle="rules"
        measurementMethod="bmi"
        sex="female"
        childMeasurements={[]}
        midParentalHeightData={midParentalHeights}
        enableZoom={true}
        styles={monochromeStyles}
        enableExport={true}
        exportChartCallback={()=>null}
        clinicianFocus={true}
        showCentileLabels={true}
        showSDSLabels={true}
    />
);

export const WithOFCAndNoData = () => (
    <CentileChart 
        chartsVersion="bar"
        reference="uk-who"
        title="Simon"
        subtitle="rules"
        measurementMethod="ofc"
        sex="female"
        childMeasurements={[]}
        midParentalHeightData={midParentalHeights}
        enableZoom={true}
        styles={monochromeStyles}
        enableExport={true}
        exportChartCallback={()=>null}
        clinicianFocus={true}
        showCentileLabels={true}
        showSDSLabels={true}
    />
);

export const WithPrematureFemaleHeights = () => (
    <CentileChart 
        chartsVersion="bar"
        reference="uk-who"
        title="Simon"
        subtitle="rules"
        measurementMethod="height"
        sex="female"
        childMeasurements={prematureThreeMonths}
        midParentalHeightData={midParentalHeights}
        enableZoom={true}
        styles={monochromeStyles}
        enableExport={true}
        exportChartCallback={()=>null}
        clinicianFocus={true}
        showCentileLabels={true}
        showSDSLabels={true}
    />
);

export const WithMeasurementsFromBirthOverTwoYears = () => (
    <CentileChart 
        chartsVersion="bar"
        reference="uk-who"
        title="Simon"
        subtitle="rules"
        measurementMethod="height"
        sex="male"
        childMeasurements={smallChildJustOverTwo}
        midParentalHeightData={midParentalHeights}
        enableZoom={true}
        styles={monochromeStyles}
        enableExport={true}
        exportChartCallback={()=>null}
        clinicianFocus={true}
        showCentileLabels={true}
        showSDSLabels={true}
    />
);

export const WithMeasurementsAtExtremePrematurityWeight = () => (
    <CentileChart 
        chartsVersion="bar"
        reference="uk-who"
        title="Simon"
        subtitle="rules"
        measurementMethod="weight"
        sex="female"
        childMeasurements={prematureTwentyTwoWeeksWeight}
        midParentalHeightData={midParentalHeights}
        enableZoom={true}
        styles={rcpch1Styles}
        enableExport={true}
        exportChartCallback={()=>null}
        clinicianFocus={true}
        showCentileLabels={true}
        showSDSLabels={true}
    />
);

export const WithMeasurementsAtExtremePrematurity = () => (
    <CentileChart 
        chartsVersion="bar"
        reference="uk-who"
        title="Simon"
        subtitle="rules"
        measurementMethod="height"
        sex="female"
        childMeasurements={prematureTwentyTwoWeeksHeight}
        midParentalHeightData={midParentalHeights}
        enableZoom={true}
        styles={rcpch1Styles}
        enableExport={true}
        exportChartCallback={()=>null}
        clinicianFocus={true}
        showCentileLabels={true}
        showSDSLabels={true}
    />
);

export const WithMeasurementsAtExtremePrematurityOFC = () => (
    <CentileChart 
        chartsVersion="bar"
        reference="uk-who"
        title="Simon"
        subtitle="rules"
        measurementMethod="ofc"
        sex="female"
        childMeasurements={prematureTwentyTwoWeeksOFC}
        midParentalHeightData={midParentalHeights}
        enableZoom={true}
        styles={rcpch1Styles}
        enableExport={true}
        exportChartCallback={()=>null}
        clinicianFocus={true}
        showCentileLabels={true}
        showSDSLabels={true}
    />
);

export const WithMeasurementsToNineYears = () => (
    <CentileChart 
        chartsVersion="baz"
        reference="uk-who"
        title={"Simon "+monochromeStyles.chartHeight + `${monochromeStyles.chartWidth}`}
        subtitle="rules"
        measurementMethod="height"
        sex="female"
        childMeasurements={twoToEight}
        midParentalHeightData={midParentalHeights}
        enableZoom={true}
        styles={monochromeStyles}
        enableExport={true}
        exportChartCallback={()=>null}
        clinicianFocus={true}
        showCentileLabels={true}
        showSDSLabels={true}
    />
);

export const WithExtremePrematureFemaleHeights = () => (
    <CentileChart 
        chartsVersion="baz"
        reference="uk-who"
        title={"Simon"}
        subtitle="rules"
        measurementMethod="height"
        sex="female"
        childMeasurements={prematureTwentyTwoWeeksHeight}
        midParentalHeightData={midParentalHeights}
        enableZoom={true}
        styles={rcpch3Styles}
        enableExport={true}
        exportChartCallback={()=>null}
        clinicianFocus={true}
        showCentileLabels={true}
        showSDSLabels={true}
    />
);


// props

const midParentalHeights = {}