import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import BillDetails from './../bills/BillDetails';
import BillHistoryActions from './../bills/BillHistoryActions';
import BillHistoryVotes from './../bills/BillHistoryVotes';
import BillTitle from './../bills/BillTItle'; 
import billData from './../billdata.json'; 

//BILL DETAILS COMPONENT
test('renders without crashing', function() {
    const {getByText} = render(
        <MemoryRouter initialEntries={['/bills/hr501-116']}>
            <BillDetails/>
        </MemoryRouter>
    ); 
    expect(getByText('Complete Bill Actions')).toBeInTheDocument();
    expect(getByText('Complete Bill Vote List')).toBeInTheDocument();
}); 

test('it matches snapshot', function() {
    const {asFragment} = render(
        <MemoryRouter initialEntries={['/bills/hr501-116']}>
            <BillDetails/>
        </MemoryRouter>        
    );
    expect(asFragment()).toMatchSnapshot();
})

//IN HERE WE'LL TEST FOR BAD BILL NUMBERS WHICH MEANS 
//WE'LL NEED TO DO A LIL REDIRECTING BACK IN THE COMPONENT

/**BILL DETAILS CHILDREN COMPONENTS */

//BILL HISTORY ACTIONS

test('renders without crashing and matches snapshot', function() {
    const {getByText, asFragment} = render(
        <BillHistoryActions actions={billData['actions']}/>
    ); 
    expect(asFragment()).toMatchSnapshot();
    expect(getByText("The Speaker appointed conferees - from the Committee on Agriculture for consideration of secs. 3601 and 3602 of the House bill, and sec. 1053 of the Senate amendment, and modifications committed to conference: Peterson, Spanberger, and Conaway.")).toBeInTheDocument();
}); 

//BILL HISTORY VOTES
test('renders without crashing and matches snapshot', function() {
    const {getByText, asFragment} = render(
        <BillHistoryVotes votes={billData['votes']}/>
    ); 
    expect(asFragment()).toMatchSnapshot();
    expect(getByText("On Passage, Objections of the President to the Contrary Notwithstanding")).toBeInTheDocument();
}); 

//BILL TITLE
test('renders without crashing and matches snapshot', function() {
    console.log(billData.bill)
    const {getByText, asFragment} = render(
        <BillTitle bill={billData}/>
    ); 
    expect(asFragment()).toMatchSnapshot();
    expect(getByText("H.R.6395: To authorize appropriations for fiscal year 2021 for military activities of the Department of Defense and for military construction, to prescribe military personnel strengths for such fiscal year, and for other purposes.")).toBeInTheDocument();
}); 