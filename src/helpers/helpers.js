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