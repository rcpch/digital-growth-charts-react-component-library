// Generated with util/create-component.js
import * as React from "react";
import { render } from "@testing-library/react";

import CentileChart from "./CentileChart";
import { CentileChartProps } from "./CentileChart.types";

describe("Test Component", () => {
  let props: CentileChartProps;

  beforeEach(() => {
    props = {
      foo: "bar"
    };
  });

  const renderComponent = () => render(<CentileChart {...props} />);

  it("should render foo text correctly", () => {
    props.foo = "harvey was here";
    const { getByTestId } = renderComponent();

    const component = getByTestId("CentileChart");

    expect(component).toHaveTextContent("harvey was here");
  });
});
