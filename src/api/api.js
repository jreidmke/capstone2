import axios from 'axios';
import { formatVotes, getStateAndCd, checkForRep } from '../helpers/helpers';

//KEYS
const googleCivicDataKey = process.env.REACT_APP_GOOGLE_CIVIC_DATA_KEY;
const mapboxKey = process.env.REACT_APP_MAPBOX_KEY;
const propublicaKey = process.env.REACT_APP_PROPUBLICA_KEY;
const crpKey = process.env.REACT_APP_CRP_KEY;

//BASE URL's
const propublicaBaseUrl = `https://api.propublica.org/`
const googleBaseUrl = `https://www.googleapis.com/civicinfo/v2/representatives`;
const mapboxBaseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const crpBaseUrl = 'https://www.opensecrets.org/api/';

//PropublicaApi class created to reduce redundant code

class PropublicaApi {

    /**Generic Propublic API Request */
    static async request(endpoint, method='get') {
        console.debug("API Call:", endpoint, method);
        const url=`${propublicaBaseUrl}${endpoint}`;
        const headers = { 'X-API-Key': propublicaKey }; 
        try {
            return(await axios({url, method, headers})).data; 
        } catch (error) {
            console.error("API Error:", error.response);
            let message = error.response;
            throw Array.isArray(message) ? message : [message]; 
        }
    };

    /**GET POLITICIAN METHODS*/

    static async getPoliticianById(id) {
        const res = await this.request(`congress/v1/members/${id}.json`); 
        return res['results'][0]; 
    }; 

    //OcdDiv is string with State and District number
    static async getRepByOcd(obj, cd=1) {
        const res = await this.request(`congress/v1/members/house/${obj.state}/${cd}/current.json`);
        return res['results'][0];
    };

    //OcdDiv is string with State and District number
    static async getSenByOcd(obj) {
        const res = await this.request(`congress/v1/members/senate/${obj.state}/current.json`);
        return res['results'];
    };

    /**Returns All Politicians representing specified OCD string */
    static async getPoliticiansByOcd(ocdDiv) {
        let sens, rep;
        //some states with smaller Pop. only have one rep for the entire state
        let oneRepStates = ['ak', 'de', 'mt', 'nd', 'sd', 'vt', 'wy'];
        const ocdDivObj = getStateAndCd(ocdDiv);

        //if congressional district is in OCD String
        if('cd' in ocdDivObj) {
            rep = await this.getRepByOcd(ocdDivObj, ocdDivObj.cd);
        } 

        //if congressional district is NOT in OCD string AND the state in question only has one rep
        else if(!('cd' in ocdDivObj) && oneRepStates.indexOf(ocdDivObj.state) !== -1) {
            rep = await this.getRepByOcd(ocdDivObj);
        }

        sens = await this.getSenByOcd(ocdDivObj);
        return [sens, rep];
    }

    static async getStatementsByPolitician(polId) {
        const res = await this.request(`congress/v1/members/${polId}/statements/116.json`);
        return res.results; 
    };
    
    static async getVotesByPolitician(id) {
        const res = await this.request(`congress/v1/members/${id}/votes.json`);
        return formatVotes(res); 
    };

    static async getAllPoliticians(chamber) {
        const res = await this.request(`congress/v1/117/${chamber}/members.json`);
        return res; 
    };

    /**GET BILL METHODS */
    
    static async getBillData(id) {
        id = id.split('-');
        const res = await this.request(`congress/v1/${id[1]}/bills/${id[0]}.json`);
        return res.results[0]; 
    };

    static async getBillCosponsers(id) {
        id = id.split('-');
        const res = await this.request(`congress/v1/${id[1]}/bills/${id[0]}/cosponsors.json`);
        return res.results[0]; 
    };

    static async getRecentBills(status) {
        const res = await this.request(`congress/v1/117/both/bills/${status}.json`);
        return res.results[0].bills;
    };

    static async searchBills(term) {
        const res = await this.request(`congress/v1/bills/search.json?query=${term}`);
        if(!res.results[0].bills.length) return [];
        return res.results[0].bills;
    };

    static async getCosponsoredBills(id) {
        const res = await this.request(`congress/v1/members/${id}/bills/cosponsored.json`);
        return res.results[0].bills; 
    };

    /**GET NOMINATION METHODS */

    static async getNominationData(nomId) {
        const res = await this.request(`congress/116/nominees/${nomId}.json`);
        return res.results[0]; 
    }; 
}; 



/*OTHER API CALLS (GOOGLE CIVIC DATA, MAPBOX AND CRB)*/



/** Uses the Google Civic Data API to Return an OCD String via user location 
 * 
 * OCD Strings show the State and (if location specific enough) the Congressional Disctrict (ex: )
*/

const getOCDStringByAddress = async(address) => {
    try {
        const resp = await axios.get(`${googleBaseUrl}?address=${address}&levels=country&key=${googleCivicDataKey}`);

        /**checkForRep looks to see if location data was specific enough to include congressional district */
        let officeArray = checkForRep(resp, 'Representative');

        /**If not, it uses the OCD String from the Senator */
        if(!officeArray.length) officeArray = checkForRep(resp, 'Senator');

        /** Encodes slashes for URL use*/
        return officeArray[0].divisionId.replaceAll('/', '%2F');
    } catch (error) {
        console.error("API Error:", error.response);
        let message = error.response.data.error.message;
        return message;        
    }
}; 


/**Uses Naviagtion API data to retrieve nearest street address from MapBox Api*/

const getAddressByCoords = async(lat, lon) => {
    const resp = await axios.get(`${mapboxBaseUrl}${lon},${lat}.json?access_token=${mapboxKey}`);
    return resp.data.features[0].place_name;
}

const getCampaignContributions = async(id) => {
    const resp = await axios.get(`${crpBaseUrl}?method=candContrib&cid=${id}&cycle=2020&apikey=${crpKey}&output=json`)
};

export { getAddressByCoords, getOCDStringByAddress, PropublicaApi }
