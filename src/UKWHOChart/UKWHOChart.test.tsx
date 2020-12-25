// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import UKWHOChart from "./UKWHOChart";
import { UKWHOChartProps } from "./UKWHOChart.types";

describe("Test Component", () => {
  let props: UKWHOChartProps;

  beforeEach(() => {
    props = {
      foo: "bar"
    };
  });

  const renderComponent = () => render(<UKWHOChart {...props} />);

  it("should render foo text correctly", () => {
    props.foo = "harvey was here";
    const { getByTestId } = renderComponent();

    const component = getByTestId("UKWHOChart");

    expect(component).toHaveTextContent("harvey was here");
  });
});
