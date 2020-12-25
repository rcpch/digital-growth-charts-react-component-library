// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import RCPCHChart from "./RCPCHChart";
import { RCPCHChartProps } from "./RCPCHChart.types";

describe("Test Component", () => {
  let props: RCPCHChartProps;

  beforeEach(() => {
    props = {
      measurementMethod: "height",
      sex: "male",
      measurementsArray: [],
      measurementsSDSArray: [],
      reference: "uk-who",
      width: 700,
      height: 600,
      measurementDataPointColour: "red",
      centileColour: "blue",
      chartBackground: "white"
    };
  });

  const renderComponent = () => render(<RCPCHChart {...props} />);

  it("should render foo text correctly", () => {
    props.measurementMethod = "height";
    const { getByTestId } = renderComponent();

    const component = getByTestId("RCPCHChart");

    expect(component).toHaveTextContent("rcpch chart was here");
  });
});
