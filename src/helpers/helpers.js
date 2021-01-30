function formatVotes(data) {
    return data['results'][0]['votes'];
}

function formatBillId(billId) {
    if(!billId) return;
    return billId.slice(0, billId.indexOf('-')).toUpperCase();
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function getStateAndCd(str) {
    let strArr = str.split('%2F').filter(x => x.indexOf(':') !== -1);
    let obj = {};
    for(let pair of strArr) {
      obj[pair.slice(0, pair.indexOf(':'))] = pair.slice(pair.indexOf(':') + 1);
    }
    return obj;
};

function slimItDown(arr, tlArr=[]) {
    tlArr = tlArr.filter(x => x !== undefined);
    if(arr.length) {
        let idx = 0; 
        let item = arr[idx];
        let tlItemCheck = tlArr.find(o => o.chamber === item.chamber && o.action_type === item.action_type);
        while(tlItemCheck && idx < arr.length - 1) {
            if(item.description === "Presented to President.") tlArr.push(item);
            idx++;
            item=arr[idx]; 
            tlItemCheck = tlArr.find(o => o.chamber === item.chamber && o.action_type === item.action_type);
        }
        tlArr.push(item);
        return slimItDown(arr.slice(arr.indexOf(item) + 1), tlArr);
    }
    return tlArr.filter(o => o.action_type !== "Calendars").reverse(); 
}

function dateTimeFormatter(datetime) {
    const month ={
        '01': "Jan",
        '02': "Feb",
        '03': "March",
        '04': "April",
        '05': "May",
        '06': "June",
        '07': "July",
        '08': "Aug",
        '09': "Sep",
        '10': "Oct",
        '11': "Nov",
        '12': "Dec"
    }
    datetime = datetime.split('-');
    return `${month[datetime[1]]} ${datetime[2]}, ${datetime[0]} `
};

function moneyFormatter(num, idx=num.length) {
    if(idx - 3 > 0) {
          idx -= 3;
          num = num.slice(0, idx) + ',' + num.slice(idx);
          return moneyFormatter(num, idx);
    };
    return '$' + num; 
};


/**Looks at Array of offices returned from user Location. Used to see if Location specific enough to include Congressional District*/

const checkForRep = (arr, office) => {
    return arr.data['offices'].filter(o => o.name === `U.S. ${office}`)
}

export {formatVotes, formatBillId, isEmpty, getStateAndCd, slimItDown, dateTimeFormatter, moneyFormatter, checkForRep};

    // while(arr.length) {
    //     if(action_type === "IntroReferral") {
    //         return timelineBuilder(arr.slice(tempIdx + 1).reverse(), timelineArr=timelineArr, action_type="Committee")
    //     } else if(action_type === "Committee") {
    //         return timelineBuilder(arr.slice(tempIdx + 1).reverse(), timelineArr=timelineArr, action_type="Floor")
    //     } else if(action_type === "Floor") {
    //         return timelineBuilder(arr.slice(tempIdx + 1).reverse(), timelineArr=timelineArr, action_type="ResolvingDifferences")
    //     } else if(action_type === "Floor") {
    //         return timelineBuilder(arr.slice(tempIdx + 1).reverse(), timelineArr=timelineArr, action_type="IntroReferral")
    //     } else return;
    // }

//new plan, forget about the chamber. just focus on the actions. 

// arr.reverse();
// timelineArr = timelineArr.filter(x => x !== undefined);
// console.log(timelineArr);
// let item = arr.find(o => o.action_type === action_type);
// let tempIdx = arr.indexOf(item);
// timelineArr.push(item);

// while(arr.length) {
//         if(chamber==="House" && action_type==="IntroReferral") {
//             return timelineBuilder(arr.slice(tempIdx + 1).reverse(), timelineArr=timelineArr, chamber="House", action_type="Committee")
//         } else if(chamber==="House" && action_type==="Committee") {
//             return timelineBuilder(arr.slice(tempIdx + 1).reverse(), timelineArr=timelineArr, chamber="House", action_type="Floor")           
//         } else if(chamber==="House" && action_type==="Floor") {
//             return timelineBuilder(arr.slice(tempIdx + 1).reverse(), timelineArr=timelineArr, chamber="Senate", action_type="IntroReferral");
//         } else if(chamber==="Senate" && action_type==="IntroReferral") {
//             return timelineBuilder(arr.slice(tempIdx + 1).reverse(), timelineArr=timelineArr, chamber="Senate", action_type="Committee");
//         } else if(chamber==="Senate" && action_type==="Committee") {
//             return timelineBuilder(arr.slice(tempIdx + 1).reverse(), timelineArr=timelineArr, chamber="Senate", action_type="Floor");
//         } else if(chamber==="Senate" && action_type==="Floor") {
//             return timelineBuilder(arr.slice(tempIdx + 1).reverse(), timelineArr=timelineArr, chamber="House", action_type="ResolvingDifferences");
//         } else if(chamber==="House" && action_type==="ResolvingDifferences") {
//             return timelineBuilder(arr.slice(tempIdx + 1).reverse(), timelineArr=timelineArr, chamber="Senate", action_type="Floor");
//         }
//         else return
//     } 
//     return;

    // if(chamber==="House" && action_type==="IntroReferral") {
    //     item = arr.find(o => o.chamber === chamber && o.action_type === action_type);
    //     tempIdx = arr.indexOf(item);
    //     timelineArr.push(item);
    //     return timelineBuilder(arr.slice(tempIdx + 1).reverse(), timelineArr=timelineArr, chamber="House", action_type="Committee")
    // } else if(chamber==="House" && action_type==="Committee") {
    //     item = arr.find(o => o.chamber === chamber && o.action_type === action_type);
    //     tempIdx = arr.indexOf(item);
    //     timelineArr.push(item);
    //     //return timelineBUilder(arr.slice(tempIdx + 1).reverse(), timelineArr=timelineArr, chamber="House", action_type="Floor")
    // } else if(chamber==="House" && action_type==="Floor") {}
  
// function checkForNullProp(prop) {
//     return prop === null ? 'disabled' : 'linkable'
// }

// function formatPhotoUrlIntoId(photoUrl) {
//     return photoUrl.replace('http://bioguide.congress.gov/bioguide/photo/', '').replace('.jpg', '').substring(2);
// }

// function parsePols(data, office) {
    //     const offices = data['offices'].filter(o => o.name === `U.S. ${office}`)[0];
    //     if(isEmpty(offices)) return; 
    //     const div = (offices.divisionId).replaceAll('/', '%2F'); 
    //     let pols = offices.officialIndices.map(idx => ({...data['officials'][idx], office: `U.S. ${office}`, divisionId: div}));
    //     for(let p of pols) {
    //         if('photoUrl' in p && p.photoUrl.includes('bioguide')) {
    //             p.id = formatPhotoUrlIntoId(p.photoUrl);
    //         }
    //     };
    //     return pols;
    // }

// async function checkForId(arr) {
//     for(let pol of arr) {
//         let chamber = pol.office.includes('Representative') ? 'representatives' : 'senators';
//         if(!('id' in pol)) {
//             pol.id = await getIdByNameAndDiv(pol.name, pol.divisionId, chamber);
//         }
//     };
//     return arr; 
// // }

// const timelineArr = [{...arr[0], me: "Bill is introduced in the house"}];
// timelineArr.push(arr.find(o => o.action_type === "Committee" && o.chamber === "House"));
// timelineArr[1] = {...timelineArr[1], me: "Bill enters commitee"}
// timelineArr.push(arr.find(o => o.action_type === "Floor" && o.chamber === "House"));
// timelineArr[2] = {...timelineArr[2], me: "Debate begins on the floor of the House"}
// timelineArr.push(arr.find(o => o.action_type === "IntroReferral" && o.chamber === "Senate"));
// timelineArr[3] = {...timelineArr[3], me: "Bill is introduced in the senate"}
// timelineArr.push(arr.find(o => o.action_type === "Floor" && o.chamber === "Senate"));
// timelineArr[4] = {...timelineArr[4], me: "Debate begins on the floor of the senate"}
// timelineArr.push(arr.find(o => o.action_type === "ResolvingDifferences" && o.chamber === "House"));
// timelineArr[5] = {...timelineArr[5], me: "Resolving differences begins. Bill is passed back and forth between chambers."}
// timelineArr.push(arr.find(o => o.description === "Presented to President."));
// timelineArr[6] = {...timelineArr[6], me: "The bill is handed to the president."}



// function timelineBuilder(arr, tlArr = [], cham="House", act="IntroReferral") {
//     arr.reverse();
//     let item = arr.find(o => o.chamber === cham && o.action_type === act);
//     let idx = arr.indexOf(item);
//     while(arr.length) {
//         if(cham==="House" && act==="IntroReferral") {
//             return timelineBuilder(arr.slice(idx + 1), tlArr, "House", "Committee"); 
//         } else if(cham==="")
//     }
//     console.log(arr);
//     return; 
// }

// function takeTwo(arr, tlArr=[], lastAction="IntroReferral", lastChamber="") {
//     let item;
//     tlArr = tlArr.filter(x => x !== undefined); 
//     let lastItem = tlArr[tlArr.length - 1];
//     let idx = 0;
//     if(!tlArr.length) {
//         item = arr[0];
//         tlArr.push(item);
//         return takeTwo(arr.slice(1), tlArr, "IntroReferral", item.chamber); 
//     }
//     if(arr.length) {
//         while(lastItem.chamber === arr[idx].chamber && lastItem.action_type === arr[idx].action_type && idx < arr.length - 1) {
//             idx++;
//         }
//         item = arr[idx];
//         tlArr.push(item);
//         return takeTwo(arr.slice(arr.indexOf(item) + 1), tlArr, item.action_type, item.chamber); 
//     } 
//     return tlArr; 
// }

// function timelineBuilder(arr, tlArr = [], act="IntroReferral") {
//     arr.reverse();
//     let item = arr.find(o => o.action_type === act);
//     tlArr.push(item);
//     let idx = arr.indexOf(item);
//     let newArr = arr.slice(idx + 1).reverse();
//     tlArr = tlArr.filter(x => x !== undefined);
//     if(act==="ResolvingDifferences") {
//         item = arr.find(o => o.description === "Presented to President.");
//         if(item === undefined) return tlArr;
//         tlArr.push(item);
//         return tlArr; 
//     }
//     if(newArr.length) {
//         if(act==="IntroReferral") {
//             return timelineBuilder(newArr, tlArr, "Committee"); 
//         } else if(act==="Committee") {
//             return timelineBuilder(newArr, tlArr, "Floor");
//         } else if(act==="Floor") {
//             if(tlArr[tlArr.length - 1].chamber==="Senate") {
//                 return timelineBuilder(newArr, tlArr, "ResolvingDifferences"); 
//             }
//             return timelineBuilder(newArr, tlArr, "IntroReferral")
//         }
//     }
//     return tlArr;
// }