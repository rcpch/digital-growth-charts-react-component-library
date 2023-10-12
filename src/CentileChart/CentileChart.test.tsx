import * as React from "react";
import { fireEvent, getByTestId, render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';

import CentileChart from "./CentileChart";
import { CentileChartProps } from "./CentileChart.types";
import { MidParentalHeightObject } from "../interfaces/MidParentalHeightObject";

import { monochromeStyles } from '../testParameters/styles/monochromeStyles'
import {prematureThreeMonths} from '../testParameters/measurements/prematureThreeMonths';

describe("All tests relate to rendering the text in the height centile chart for an older boy.", () => {
  let props: CentileChartProps;

  const midparentalHeight: MidParentalHeightObject = {}

  beforeEach(() => {
    props = {
      chartsVersion: "ChartVersion",
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
      showCentileLabels: false,
      showSDSLabels: false
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
      clinicianFocus: false,
      showCentileLabels: true,
      showSDSLabels: false
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
      render(<CentileChart {...props} />);
      expect(screen.queryByText("Lyon, Preece and Grant (1985)")).toBeInTheDocument()
    });

    it("centile labels should render.", () => {
      render(<CentileChart {...props} />);
      expect(screen.getAllByText("99.6th")[0]).toBeInTheDocument()
    });

    it("centile labels should not render.", () => {
      props.showCentileLabels=false;
      render(<CentileChart {...props} />);
      expect(screen.queryAllByText("99.6th")[0]).toBeUndefined();
    });
    
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
      showCentileLabels: false,
      showSDSLabels: false
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
    
    it("should render age x axis label text correctly.", () => {
      render(<CentileChart {...props} />);
      expect(screen.queryByText("Gestation or postnatal weeks / months")).toBeInTheDocument()
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
      showCentileLabels: false,
      showSDSLabels: false
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