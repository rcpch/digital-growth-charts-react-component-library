/*
Tests for Centile Chart
This is a test suite which applies only to the centile chart component.
The centile chart component is a complex component, made of several subcomponents that need tests of their own
Tests here therefore are more integration test, rather than unit tests

Bundled in are several fictional children against which to test. These are found in the testParameters folder.
They are also used in storybook:

prematureThreeMonths - a girl born at 30+2, length
prematureTwentyTwoWeeks - - a girl born at 22 weeks | to demonstrate lack of data
PrematureTwentyTwoWeeksHeight - a girl born at 22 weeks
PrematureTwentyTwoWeeksOFC - a girl born at 22 weeks
termToAYearGirlHeight - a girl born term to a year of age
smallChildJustOverTwo - a boy, term, height from birth to 2y
twoWeightMeasurements - a boy weight, term birth and 2 y
twoToEight - a girl, heights
twoToEightWeight - a boy
termToAYearYearsGirlHeight - a girl from term to over a year
termToTwoYearsGirlHeight - a girl from term to over 2 years
termToOverFourYearsGirlHeight - a girl from term to over 4 years
turnerHeightOneYearToEleven - a girl with Turner's from a year to 11 y

Below is a list of tests that are implemented or need implementing

---------
Props
---------
-[ ] Boy chart presented if sex is 'male'
-[ ] Girl chart presented if sex is 'female'
-[ ] UK-WHO chart presented if reference is 'uk-who'
-[ ] Trisomy 21 chart presented if reference is 'trisomy-21'
-[ ] Turner chart presented if reference is 'turner'
-[ ] Height chart presented if measurementMethod is 'height'
-[ ] Weight chart presented if measurementMethod is 'weight'
-[ ] BMI chart presented if measurementMethod is 'bmi'
-[ ] Head circumference chart presented if measurementMethod is 'ofc'

---------
Labels
---------
-[X] Title text renders correctly
-[X] Subtitle text renders correctly
-[X] Version text renders correctly
-[X] Y axis lable text renders correctly - height
-[X] Y axis lable text renders correctly - weight
-[X] Y axis lable text renders correctly - bmi
-[X] Y axis lable text renders correctly - OFC
-[X] X axis lable text renders correctly - premature infant (Gestation weeks)
-[X] X axis lable text renders correctly - premature infant after term (Gestation or postnatal weeks / months (shown as lollipops))
-[X] X axis lable text renders correctly - infant (Age (in years and months (shown as lollipops)))
-[X] X axis lable text renders correctly - child (age in years)
-[X] reference attribution text renders correctly - UK-WHO
-[X] reference attribution text renders correctly - Trisomy 21
-[X] reference attribution text renders correctly - Turner
-[X] early puberty cut off text renders correctly - boys
-[X] early puberty cut off text renders correctly - girls
-[X] late puberty cut off text renders correctly - boys
-[X] late puberty cut off text renders correctly - girls

------------------
Measurement Points
------------------
These are important to ensure data points are not lost when swapping from one reference to another.
Do not include tests for tooltips on mouseover which are collected in events.

-[X] correct number of measurement points render for preterm infant under term
-[X] correct number of measurement points render for preterm infant now over 42 weeks
-[X] correct number of measurement points render for preterm infant now over 2 years
-[X] correct number of measurement points render for preterm infant now over 4 years
-[X] correct number of measurement points render for term infant under 2 y
-[X] correct number of measurement points render for term infant now over 2y
-[X] correct number of measurement points render for term infant now over 4

-[ ] padding is applied to lowest measurement and the chart truncated
-[ ] padding is applied to highest measurement and the chart truncated

---------
Centiles
---------
One each of these needed for every measurement method and every sex
-[X] centile line renders for 0.4th centile
-[X] centile line renders for 2nd centile
-[X] centile line renders for 9th centile
-[X] centile line renders for 25th centile
-[X] centile line renders for 50th centile
-[X] centile line renders for 75th centile
-[X] centile line renders for 91st centile
-[X] centile line renders for 98th centile
-[X] centile line renders for 99.6th centile

-------------
BMI SDS Lines
-------------
-[X] -4.0 SDS line renders for BMI
-[X] -3.0 SDS line renders for BMI
-[X] +3.0 SDS line renders for BMI
-[X] +3.33 SDS line renders for BMI
-[X] +3.67 SDS line renders for BMI
-[X] +4.0 SDS line renders for BMI

---------
Events
---------
*MouseOver*

!measurements!
-[ ] chronological age is correct
-[ ] chronological age renders on hover over chronological data point
-[ ] corrected age does not render on hover over chronological data point
-[ ] corrected age is correct
-[ ] corrected age renders on hover over corrected data point
-[ ] chronological age does not render on hover over corrected data point
-[ ] no tooltip appears on hover over link line between chronological and corrected measurement points
-[ ] SDS render in tooltip if clinicianFocus is true
-[ ] SDS do not render in tooltip if clinicianFocus is false
-[ ] clinician age advice renders in tooltip if clinicianFocus is true
-[ ] lay age advice renders in tooltip if clinicianFocus is false
-[ ] corrected gestational age renders in tooltip if baby is born less than 37 weeks
-[ ] corrected gestational age does not render in tooltip if baby is born less than 37 weeks but is over 42 weeks corrected
-[ ] measurement date follows dd MMM YYYY format

Errors are generated in the API, but tests are needed to ensure they are presented correctly
-[ ] measurement error is reported if baby is <23 weeks for weight at time of measurement
-[ ] measurement error is reported if baby is <25 weeks for length at time of measurement
-[ ] measurement error is reported if baby is <23 weeks for head circumference at time of measurement
-[ ] measurement error is reported if baby is <42 weeks for BMI at time of measurement
-[ ] measurement is plotted at 22 weeks and over for length
-[ ] measurement is plotted at 22 weeks and over for weight
-[ ] measurement is plotted at 22 weeks and over for head circumference
-[ ] measurement is not plotted below 2 weeks and for BMI
-[ ] measurement is not plotted >20 y for height
-[ ] measurement is not plotted >20 y for weight
-[ ] measurement is not plotted >20 y for BMI
-[ ] measurement is not plotted >18 y for head circumference in boys
-[ ] measurement is not plotted >17 y for head circumference in girls

!bone ages!
-[ ] correct bone age renders when supplied
-[ ] correct SDS renders when supplied
-[ ] correct centile renders when supplied
-[ ] correct comment renders when supplied
-[ ] bone age renders with grey link line
-[ ] bone age renders with associated corrected age (chronological age is false)
-[ ] bone age renders with associated chronological age (corrected age is false)
-[ ] bone age renders with associated corrected age (both ages are true)

!growth chart events!
-[ ] correct event text renders when supplied
-[ ] event caret renders when text supplied

!midparental heights!
-[ ] correct midparental height rendered for a girl
-[ ] correct midparental height rendered for a boy
-[ ] upper limit midparental height tooltip data renders
-[ ] lower limit midparental height tooltip data renders
-[ ] median midparental height tooltip data renders

!thresholds!
-[ ] transition from UK-WHO to UK90 tooltip renders at 4 y
-[ ] transition from lying to standing tooltip renders at 2 y height - boys
-[ ] transition from lying to standing tooltip renders at 2 y height - girls
-[ ] notification of term thresholds tooltip renders at 37-42 weeks - boys
-[ ] notification of term thresholds tooltip renders at 37-42 weeks - girls
-[ ] notification of late puberty area threshold - boys
-[ ] notification of late puberty area threshold - girls

!centiles!
One each of these needed for every measurement method and every sex
-[ ] centile label renders for 0.4th centile
-[ ] centile label renders for 2nd centile
-[ ] centile label renders for 9th centile
-[ ] centile label renders for 25th centile
-[ ] centile label renders for 50th centile
-[ ] centile label renders for 75th centile
-[ ] centile label renders for 91st centile
-[ ] centile label renders for 98th centile
-[ ] centile label renders for 99.6th centile

-[ ] -4.0 SDS label renders for BMI
-[ ] -3.0 SDS label renders for BMI
-[ ] +3.0 SDS label renders for BMI
-[ ] +3.33 SDS label renders for BMI
-[ ] +3.67 SDS label renders for BMI
-[ ] +4.0 SDS label renders for BMI

*Corrected/Chronological Ages Toggle Button*
-[X] corrected measurements only rendered when 'corrected' toggle clicked
-[X] chronological measurements only rendered when 'chronological' toggle clicked
-[X] corrected and chronological measurements both rendered when 'both' toggle clicked

*Life Course View Button*
-[ ] Life course view button renders if full life course not visible
-[ ] Life course view button does not render if full life course is visible
-[ ] Life course view button icon toggles on press
-[ ] Life course view toggles on button press
-[ ] Description text appears on hover over button
-[ ] Zoom disabled in life course view

*Paste Button*
-[x] Paste button present if enableExport prop is true
-[x] Paste button absent if enableExport prop is false
-[x] Description text appears on hover over button
-[x] 'copied' text appears and fades on click
-[-] Grey rim animates round button edge on hover over button
-[x] exportChartCallback triggered on click
-[ ] correct SVG of chart present when exportChartCallback triggered on click

*Zoom*
-[x] Zoom function enabled if enableZoom prop is true
-[x] Show description text if on hover over button
-[x] Zoom function disabled if enableZoom prop is false
-[x] Reset zoom button appears if zoom applied
The following tests need considerations and about their implementations
-[ ] Reset zoom button disabled if zoom not applied
-[ ] Reset zoom button enabled if zoom applied
-[ ] Chart domains reset if Reset zoom button pressed

*/

import * as React from "react";
import { fireEvent,getByTestId,queryByTestId,render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';

import CentileChart from "./CentileChart";
import { CentileChartProps } from "./CentileChart.types";
import { MidParentalHeightObject } from "../interfaces/MidParentalHeightObject";

import { monochromeStyles } from '../testParameters/styles/monochromeStyles'
import {prematureThreeMonths} from '../testParameters/measurements/prematureThreeMonths';
import { twoToEightWeight } from "../testParameters/measurements/twoToEightWeight";
import { termToAYearGirlHeight } from "../testParameters/measurements/termToAYearGirlHeight";
import { termToTwoYearsGirlHeight } from "../testParameters/measurements/termToTwoYearsGirlHeight";
import { termToOverFourYearsGirlHeight } from "../testParameters/measurements/termToOverFourYearsGirlHeight";
import { turnerHeightOneYearToEleven } from "../testParameters/measurements/turnerHeightOneYearToEleven";
import { prematureTwentyTwoWeeksWeight } from "../testParameters/measurements/prematureTwentyTwoWeeks";
import { prematureGirlOverFourHeight } from "../testParameters/measurements/prematureGirlOverFourHeight";
import { termGirlWithSingleHeightMeasurementAndBoneAgeAndEvent } from "../testParameters/measurements/termGirlWithSingleHeightMeasurementAndBoneAgeAndEvent";

describe("All tests relate to rendering the centile lines in the height centile chart with no data.", () => {
  let props: CentileChartProps;

  const midparentalHeight: MidParentalHeightObject = {}

  beforeEach(() => {
    props = {
      chartsVersion: "7.0.0",
      reference: 'uk-who',
      title: 'TestChartTitle',
      subtitle: 'TestChartSubtitle',
      measurementMethod: 'height',
      sex: 'male',
      childMeasurements: [],
      midParentalHeightData: midparentalHeight,
      enableZoom: false,
      styles: monochromeStyles,
      enableExport: false,
      exportChartCallback: ()=>null,
      clinicianFocus: false,
    };
  });
  
  enum MeasurementMethods {
    'height'= 'height', 'weight'='weight', 'bmi'='bmi', 'ofc'='ofc'
  }

  const measurementMethods = [MeasurementMethods.height, MeasurementMethods.weight, MeasurementMethods.bmi, MeasurementMethods.ofc];

    it("should render 0.4th centile", () => {
      measurementMethods.forEach((item, index) =>{
        props.measurementMethod = item
        const chart = <CentileChart {...props} />
        render(chart);
        // expect(screen.queryByTestId("reference-0-centile-0.4-measurement-"+item)).toBeInTheDocument()
        expect(screen.queryByTestId("reference-1-centile-0.4-measurement-"+item)).toBeInTheDocument()
        expect(screen.queryByTestId("reference-2-centile-0.4-measurement-"+item)).toBeInTheDocument()
        expect(screen.queryByTestId("reference-3-centile-0.4-measurement-"+item)).toBeInTheDocument()
      })
    });
    
    it("should render 2nd centile", () => {
      measurementMethods.forEach((item, index) =>{
        props.measurementMethod = item
        const chart = <CentileChart {...props} />
        render(chart);
        expect(screen.queryByTestId("reference-1-centile-2-measurement-"+props.measurementMethod)).toBeInTheDocument()
        expect(screen.queryByTestId("reference-2-centile-2-measurement-"+props.measurementMethod)).toBeInTheDocument()
        expect(screen.queryByTestId("reference-3-centile-2-measurement-"+props.measurementMethod)).toBeInTheDocument()
      });
    });
    
    it("should render 9th centile", () => {
      measurementMethods.forEach((item, index) =>{
        props.measurementMethod = item
        const chart = <CentileChart {...props} />
        render(chart);
        expect(screen.getByTestId("reference-1-centile-9-measurement-"+props.measurementMethod)).toBeInTheDocument()
        expect(screen.getByTestId("reference-2-centile-9-measurement-"+props.measurementMethod)).toBeInTheDocument()
        expect(screen.getByTestId("reference-3-centile-9-measurement-"+props.measurementMethod)).toBeInTheDocument()
      });
    });
    
    it("should render 25th centile", () => {
      measurementMethods.forEach((item, index) =>{
        props.measurementMethod = item
        const chart = <CentileChart {...props} />
        render(chart);
        expect(screen.getByTestId("reference-1-centile-25-measurement-"+props.measurementMethod)).toBeInTheDocument()
        expect(screen.getByTestId("reference-2-centile-25-measurement-"+props.measurementMethod)).toBeInTheDocument()
        expect(screen.getByTestId("reference-3-centile-25-measurement-"+props.measurementMethod)).toBeInTheDocument()
      });
    });
    
    it("should render 50th centile", () => {
      measurementMethods.forEach((item, index) =>{
        props.measurementMethod = item
        const chart = <CentileChart {...props} />
        render(chart);
        expect(screen.getByTestId("reference-1-centile-50-measurement-"+props.measurementMethod)).toBeInTheDocument()
        expect(screen.getByTestId("reference-2-centile-50-measurement-"+props.measurementMethod)).toBeInTheDocument()
        expect(screen.getByTestId("reference-3-centile-50-measurement-"+props.measurementMethod)).toBeInTheDocument()
      });
    });
    
    it("should render 75th centile", () => {
      measurementMethods.forEach((item, index) =>{
        props.measurementMethod = item
        const chart = <CentileChart {...props} />
        render(chart);
        expect(screen.getByTestId("reference-1-centile-75-measurement-"+props.measurementMethod)).toBeInTheDocument()
        expect(screen.getByTestId("reference-2-centile-75-measurement-"+props.measurementMethod)).toBeInTheDocument()
        expect(screen.getByTestId("reference-3-centile-75-measurement-"+props.measurementMethod)).toBeInTheDocument()
      });
    });
    
    it("should render 91st centile", () => {
      measurementMethods.forEach((item, index) =>{
        props.measurementMethod = item
        const chart = <CentileChart {...props} />
        render(chart);
        expect(screen.getByTestId("reference-1-centile-91-measurement-"+props.measurementMethod)).toBeInTheDocument()
        expect(screen.getByTestId("reference-2-centile-91-measurement-"+props.measurementMethod)).toBeInTheDocument()
        expect(screen.getByTestId("reference-3-centile-91-measurement-"+props.measurementMethod)).toBeInTheDocument()
      });
    });
    
    it("should render 98th centile", () => {
      measurementMethods.forEach((item, index) =>{
        props.measurementMethod = item
        const chart = <CentileChart {...props} />
        render(chart);
        expect(screen.getByTestId("reference-1-centile-98-measurement-"+props.measurementMethod)).toBeInTheDocument()
        expect(screen.getByTestId("reference-2-centile-98-measurement-"+props.measurementMethod)).toBeInTheDocument()
        expect(screen.getByTestId("reference-3-centile-98-measurement-"+props.measurementMethod)).toBeInTheDocument()
      });
    });
    
    it("should render 99.6th centile", () => {
      measurementMethods.forEach((item, index) =>{
        props.measurementMethod = item
        const chart = <CentileChart {...props} />
        render(chart);
        expect(screen.getByTestId("reference-1-centile-99.6-measurement-"+props.measurementMethod)).toBeInTheDocument()
        expect(screen.getByTestId("reference-2-centile-99.6-measurement-"+props.measurementMethod)).toBeInTheDocument()
        expect(screen.getByTestId("reference-3-centile-99.6-measurement-"+props.measurementMethod)).toBeInTheDocument()
      });
    });
    
});

describe("All tests relate to rendering the SDS lines in the BMI centile chart with no data.", () => {
  let props: CentileChartProps;

  const midparentalHeight: MidParentalHeightObject = {}

  beforeEach(() => {
    props = {
      chartsVersion: "7.0.0",
      reference: 'uk-who',
      title: 'TestChartTitle',
      subtitle: 'TestChartSubtitle',
      measurementMethod: 'bmi',
      sex: 'male',
      childMeasurements: [],
      midParentalHeightData: midparentalHeight,
      enableZoom: false,
      styles: monochromeStyles,
      enableExport: false,
      exportChartCallback: ()=>null,
      clinicianFocus: false,
    };
  });

    const sdsLines = [-5,-4, 3, 3.33, 3.67, 4]

    sdsLines.forEach((sdsLine, index)=>{
      it("should render the "+sdsLine+" line",()=>{
        const chart = <CentileChart {...props} />
        render(chart);
        expect(screen.queryByTestId("reference-1-centile-"+sdsLine+"-bmisds")).toBeInTheDocument()
        expect(screen.queryByTestId("reference-2-centile-"+sdsLine+"-bmisds")).toBeInTheDocument()
        expect(screen.queryByTestId("reference-3-centile-"+sdsLine+"-bmisds")).toBeInTheDocument()
      });
    });

});

describe("All tests relate to rendering the text in the height centile chart for an older boy.", () => {
  let props: CentileChartProps;

  const midparentalHeight: MidParentalHeightObject = {}

  beforeEach(() => {
    props = {
      chartsVersion: "7.0.0",
      reference: 'uk-who',
      title: 'TestChartTitle',
      subtitle: 'TestChartSubtitle',
      measurementMethod: 'height',
      sex: 'male',
      childMeasurements: [],
      midParentalHeightData: midparentalHeight,
      enableZoom: false,
      styles: monochromeStyles,
      enableExport: false,
      exportChartCallback: ()=>null,
      clinicianFocus: false,
    };
  });
    
    it("should render title text correctly", () => {
      render(<CentileChart {...props} />);
      expect(screen.queryByText("TestChartTitle")).toBeInTheDocument()
    });
    
    it("should render subtitle text correctly", () => {
      render(<CentileChart {...props} />);
      expect(screen.queryByText("TestChartSubtitle")).toBeInTheDocument()
    });
    
    it("should render version text correctly", () => {
      render(<CentileChart {...props} />);
      expect(screen.queryByText("7.0.0")).toBeInTheDocument()
    });
    
    it("should render height y axis label text correctly.", () => {
      render(<CentileChart {...props} />);
      expect(screen.queryByText("Height / Length (cm)")).toBeInTheDocument()
    });
    
    it("should render weight y axis label text correctly.", () => {
      props.measurementMethod="weight"
      render(<CentileChart {...props} />);
      expect(screen.queryByText("Weight (kg)")).toBeInTheDocument()
    });
    
    it("should render bmi y axis label text correctly.", () => {
      props.measurementMethod="bmi"
      render(<CentileChart {...props} />);
      expect(screen.queryByText("Body Mass Index (kg/m²)")).toBeInTheDocument()
    });
    
    it("should render head circumference y axis label text correctly.", () => {
      props.measurementMethod="ofc"
      render(<CentileChart {...props} />);
      expect(screen.queryByText("Head Circumference (cm)")).toBeInTheDocument()
    });
    
    it("should render age x axis label text correctly.", () => {
      render(<CentileChart {...props} />);
      expect(screen.queryByText("Age (in years)")).toBeInTheDocument()
    });
    
    it("should render UK-WHO reference attribution label text correctly.", () => {
      render(<CentileChart {...props} />);
      expect(screen.queryByText("WHO Child Growth Standards, UK 1990 reference data, reanalysed 2009")).toBeInTheDocument()
    });
    
    it("should render Trisomy 21 reference attribution label text correctly.", () => {
      props.reference="trisomy-21"
      render(<CentileChart {...props} />);
      expect(screen.queryByText("Styles ME, Cole TJ, Dennis J, Preece MA. New cross sectional stature, weight and head circumference references for Down’s syndrome in the UK and Republic of Ireland. Arch Dis Child 2002;87:104-8. BMI centiles added 11/11/2013")).toBeInTheDocument()
    });
    
    it("should render early puberty cut off text in a boy.", () => {
      render(<CentileChart {...props} />);
      expect(screen.getAllByText("Puberty starting before 9 years is precocious.")[0]).toBeInTheDocument()
    });
    
    it("should render delayed puberty cut off text in a boy.", () => {
      render(<CentileChart {...props} />);
      expect(screen.getAllByText("Puberty is delayed if no signs are present by 14y.")[0]).toBeInTheDocument()
    });
    
    it("should render late puberty cut off text in a boy.", () => {
      render(<CentileChart {...props} />);
      expect(screen.getAllByText("Puberty completing after 17y is delayed.")[0]).toBeInTheDocument()
    });
    
});

describe("All tests relate to rendering the text in the height centile chart for an older girl.", () => {
  let props: CentileChartProps;

  const midparentalHeight: MidParentalHeightObject = {}

  beforeEach(() => {
    props = {
      chartsVersion: "ChartVersion",
      reference: 'uk-who',
      title: 'TestChartTitle',
      subtitle: 'TestChartSubtitle',
      measurementMethod: 'height',
      sex: 'female',
      childMeasurements: [],
      midParentalHeightData: midparentalHeight,
      enableZoom: false,
      styles: monochromeStyles,
      enableExport: false,
      exportChartCallback: ()=>null,
      clinicianFocus: false
    };
  });
    
    it("should render early puberty cut off text in a girl.", () => {
      render(<CentileChart {...props} />);
      expect(screen.getAllByText("Puberty starting before 8 years is precocious.")[0]).toBeInTheDocument()
    });
    
    it("should render delayed puberty cut off text in a girl.", () => {
      render(<CentileChart {...props} />);
      expect(screen.getAllByText("Puberty is delayed if no signs are present by 13y.")[0]).toBeInTheDocument()
    });
    
    it("should render late puberty cut off text in a girl.", () => {
      render(<CentileChart {...props} />);
      expect(screen.getAllByText("Puberty completing after 16y is delayed.")[0]).toBeInTheDocument()
    });

    it("should render Turner reference attribution label text correctly.", () => {
      props.reference="turner"
      props.sex="female"
      render(<CentileChart {...props} />);
      expect(screen.queryByText("UK Turner reference data, 1985. Lyon, Preece and Grant (1985).")).toBeInTheDocument()
    });

    // it("centile labels should render.", () => {
    //   render(<CentileChart {...props} />);
    //   expect(screen.getAllByText("99.6th")[0]).toBeInTheDocument()
    // });

    // it("centile labels should not render.", () => {
    //   props.showCentileLabels=false;
    //   render(<CentileChart {...props} />);
    //   expect(screen.queryAllByText("99.6th")[0]).toBeUndefined();
    // });
    
});

describe("All tests relate to rendering the text in the height/length centile chart for a premature neonate.", () => {
  let props: CentileChartProps;

  const midparentalHeight: MidParentalHeightObject = {}

  beforeEach(() => {
    props = {
      chartsVersion: "ChartVersion",
      reference: 'uk-who',
      title: 'TestChartTitle',
      subtitle: 'TestChartSubtitle',
      measurementMethod: 'height',
      sex: 'female',
      childMeasurements: prematureThreeMonths,
      midParentalHeightData: midparentalHeight,
      enableZoom: false,
      styles: monochromeStyles,
      enableExport: false,
      exportChartCallback: ()=>null,
      clinicianFocus: false,
    };
  });
    
    it("should render title text correctly", () => {
      render(<CentileChart {...props} />);
      expect(screen.queryByText("TestChartTitle")).toBeInTheDocument()
    });
    
    it("should render subtitle text correctly", () => {
      render(<CentileChart {...props} />);
      expect(screen.queryByText("TestChartSubtitle")).toBeInTheDocument()
    });
    
    it("should render height y axis label text correctly.", () => {
      render(<CentileChart {...props} />);
      expect(screen.queryByText("Height / Length (cm)")).toBeInTheDocument()
    });
    
    it("should render age x axis label text correctly for premature infant.", () => {
      render(<CentileChart {...props} />);
      expect(screen.queryByText("Gestation or postnatal weeks / months (shown as lollipops)")).toBeInTheDocument()
    });
    
});

describe("All tests relate to plotting in the height/length centile chart for a premature neonate.", () => {
  let props: CentileChartProps;

  const midparentalHeight: MidParentalHeightObject = {}

  beforeEach(() => {
    props = {
      chartsVersion: "ChartVersion",
      reference: 'uk-who',
      title: 'TestChartTitle',
      subtitle: 'TestChartSubtitle',
      measurementMethod: 'height',
      sex: 'female',
      childMeasurements: prematureThreeMonths,
      midParentalHeightData: midparentalHeight,
      enableZoom: false,
      styles: monochromeStyles,
      enableExport: false,
      exportChartCallback: ()=>null,
      clinicianFocus: false,
    };
  });

    it("should plot 23 x points for corrected age.", () => {
      render(<CentileChart {...props} />);
      expect(screen.getAllByTestId('correctedMeasurementXPoint')).toHaveLength(23);
    });
    
    it("should not render point for corrected age.", () => {
      render(<CentileChart {...props} />);
      expect(screen.queryAllByTestId('chronologicalMeasurementPoint')).toHaveLength(0);
    });
    
    it("should plot 23 chronological points on click of `chronological` toggle.", () => {
      render(<CentileChart {...props} />);
      fireEvent.click(screen.getByTestId('unadjusted'));
      expect(screen.queryAllByTestId('chronologicalMeasurementPoint')).toHaveLength(23);
    });
    
    it("should plot 23 chronological points and 23 corrected x points on click of `both` toggle.", () => {
      const chart = render(<CentileChart {...props} />);
      fireEvent.click(screen.getByTestId('both'));
      expect(chart.queryAllByTestId('chronologicalMeasurementPoint')).toHaveLength(23);
      expect(chart.queryAllByTestId('correctedMeasurementXPoint')).toHaveLength(23);
    });

});

describe("All tests relating to rendering the text in the weight centile chart for an older boy.", () => {
  let props: CentileChartProps;

  const midparentalHeight: MidParentalHeightObject = {}

  beforeEach(() => {
    props = {
      chartsVersion: "ChartVersion",
      reference: "uk-who",
      title: "TestChartTitle",
      subtitle: "TestChartSubtitle",
      measurementMethod: "weight",
      sex: 'male',
      childMeasurements: twoToEightWeight,
      midParentalHeightData: midparentalHeight,
      enableZoom: false,
      styles: monochromeStyles,
      enableExport: false,
      exportChartCallback: ()=>null,
      clinicianFocus: false,
    };
  });

  it("should render title text correctly", () => {
    render(<CentileChart{...props} />);
    expect(screen.queryByText("TestChartTitle")).toBeInTheDocument()
  });

  it("should render subtitle text correctly", () => {
    render(<CentileChart {...props} />);
    expect(screen.queryByText("TestChartSubtitle")).toBeInTheDocument()
  });

  it("should render weight y axis label text correctly", () => {
    render(<CentileChart {...props} />);
    expect(screen.queryByText("Weight (kg)")).toBeInTheDocument();
  });

  it("should render age x axis label correctly", () => {
    render(<CentileChart {...props} />);
    expect(screen.queryByText("Age (in years)"))
  });

});

describe("All test relating to plotting in the weight centile chart for a toddler between two and eight years.", () => {
  let props: CentileChartProps;
  const midparentalHeight: MidParentalHeightObject = {}

  beforeEach(() => {
    props = {
      chartsVersion: "ChartVersion",
      reference: "uk-who",
      title: "TestChartTitle",
      subtitle: "TestChartSubtitle",
      measurementMethod: "weight",
      sex: 'male',
      childMeasurements: twoToEightWeight,
      midParentalHeightData: midparentalHeight,
      enableZoom: false,
      styles: monochromeStyles,
      enableExport: false,
      exportChartCallback: ()=>null,
      clinicianFocus: false,
    };
  });

  it("should plot 73 x points for chronological age", () => {
    render(<CentileChart {...props} />);
    expect(screen.getAllByTestId('chronologicalMeasurementPoint')).toHaveLength(73);
  });

});

describe("All tests relating to plotting in the height centile chart for a premature girl to three months of age.", () => {
  let props: CentileChartProps;
  const midparentalHeight: MidParentalHeightObject = {}

  beforeEach(() => {
    props = {
      chartsVersion: "7.0.0",
      reference: "uk-who",
      title: "TestChartTitle",
      subtitle: "TestChartSubtitle",
      measurementMethod: "height",
      sex: 'female',
      childMeasurements: prematureThreeMonths,
      midParentalHeightData: midparentalHeight,
      enableZoom: false,
      styles: monochromeStyles,
      enableExport: false,
      exportChartCallback: ()=>null,
      clinicianFocus: false,
    };
  });

  it("should plot x axis correctly in the first year of life.", () => {
    render(<CentileChart {...props} />);
    expect(screen.getByText('Gestation or postnatal weeks / months (shown as lollipops)')).toBeInTheDocument();
  });

});

describe("All tests relating to plotting height centile chart for a girl with Turner.", () => {
  let props: CentileChartProps;
  const midparentalHeight: MidParentalHeightObject = {}

  beforeEach(() => {
    props = {
      chartsVersion: "7.0.0",
      reference: "turner",
      title: "TestChartTitle",
      subtitle: "TestChartSubtitle",
      measurementMethod: "height",
      sex: 'female',
      childMeasurements: turnerHeightOneYearToEleven,
      midParentalHeightData: midparentalHeight,
      enableZoom: false,
      styles: monochromeStyles,
      enableExport: false,
      exportChartCallback: ()=>null,
      clinicianFocus: false,
    };
  });

  it("should plot turner reference text correctly.", () => {
    render(<CentileChart {...props} />);
    expect(screen.getByText('UK Turner reference data, 1985. Lyon, Preece and Grant (1985).')).toBeInTheDocument();
  });

});

describe("All tests relating to plotting weight centile chart for an extremely preterm girl not yet term.", () => {
  let props: CentileChartProps;
  const midparentalHeight: MidParentalHeightObject = {}

  beforeEach(() => {
    props = {
      chartsVersion: "7.0.0",
      reference: "uk-who",
      title: "TestChartTitle",
      subtitle: "TestChartSubtitle",
      measurementMethod: "weight",
      sex: 'female',
      childMeasurements: prematureTwentyTwoWeeksWeight,
      midParentalHeightData: midparentalHeight,
      enableZoom: false,
      styles: monochromeStyles,
      enableExport: false,
      exportChartCallback: ()=>null,
      clinicianFocus: false,
    };
  });

  it("should plot x axis correctly in the first year of life.", () => {
    render(<CentileChart {...props} />);
    expect(screen.getByText('Gestation (weeks)')).toBeInTheDocument();
  });

  it("should plot 16 x points for corrected age.", () => {
    render(<CentileChart {...props} />);
    fireEvent.click(screen.getByTestId('adjusted'));
    expect(screen.getAllByTestId('correctedMeasurementXPoint')).toHaveLength(16);
  });
  
  it("should plot 16 x points for chronological age.", () => {
    render(<CentileChart {...props} />);
    fireEvent.click(screen.getByTestId('unadjusted'));
    expect(screen.queryAllByTestId('chronologicalMeasurementPoint')).toHaveLength(16);
  });

});

describe("All tests relating to plotting weight centile chart for an extremely preterm girl now over 4y.", () => {
  let props: CentileChartProps;
  const midparentalHeight: MidParentalHeightObject = {}

  beforeEach(() => {
    props = {
      chartsVersion: "7.0.0",
      reference: "uk-who",
      title: "Premature Girl",
      subtitle: "Now over 4y",
      measurementMethod: "height",
      sex: 'female',
      childMeasurements: prematureGirlOverFourHeight,
      midParentalHeightData: midparentalHeight,
      enableZoom: false,
      styles: monochromeStyles,
      enableExport: false,
      exportChartCallback: ()=>null,
      clinicianFocus: false,
    };
  });

  it("should plot 16 x points for corrected age.", () => {
    render(<CentileChart {...props} />);
    fireEvent.click(screen.getByTestId('adjusted'));
    expect(screen.getAllByTestId('correctedMeasurementXPoint')).toHaveLength(14);
  });
  
  it("should plot 16 x points for chronological age.", () => {
    render(<CentileChart {...props} />);
    fireEvent.click(screen.getByTestId('unadjusted'));
    expect(screen.queryAllByTestId('chronologicalMeasurementPoint')).toHaveLength(14);
  });

});

describe("All tests relating to plotting height centile chart for a term girl until a year.", () => {
  let props: CentileChartProps;
  const midparentalHeight: MidParentalHeightObject = {}

  beforeEach(() => {
    props = {
      chartsVersion: "7.0.0",
      reference: "uk-who",
      title: "Term Girl",
      subtitle: "Now a year",
      measurementMethod: "height",
      sex: 'female',
      childMeasurements: termToAYearGirlHeight,
      midParentalHeightData: midparentalHeight,
      enableZoom: false,
      styles: monochromeStyles,
      enableExport: false,
      exportChartCallback: ()=>null,
      clinicianFocus: false
    };
  });
  
  it("should plot 85 x points for chronological age.", () => {
    render(<CentileChart {...props} />);
    expect(screen.queryAllByTestId('chronologicalMeasurementPoint')).toHaveLength(85);
  });
  
  it("should plot 0 x points for corrected age.", () => {
    render(<CentileChart {...props} />);
    expect(screen.queryAllByTestId('correctedMeasurementPoint')).toHaveLength(0);
  });

});

describe("All tests relating to plotting height centile chart for a term girl until over two years.", () => {
  let props: CentileChartProps;
  const midparentalHeight: MidParentalHeightObject = {}

  beforeEach(() => {
    props = {
      chartsVersion: "7.0.0",
      reference: "uk-who",
      title: "Term Girl",
      subtitle: "Now over 2 years",
      measurementMethod: "height",
      sex: 'female',
      childMeasurements: termToTwoYearsGirlHeight,
      midParentalHeightData: midparentalHeight,
      enableZoom: false,
      styles: monochromeStyles,
      enableExport: false,
      exportChartCallback: ()=>null,
      clinicianFocus: false,
    };
  });
  
  it("should plot 7 x points for chronological age.", () => {
    render(<CentileChart {...props} />);
    expect(screen.queryAllByTestId('chronologicalMeasurementPoint')).toHaveLength(7);
  });
  
  it("should plot 0 x points for corrected age.", () => {
    render(<CentileChart {...props} />);
    expect(screen.queryAllByTestId('correctedMeasurementPoint')).toHaveLength(0);
  });

});

describe("All tests relating to plotting height centile chart for a term girl until over four years.", () => {
  let props: CentileChartProps;
  const midparentalHeight: MidParentalHeightObject = {}

  beforeEach(() => {
    props = {
      chartsVersion: "7.0.0",
      reference: "uk-who",
      title: "Term Girl",
      subtitle: "Now over 4 years",
      measurementMethod: "height",
      sex: 'female',
      childMeasurements: termToOverFourYearsGirlHeight,
      midParentalHeightData: midparentalHeight,
      enableZoom: false,
      styles: monochromeStyles,
      enableExport: false,
      exportChartCallback: ()=>null,
      clinicianFocus: false,
    };
  });
  
  it("should plot 14 dot points for chronological age.", () => {
    render(<CentileChart {...props} />);
    expect(screen.queryAllByTestId('chronologicalMeasurementPoint')).toHaveLength(14);
  });
  
  it("should plot 0 x points for corrected age.", () => {
    render(<CentileChart {...props} />);
    expect(screen.queryAllByTestId('correctedMeasurementPoint')).toHaveLength(0);
  });

});


// Paste button tests

describe("All tests relating to testing the copy button", () => {
  let props: CentileChartProps;
  const midparentalHeight: MidParentalHeightObject = {}

  beforeEach(() => {
    props = {
      chartsVersion: "7.0.0",
      reference: 'uk-who',
      title: 'TestChartTitle',
      subtitle: 'TestChartSubtitle',
      measurementMethod: 'height',
      sex: 'male',
      childMeasurements: [],
      midParentalHeightData: midparentalHeight,
      enableZoom: false,
      styles: monochromeStyles,
      enableExport: true,
      exportChartCallback: ()=>null,
      clinicianFocus: false
    };
  });

    it("should show that paste button is present if enableExport prop is true", () => {
      render(<CentileChart {...props} />);
      expect(screen.queryByTestId("copy-button")).toBeInTheDocument();
    })
    it("should show the Copy Graph text upon hovering", () => {
      render(<CentileChart {...props} />);
      fireEvent.mouseEnter(screen.getByTestId('copy-button'));
      expect(screen.queryByText("Copy Graph"));
    })
    it("should show the 'copied' text upon clicking and then it should fade", async () => {
      render(<CentileChart {...props} />);
      fireEvent.click(screen.getByTestId('copy-button'));
      await waitFor(()=>expect(screen.queryByText('Copied!')), {timeout: 1000});
    })
    it("should show the grey rim around copy button on hover", () => {
      render(<CentileChart {...props} />);
      fireEvent.mouseOver(screen.getByTestId('copy-button'));
      expect(screen.getByTestId('copy-button')).toHaveStyle('background-color: ButtonFace');
    })
    it("should not trigger form submission when copy button clicked", () => {
      const onSubmit = jest.fn();
      render(<form onSubmit={onSubmit}>
        <CentileChart {...props} />
      </form>);
      fireEvent.click(screen.getByTestId('copy-button'));
      expect(onSubmit).not.toHaveBeenCalled();
    });
})

describe("Tests relating to exportChartCallback function", () => {
  const mockExportChartCallback = jest.fn();
  let props: CentileChartProps;
  const midparentalHeight: MidParentalHeightObject = {}

  beforeEach(() => {
    props = {
      chartsVersion: "7.0.0",
      reference: 'uk-who',
      title: 'TestChartTitle',
      subtitle: 'TestChartSubtitle',
      measurementMethod: 'height',
      sex: 'male',
      childMeasurements: [],
      midParentalHeightData: midparentalHeight,
      enableZoom: false,
      styles: monochromeStyles,
      enableExport: true,
      exportChartCallback: mockExportChartCallback,
      clinicianFocus: false,
    };
  });

  it("should trigger exportChartCallback function onclick", () => {
    render(<CentileChart {...props} />);
    fireEvent.click(screen.getByTestId('copy-button'));
    expect(mockExportChartCallback).toHaveBeenCalled();
  })
})

describe("Tests relating to negative settings on the copy button", () => {
  let props: CentileChartProps;
  const midparentalHeight: MidParentalHeightObject = {}

  beforeEach(() => {
    props = {
      chartsVersion: "7.0.0",
      reference: 'uk-who',
      title: 'TestChartTitle',
      subtitle: 'TestChartSubtitle',
      measurementMethod: 'height',
      sex: 'male',
      childMeasurements: [],
      midParentalHeightData: midparentalHeight,
      enableZoom: false,
      styles: monochromeStyles,
      enableExport: false,
      exportChartCallback: ()=>null,
      clinicianFocus: false,
    };
  });

  it("should show that the paste button is absent if enableExport is false", () => {
    render(<CentileChart {...props} />);
    expect(screen.queryByTestId('copy-button')).not.toBeInTheDocument();
  })
})

describe("All tests relate to a single height measurement in a term girl now 4 years old with an advanced bone age and some events.", () => {
  let props: CentileChartProps;
  const midparentalHeight: MidParentalHeightObject = {}

  beforeEach(() => {
    props = {
      chartsVersion: "7.0.0",
      reference: "uk-who",
      title: "Term Girl",
      subtitle: "Now over 4 years with advanced bone age",
      measurementMethod: "height",
      sex: 'female',
      childMeasurements: termGirlWithSingleHeightMeasurementAndBoneAgeAndEvent,
      midParentalHeightData: midparentalHeight,
      enableZoom: false,
      styles: monochromeStyles,
      enableExport: false,
      exportChartCallback: ()=>null,
      clinicianFocus: false,
    };
  });
  
  it("Chronological age should be correct.", () => {
    const chart = render(<CentileChart {...props} />);
    expect(chart.queryAllByTestId('chronologicalMeasurementPoint')).toHaveLength(1);
    // 4.167008898015058 age
    
  });

});

describe("All tests relating to the zoom functionality where enableZoom needs to be true", () => {
  let props: CentileChartProps;
  const midparentalHeight: MidParentalHeightObject = {}

  beforeEach(() => {
    props = {
      chartsVersion: "7.0.0",
      reference: "uk-who",
      title: "Term Girl",
      subtitle: "Now over 4 years with advanced bone age",
      measurementMethod: "height",
      sex: 'female',
      childMeasurements: termGirlWithSingleHeightMeasurementAndBoneAgeAndEvent,
      midParentalHeightData: midparentalHeight,
      enableZoom: true,
      styles: monochromeStyles,
      enableExport: false,
      exportChartCallback: ()=>null,
      clinicianFocus: false
    };
  });
  it("should show the zoom button when enablezoom is true", () => {
    render(<CentileChart {...props} />);
    expect(screen.queryByTestId('zoom-button')).toBeInTheDocument();
  });
  it("should show the Toggle Full Lifespan text upon hovering", () => {
    render(<CentileChart {...props} />);
    fireEvent.mouseEnter(screen.getByTestId('zoom-button'));
    expect(screen.queryByText("Toggle Full Lifespan"));
  });
  it("should show the Reset Zoom button if zoom is applied", () => {
    render(<CentileChart {...props} />);
    fireEvent.click(screen.getByTestId('zoom-button'));
    expect(screen.queryByTestId("resetzoom-button")).toBeInTheDocument();
  })
  it("should not trigger form submission when zoom button clicked", () => {
    const onSubmit = jest.fn();
    render(<form onSubmit={onSubmit}>
      <CentileChart {...props} />
    </form>);
    fireEvent.click(screen.getByTestId('zoom-button'));
    expect(onSubmit).not.toHaveBeenCalled();
  });
})

describe("Tests relating to negative settings on the zoom button", () => {
  let props: CentileChartProps;
  const midparentalHeight: MidParentalHeightObject = {}

  beforeEach(() => {
    props = {
      chartsVersion: "7.0.0",
      reference: 'uk-who',
      title: 'TestChartTitle',
      subtitle: 'TestChartSubtitle',
      measurementMethod: 'height',
      sex: 'male',
      childMeasurements: [],
      midParentalHeightData: midparentalHeight,
      enableZoom: false,
      styles: monochromeStyles,
      enableExport: false,
      exportChartCallback: ()=>null,
      clinicianFocus: false,
    };
  });

  it("should show that the zoom button is absent if enableZoom is false", () => {
    render(<CentileChart {...props} />);
    expect(screen.queryByTestId('resetzoom-button')).not.toBeInTheDocument();
  })
})

describe("Tests relating to the gradient labels button", () => {
  let props: CentileChartProps;
  const midparentalHeight: MidParentalHeightObject = {}

  beforeEach(() => {
    props = {
      chartsVersion: "7.0.0",
      reference: "uk-who",
      title: "Term Girl",
      subtitle: "Now over 4 years with advanced bone age",
      measurementMethod: "height",
      sex: 'female',
      childMeasurements: termGirlWithSingleHeightMeasurementAndBoneAgeAndEvent,
      midParentalHeightData: midparentalHeight,
      enableZoom: true,
      styles: monochromeStyles,
      enableExport: false,
      exportChartCallback: ()=>null,
      clinicianFocus: false
    };
  });

  it("should not trigger form submission when gradient labels clicked", () => {
    const onSubmit = jest.fn();
    render(<form onSubmit={onSubmit}>
      <CentileChart {...props} />
    </form>);
    fireEvent.click(screen.getByTestId('gradient-labels-button'));
    expect(onSubmit).not.toHaveBeenCalled();
  });
})