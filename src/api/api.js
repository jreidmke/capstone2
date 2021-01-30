import axios from 'axios';
import { formatVotes, getStateAndCd} from './../helpers/helpers';
import {googleCivicDataKey, mapboxKey, propublicaKey, crpKey} from './../keys';


const baseUrlGoogle = `https://www.googleapis.com/civicinfo/v2/representatives`;

const propublicaBaseUrl = `https://api.propublica.org/`

const mapboxBaseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

const crpBaseUrl = 'https://www.opensecrets.org/api/';

const getPoliticiansByOcdDivId = async(ocdDivId) => {
    let sens, rep;
    let oneRepStates = ['ak', 'de', 'mt', 'nd', 'sd', 'vt', 'wy']
    const ocdDivIdObj = getStateAndCd(ocdDivId);
    if('cd' in ocdDivIdObj) {
        sens = await getSenByOcdDiv(ocdDivIdObj);
        rep = await getRepByOcdDiv(ocdDivIdObj, ocdDivIdObj.cd);
    } else if(!('cd' in ocdDivIdObj) && oneRepStates.indexOf(ocdDivIdObj.state) !== -1) {
        sens = await getSenByOcdDiv(ocdDivIdObj);
        rep = await getRepByOcdDiv(ocdDivIdObj);
    } else {
        sens = await getSenByOcdDiv(ocdDivIdObj); 
    }
    return [sens, rep];
}

const getOCDStringByAddress = async(address) => {
    const resp = await axios.get(`${baseUrlGoogle}?address=${address}&levels=country&key=${googleCivicDataKey}`);
    let officeArray = checkForRep(resp, 'Representative');
    if(!officeArray.length) officeArray = checkForRep(resp, 'Senator');
    return officeArray[0].divisionId.replaceAll('/', '%2F');
}

const checkForRep = (arr, office) => {
    return arr.data['offices'].filter(o => o.name === `U.S. ${office}`)
}

const getRepByOcdDiv = async(obj, cd=1) => {
    const resp = await axios.get(`${propublicaBaseUrl}congress/v1/members/house/${obj.state}/${cd}/current.json`, {
        headers: {
            'X-API-Key': propublicaKey
        }
    });
    return resp.data.results[0];
} 

const getSenByOcdDiv = async(obj) => {
    const resp = await axios.get(`${propublicaBaseUrl}congress/v1/members/senate/${obj.state}/current.json`, {
        headers: {
            'X-API-Key': propublicaKey
        }
    });
    return resp.data.results; 
}

const getPoliticianById = async(id) => {
    const resp = await axios.get(`${propublicaBaseUrl}congress/v1/members/${id}.json`, {
        headers: {
            'X-API-Key': propublicaKey
        }
    });
    return resp.data['results'][0]; 
}

const getBillsByPolitician = async(id) => {
    const resp = await axios.get(`${propublicaBaseUrl}congress/v1/members/${id}/votes.json`, {
        headers: {
            'X-API-Key': propublicaKey
        }
    });
    const voteArr = formatVotes(resp.data);
    return voteArr;
}

const getStatementsByPolitician = async(polId) => {
    const resp = await axios.get(`${propublicaBaseUrl}congress/v1/members/${polId}/statements/116.json`, {
        headers: {
            'X-API-Key': propublicaKey
        }
    });
    return resp.data.results;
}

const getBillData = async(id) => {
    id = id.split('-');
    const resp = await axios.get(`${propublicaBaseUrl}congress/v1/${id[1]}/bills/${id[0]}.json`, {
        headers: {
            'X-API-Key': propublicaKey
        }
    });
    console.log(resp);
    return resp.data['results'][0];
}

const getBillCosponsers = async(id) => {
    id = id.split('-');
    const resp = await axios.get(`${propublicaBaseUrl}congress/v1/${id[1]}/bills/${id[0]}/cosponsors.json`, {
        headers: {
            'X-API-Key': propublicaKey
        }
    });
    return resp.data['results'][0];
}

const getNominationData = async(nomId) => {
    const id = nomId.split('-');
    console.log(id);
    const resp = await axios.get(`https://api.propublica.org/congress/${id[1]}/116/nominees/${id[0]}.json`, {
        headers: {
            'X-API-Key': propublicaKey
        }
    });
    return resp.data['results'][0];
}

const getAllPoliticians = async(chamber) => {
    const resp = await axios.get(`${propublicaBaseUrl}congress/v1/116/${chamber}/members.json`, {
        headers: {
            'X-API-Key': propublicaKey
        }
    });
    return resp.data;
}

const getAddressByCoords = async(lat, lon) => {
    const resp = await axios.get(`${mapboxBaseUrl}${lon},${lat}.json?access_token=${mapboxKey}`);
    return resp.data.features[0].place_name;
}

const getRecentBills = async(status) => {
    const resp = await axios.get(`https://api.propublica.org/congress/v1/117/both/bills/${status}.json`, {
        headers: {
            'X-API-Key': propublicaKey
        }
    });
    return resp.data.results[0].bills; 
}

const searchBills = async(term) => {
    const resp = await axios.get(`https://api.propublica.org/congress/v1/bills/search.json?query=${term}`, {
        headers: {
            'X-API-Key': propublicaKey
        }
    });
    if(!resp.data.results[0].bills.length) return []; 
    return resp.data.results[0].bills; 
}

const getCosponsoredBills = async(id) => {
    const resp = await axios.get(`${propublicaBaseUrl}congress/v1/members/${id}/bills/cosponsored.json`, {
        headers: {
            'X-API-Key': propublicaKey
        }
    });
    return resp.data.results[0].bills
};

const getCampaignContributions = async(id) => {
    const resp = await axios.get(`${crpBaseUrl}?method=candContrib&cid=${id}&cycle=2020&apikey=${crpKey}&output=json`)
}

export { getAllPoliticians, getBillsByPolitician, getBillData, getBillCosponsers, getStatementsByPolitician, getNominationData,  getPoliticianById, getAddressByCoords, getOCDStringByAddress, getPoliticiansByOcdDivId, getRecentBills, searchBills, getCosponsoredBills}


// const getReps = async(address) => {
//     const resp = await axios.get(`${baseUrlGoogle}?address=${address}&levels=country&key=${googleCivicDataKey}`);
//     let sens = parsePols(resp.data, "Senator");
//     const rep = parsePols(resp.data, "Representative");
//     return rep === undefined ? [sens] : [sens, rep];
// }

// const getIdByNameAndDiv = async(name, divisionId, chamber) => {
//     const resp = await axios.get(`http://localhost:3001/pols/${name}/${divisionId}/${chamber}`);
//     return resp.data.id;
// }

//come back and make this a class. like they did in the jobly one. 
// const getAllSenators = async() => {
//     // const resp = await axios.get(`https://api.propublica.org/congress/v1/116/senate/members.json`, {
//     //     headers: {
//     //         'X-API-Key': propublicaKey
//     //     }
//     // });
//     // console.log(data['results'][0].members);
//     // return data;
    
//     const items = data['results'][0].members
//     const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
//     const header = Object.keys(items[0])
//     const csv = [
//       header.join(','), // header row first
//       ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
//     ].join('\r\n')
    
//     console.log(csv)
// }

// import axios from 'axios';

// const googleBaseUrl = `https://www.googleapis.com/civicinfo/v2/representatives`;
// const googleKey = `AIzaSyCWLce2CCx2VltxV-HGag2af7bv8SN9E2s`;

// const propublicaBaseUrl = `https://api.propublica.org/`
// const propublicaKey = 'GqAugiG0q8i70M5PkvHF0s1JoySk7bYNPPGpQeNi';


// const mapboxBaseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
// const mapboxKey = 'pk.eyJ1IjoianJlaWRta2UiLCJhIjoiY2trMnM4YW01MTIzZDJucWo3cmtleGI2diJ9.QCGudPD8mXjeVQmiiurL8g';

// class Api {
//     static async googleCivicDataRequest(endpoint) {
//         console.debug("Google Civic Data API Call:", endpoint);
//         const url = `${googleBaseUrl}/${endpoint}?key=${googleKey}`;
//         try {
//             return (await axios({url, method})).data;
//         } catch (error) {
//             console.error("API Error:", error.response);
//             let msg = error.response.data.error.message;
//             throw Array.isArray(msg) ? msg : [msg];
//         }      
//     }

//     static async propublicaDataRequest(endpoint) {
//         console.debug("Propublica Congressional Data API Call:", endpoint);
//         const url = `${propublicaBaseUrl}/${endpoint}`

//     }

// }