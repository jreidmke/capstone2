import React from "react";
import { render } from "@testing-library/react";
import BillCard from "./../bill-card/BillCard";
import billData from './../billdata.json'; 

it("renders without crashing", function() {
  render(<BillCard bill={billData}/>);
});

it("matches snapshot", function() {
    const {asFragment} = render(<BillCard bill={billData}/>);
    expect(asFragment()).toMatchSnapshot();
});

//need to add tests for bad URLs. bills/123 ...something like that. 