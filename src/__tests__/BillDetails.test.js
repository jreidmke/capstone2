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
test('renders without crashing', function() {
    const {getByText} = render(

    )
})