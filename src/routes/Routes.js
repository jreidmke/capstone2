import { Route, Switch } from "react-router-dom";
import Bill from './../bills/BillDetails';
// import Nominee from './Nominee';
import PoliticianList from "./../politicians/PoliticianList";
import LandingPage from './../homepage/LandingPage';
import LocalPoliticians from './../politicians/LocalPoliticians';
import PoliticianDetails from './../politicians/PoliticianDetails';
import NomineeDetails from './../nominees/NomineeDetails';
import Hompage from "./../homepage/Homepage";
import BillSearchResults from './../bills/BillSearchResults'; 

const Routes = () => {
    return(
        <div>
            <Switch>

                <Route exact path="/">
                    <LandingPage/>
                </Route>

                <Route exact path="/home">
                    <Hompage/>
                </Route>

                <Route path="/pols/:ocdDivId">
                    <LocalPoliticians/>
                </Route>

                <Route exact path='/senate'>
                    <PoliticianList chamber='senate'/>
                </Route>

                <Route path='/senate/:id'>
                    <PoliticianDetails/>
                </Route>

                <Route exact path='/house'>
                    <PoliticianList chamber='house'/>
                </Route>

                <Route path='/house/:id'>
                    <PoliticianDetails/>
                </Route>

                <Route path='/bills/search/:searchTerm'>
                    <BillSearchResults/>
                </Route>

                <Route path='/bills/:billId'>
                    <Bill/>
                </Route>

                <Route path='/noms/:nomId'>
                    <NomineeDetails/>
                </Route>

               

            </Switch>
        </div>
    )
}

export default Routes;
