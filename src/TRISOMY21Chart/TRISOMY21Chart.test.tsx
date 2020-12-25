// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import TRISOMY21Chart from "./TRISOMY21Chart";
import { TRISOMY21ChartProps } from "./TRISOMY21Chart.types";

describe("Test Component", () => {
  let props: TRISOMY21ChartProps;

  beforeEach(() => {
    props = {
      foo: "bar"
    };
  });

  const renderComponent = () => render(<TRISOMY21Chart {...props} />);

  it("should render foo text correctly", () => {
    props.foo = "harvey was here";
    const { getByTestId } = renderComponent();

    const component = getByTestId("TRISOMY21Chart");

    expect(component).toHaveTextContent("harvey was here");
  });
});
