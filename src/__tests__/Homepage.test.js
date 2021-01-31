import React from "react";
import { render } from "@testing-library/react";
import Homepage from './../homepage/Homepage';
import LandingPage from './../homepage/LandingPage';

test('renders without crashing', function() {
    render(<Homepage/>); 
})

test('it matches snapshot', function() {
    const {asFragment} = render(
        <Homepage/>
    );
    expect(asFragment()).toMatchSnapshot();
}); 

test('renders without crashing', function() {
    render(<LandingPage/>); 
})

test('it matches snapshot', function() {
    const {asFragment} = render(
        <LandingPage/>
    );
    expect(asFragment()).toMatchSnapshot();
}); 