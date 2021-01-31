import React from "react";
import { render } from "@testing-library/react";
import Alert from './../common/Alert';
import LoadingSpinner from './../common/LoadingSpinner';
import Modal from './../common/Modal';

test('renders without crashing', function() {
    render(<Alert color='success' message='Lorem ipsum'/>); 
})

test('it matches snapshot', function() {
    const {asFragment} = render(
        <Alert color='success' message='Lorem ipsum'/>
    );
    expect(asFragment()).toMatchSnapshot();
}); 

test('renders without crashing', function() {
    render(<LoadingSpinner/>); 
})

test('it matches snapshot', function() {
    const {asFragment} = render(
        <LoadingSpinner/>
    );
    expect(asFragment()).toMatchSnapshot();
}); 

test('renders without crashing', function() {
    render(<Modal message='Lorem ipsum'/>); 
})

test('it matches snapshot', function() {
    const {asFragment} = render(
        <Modal message='Lorem ipsum'/>
    );
    expect(asFragment()).toMatchSnapshot();
}); 