// Generated with util/create-component.js
import * as React from 'react';
import CentileChart from './CentileChart';
import RCPCHChart from '../RCPCHChart';
import { monochromeStyles } from '../testParameters/styles/monochromeStyles';
import { rcpch1Styles } from '../testParameters/styles/rcpch1Styles';
import { rcpch2Styles } from '../testParameters/styles/rcpch2Styles';
import { rcpch3Styles } from '../testParameters/styles/rcpch3Styles';
import { traditionalBoysStyles } from '../testParameters/styles/traditionalBoysStyles';
import { termGirlWithSingleHeightMeasurementAndBoneAgeAndEvent } from '../testParameters/measurements/termGirlWithSingleHeightMeasurementAndBoneAgeAndEvent';
import { twoWeightMeasurements } from '../testParameters/measurements/twoWeightMeasurements';
import { twoToEight } from '../testParameters/measurements/twoToEight';
import { twoToEightWeight } from '../testParameters/measurements/twoToEightWeight';
import { twoToEightOFC } from '../testParameters/measurements/twoToEightOFC';
import { twoToEightGirlBMI } from '../testParameters/measurements/twoToEightYearsGirlBMI';
import { prematureThreeMonths } from '../testParameters/measurements/prematureThreeMonths';
import { smallChildJustOverTwo } from '../testParameters/measurements/smallChildJustOverTwo';
import { prematureTwentyTwoWeeksWeight } from '../testParameters/measurements/prematureTwentyTwoWeeks';
import { prematureTwentyTwoWeeksHeight } from '../testParameters/measurements/prematureTwentyTwoWeeksHeight';
import { prematureTwentyTwoWeeksOFC } from '../testParameters/measurements/prematureTwentyTwoWeeksOFC';
import { prematureGirlOverThreeHeight } from '../testParameters/measurements/prematureGirlOverThreeHeight';
import { prematureGirlOverFourHeight } from '../testParameters/measurements/prematureGirlOverFourHeight';
import { termToAYearGirlHeight } from '../testParameters/measurements/termToAYearGirlHeight';
import { termToTwoYearsGirlHeight } from '../testParameters/measurements/termToTwoYearsGirlHeight';
import { termToOverFourYearsGirlHeight } from '../testParameters/measurements/termToOverFourYearsGirlHeight';
import { turnerHeightOneYearToEleven } from '../testParameters/measurements/turnerHeightOneYearToEleven';
import { beforeDueDateError } from '../testParameters/measurements/beforeDueDateError';
import { termBabyGirlWeight } from '../testParameters/measurements/termBabyGirlWeight';

export default {
    title: 'CentileChart',
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
        styles={traditionalBoysStyles}
        enableExport={true}
        exportChartCallback={() => null}
        clinicianFocus={true}
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
        exportChartCallback={() => null}
        clinicianFocus={true}
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
        exportChartCallback={() => null}
        clinicianFocus={true}
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
        exportChartCallback={() => null}
        clinicianFocus={true}
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
        exportChartCallback={() => null}
        clinicianFocus={true}
    />
);

export const WithTermBoyAndSingleHeightMeasurementAndBoneAgeAndEvent = () => (
    <CentileChart
        chartsVersion="bar"
        reference="uk-who"
        title="Simon"
        subtitle="rules"
        measurementMethod="height"
        sex="female"
        childMeasurements={termGirlWithSingleHeightMeasurementAndBoneAgeAndEvent}
        midParentalHeightData={midParentalHeights}
        enableZoom={true}
        styles={rcpch2Styles}
        enableExport={true}
        exportChartCallback={() => null}
        clinicianFocus={true}
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
        exportChartCallback={() => null}
        clinicianFocus={true}
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
        exportChartCallback={() => null}
        clinicianFocus={true}
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
        exportChartCallback={() => null}
        clinicianFocus={true}
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
        exportChartCallback={() => null}
        clinicianFocus={true}
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
        exportChartCallback={() => null}
        clinicianFocus={true}
    />
);

export const WithHeightMeasurementsTwoToEightYears = () => (
    <CentileChart
        chartsVersion="baz"
        reference="uk-who"
        title={'Height Girl Two to Eight y'}
        subtitle="rules"
        measurementMethod="height"
        sex="female"
        childMeasurements={twoToEight}
        midParentalHeightData={midParentalHeights}
        enableZoom={true}
        styles={monochromeStyles}
        enableExport={true}
        exportChartCallback={() => null}
        clinicianFocus={true}
    />
);

export const WithWeightMeasurementsTwoToEightYears = () => (
    <CentileChart
        chartsVersion="baz"
        reference="uk-who"
        title={'Weight Two to Nine Boy'}
        subtitle="UK-WHO"
        measurementMethod="weight"
        sex="male"
        childMeasurements={twoToEightWeight}
        midParentalHeightData={midParentalHeights}
        enableZoom={true}
        styles={monochromeStyles}
        enableExport={true}
        exportChartCallback={() => null}
        clinicianFocus={true}
    />
);

export const WithOFCMeasurementsTwoToEightYears = () => (
    <CentileChart
        chartsVersion="baz"
        reference="uk-who"
        title={'OFC Two to Nine Boy'}
        subtitle="UK-WHO"
        measurementMethod="ofc"
        sex="female"
        childMeasurements={twoToEightOFC}
        midParentalHeightData={midParentalHeights}
        enableZoom={true}
        styles={monochromeStyles}
        enableExport={true}
        exportChartCallback={() => null}
        clinicianFocus={true}
    />
);

export const WithBMIMeasurementsTwoToEightYears = () => (
    <CentileChart
        chartsVersion="7.0.0"
        reference="uk-who"
        title={'BMI Two to Nine Girl'}
        subtitle="UK-WHO"
        measurementMethod="bmi"
        sex="female"
        childMeasurements={twoToEightGirlBMI}
        midParentalHeightData={midParentalHeights}
        enableZoom={true}
        styles={monochromeStyles}
        enableExport={true}
        exportChartCallback={() => null}
        clinicianFocus={true}
    />
);

export const WithExtremePrematureFemaleHeights = () => (
    <CentileChart
        chartsVersion="baz"
        reference="uk-who"
        title={'Simon'}
        subtitle="rules"
        measurementMethod="height"
        sex="female"
        childMeasurements={prematureTwentyTwoWeeksHeight}
        midParentalHeightData={midParentalHeights}
        enableZoom={true}
        styles={rcpch3Styles}
        enableExport={true}
        exportChartCallback={() => null}
        clinicianFocus={true}
    />
);

export const WithPrematureGirlOverThreeHeight = () => (
    <CentileChart
        chartsVersion="7.0.0"
        reference="uk-who"
        title="Premature Girl"
        subtitle="Height over 3y"
        measurementMethod="height"
        sex="female"
        childMeasurements={prematureGirlOverThreeHeight}
        midParentalHeightData={midParentalHeights}
        enableZoom={true}
        styles={rcpch3Styles}
        enableExport={true}
        exportChartCallback={() => null}
        clinicianFocus={true}
    />
);

export const WithPrematureGirlOverFourHeight = () => (
    <CentileChart
        chartsVersion="7.0.0"
        reference="uk-who"
        title="Premature Girl"
        subtitle="Height over 4y"
        measurementMethod="height"
        sex="female"
        childMeasurements={prematureGirlOverFourHeight}
        midParentalHeightData={midParentalHeights}
        enableZoom={true}
        styles={rcpch3Styles}
        enableExport={true}
        exportChartCallback={() => null}
        clinicianFocus={true}
    />
);

export const WithTermToAYearGirlHeight = () => (
    <CentileChart
        chartsVersion="7.0.0"
        reference="uk-who"
        title="Term Girl"
        subtitle="Height to a year"
        measurementMethod="height"
        sex="female"
        childMeasurements={termToAYearGirlHeight}
        midParentalHeightData={midParentalHeights}
        enableZoom={true}
        styles={rcpch3Styles}
        enableExport={true}
        exportChartCallback={() => null}
        clinicianFocus={true}
    />
);

export const WithTermToTwoYearsGirlHeight = () => (
    <CentileChart
        chartsVersion="7.0.0"
        reference="uk-who"
        title="Term Girl"
        subtitle="Height to two years"
        measurementMethod="height"
        sex="female"
        childMeasurements={termToTwoYearsGirlHeight}
        midParentalHeightData={midParentalHeights}
        enableZoom={true}
        styles={rcpch3Styles}
        enableExport={true}
        exportChartCallback={() => null}
        clinicianFocus={true}
    />
);

export const WithTermToOverFourYearsGirlHeight = () => (
    <CentileChart
        chartsVersion="7.0.0"
        reference="uk-who"
        title="Term Girl"
        subtitle="Height to over four years"
        measurementMethod="height"
        sex="female"
        childMeasurements={termToOverFourYearsGirlHeight}
        midParentalHeightData={midParentalHeights}
        enableZoom={true}
        styles={rcpch3Styles}
        enableExport={true}
        exportChartCallback={() => null}
        clinicianFocus={true}
    />
);

export const WithTurnerFemaleHeights = () => (
    <CentileChart
        chartsVersion="7.0.0"
        reference="turner"
        title="Turner Syndrome Child"
        subtitle="One to Eleven years"
        measurementMethod="height"
        sex="female"
        childMeasurements={turnerHeightOneYearToEleven}
        midParentalHeightData={midParentalHeights}
        enableZoom={true}
        styles={rcpch3Styles}
        enableExport={true}
        exportChartCallback={() => null}
        clinicianFocus={true}
    />
);

export const WithBeforeDueDateError = () => (
    <CentileChart
        chartsVersion="7.0.0"
        reference="uk-who"
        title="UKWHO Child"
        subtitle="Premature Girl"
        measurementMethod="height"
        sex="female"
        childMeasurements={beforeDueDateError}
        midParentalHeightData={midParentalHeights}
        enableZoom={true}
        styles={rcpch1Styles}
        enableExport={true}
        exportChartCallback={() => null}
        clinicianFocus={true}
    />
);

export const WithTermBabyGirlWeight = () => (
    <CentileChart
        chartsVersion="7.0.0"
        reference="uk-who"
        title="UKWHO Child"
        subtitle="Term Girl"
        measurementMethod="weight"
        sex="female"
        childMeasurements={termBabyGirlWeight}
        midParentalHeightData={midParentalHeights}
        enableZoom={true}
        styles={rcpch3Styles}
        enableExport={true}
        exportChartCallback={() => null}
        clinicianFocus={true}
    />
);

// props

const midParentalHeights = {};
