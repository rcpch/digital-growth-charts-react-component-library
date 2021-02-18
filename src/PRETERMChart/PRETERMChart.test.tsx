// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import PRETERMChart from "./PRETERMChart";
import { PRETERMChartProps } from "./PRETERMChart.types";

describe("Test Component", () => {
  let props: PRETERMChartProps;

  beforeEach(() => {
    
  });

  const renderComponent = () => render(<PRETERMChart {...props} />);

  it("should render foo text correctly", () => {
    
    const { getByTestId } = renderComponent();

    const component = getByTestId("PRETERMChart");

    expect(component).toHaveTextContent("harvey was here");
  });
});
