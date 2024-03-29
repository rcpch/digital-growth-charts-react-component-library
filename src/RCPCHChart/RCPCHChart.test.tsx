// Generated with util/create-component.js
import * as React from "react";
import { render } from "@testing-library/react";

import RCPCHChart from "./RCPCHChart";
import { RCPCHChartProps } from "./RCPCHChart.types";
import { chartObject, axesObject, gridlinesObject, centilesObject, measurementObjects, sdsObject } from '../testParameters/styles/monochromeStyles'

describe("RCPCHChart", () => {
  let props: RCPCHChartProps;

  beforeEach(() => {
    props = {
      reference: 'uk-who',
      title: 'TestChartTitle',
      subtitle: 'TestChartSubtitle',
      measurementMethod: 'height',
      sex: 'male',
      midParentalHeightData: {},
      enableZoom: false,
      enableExport: false,
      exportChartCallback: ()=>null,
      clinicianFocus: false,
      measurementsArray: [],
      chartStyle: chartObject,
      axisStyle: axesObject,
      gridlineStyle: gridlinesObject,
      centileStyle: centilesObject,
      sdsStyle: sdsObject,
      measurementStyle: measurementObjects,
      chartType:'centile',
    };
  });

  const renderComponent = () => render(<RCPCHChart {...props} />);

  test.skip("should render chart title text correctly", () => {
    props.measurementMethod = "height";
    const { getByTestId } = renderComponent();

    const component = getByTestId("RCPCHChart");

    expect(component.textContent?.match(/TestChartTitle/));
  });
});
