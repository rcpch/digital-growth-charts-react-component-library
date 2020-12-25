// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import TURNERChart from "./TURNERChart";
import { TURNERChartProps } from "./TURNERChart.types";

describe("Test Component", () => {
  let props: TURNERChartProps;

  beforeEach(() => {
    props = {
      foo: "bar"
    };
  });

  const renderComponent = () => render(<TURNERChart {...props} />);

  it("should render foo text correctly", () => {
    props.foo = "harvey was here";
    const { getByTestId } = renderComponent();

    const component = getByTestId("TURNERChart");

    expect(component).toHaveTextContent("harvey was here");
  });
});
