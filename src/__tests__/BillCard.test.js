import React from "react";
import { render } from "@testing-library/react";
import BillCard from "./../bill-card/BillCard";
import billData from './../billdata.json'; 
import billDataIncomplete from './../billDataIncomplete.json'; 

it("renders without crashing", function() {
  render(<BillCard bill={billData}/>);
});

it("matches snapshot", function() {
    const {asFragment} = render(<BillCard bill={billData}/>);
    expect(asFragment()).toMatchSnapshot();
});

it("renders with incomplete data", function() {
    render(<BillCard bill={billDataIncomplete}/>); 
})

//need to add tests for bad URLs. bills/123 ...something like that. 