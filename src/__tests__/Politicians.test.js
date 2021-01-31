import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Route } from 'react-router-dom';
import PoliticianDetails from './../politicians/PoliticianDetails';
import LocalPoliticians from './../politicians/LocalPoliticians';
import PoliticianList from './../politicians/PoliticianList'; 

//POLITICIAN DETAILS COMPONENT
// test('renders without crashing', function() {
//     render(
//         <MemoryRouter initialEntries={['/senate/B001230']}>
//             <PoliticianDetails/>
//         </MemoryRouter>
//     ); 
// });

// test('it matches snapshot', function() {
//     const {asFragment} = render(
//         <MemoryRouter initialEntries={['/senate/B001230']}>
//             <PoliticianDetails/>
//         </MemoryRouter>   
//     );
//     expect(asFragment()).toMatchSnapshot();
// }); 


//LOCAL POLITICIANS COMPONENT
test('renders without crashing', function() {
    const path='/pols/:ocdDivId';
    const route='/pols/ocd-division%2Fcountry:us%2Fstate:wi%2Fcd:4'
    render(
        <MemoryRouter initialEntries={[route]}>
            <Route path={path}>
                <LocalPoliticians/>
            </Route>
        </MemoryRouter>
    ); 
}); 

// / Helper function
// export function renderWithRouterMatch( ui, 
//    { 
//       path = “/”, // ie. "/project/:id"
//       route = “/”, // ie. "/project/ABC123"
//       history = createMemoryHistory({ initialEntries: [route] }) 
//    } = {}) { 
//       return { 
//          …render( 
//             <Router history={history}> 
//                <Route path={path} component={ui} /> 
//             </Router> 
//          ) 
//       };
//    }



//IN HERE WE'LL TEST FOR BAD BILL NUMBERS WHICH MEANS 
//WE'LL NEED TO DO A LIL REDIRECTING BACK IN THE COMPONENT