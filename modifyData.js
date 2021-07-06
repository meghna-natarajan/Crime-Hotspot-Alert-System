const fs = require('fs');
const dataset = require('./dataset.json');

let numRecords = dataset.length;
// let numRecords = 2;

let newModifiedDataset = [];

for(let i = 0; i < numRecords; i++) {

    if(!dataset[i].OFFENSE_TYPE_ID || !dataset[i].OFFENSE_CATEGORY_ID || !dataset[i].INCIDENT_ADDRESS || !dataset[i].GEO_LAT || !dataset[i].GEO_LON || !dataset[i].NEIGHBORHOOD_ID || !dataset[i].REPORTED_DATE) continue;
    //adding the required fields alone
    let cur = {
        "OFFENSE_TYPE_ID" : dataset[i].OFFENSE_TYPE_ID,
        "OFFENSE_CATEGORY_ID" : dataset[i].OFFENSE_CATEGORY_ID,
        "INCIDENT_ADDRESS" : dataset[i].INCIDENT_ADDRESS,
        "LOCATION" : {
            "lat" : parseFloat(dataset[i].GEO_LAT),
            "lon" : parseFloat(dataset[i].GEO_LON)
        },
        "NEIGHBORHOOD_ID" : dataset[i].NEIGHBORHOOD_ID
    }

    //formatting the date
    let tempDate = dataset[i].REPORTED_DATE;

    let first = tempDate.indexOf("/");
    let MM = tempDate.substring(0,first);
    if(MM.length < 2) MM = '0'+MM;

    let second = tempDate.indexOf("/", first+1);
    let dd = tempDate.substring(first+1,second);
    if(dd.length < 2) dd = '0'+dd;

    let yyyy = tempDate.substring(second+1, second+5);

    let third = tempDate.indexOf(":");
    let HH = parseInt(tempDate.substring(second+6,third));
    let add = 0;
    if((tempDate.substring(tempDate.length-2) == 'PM' && HH!=12) || (tempDate.substring(tempDate.length-2) == 'AM' && HH==12)) add = 12;
    HH = (HH+add)%12;
    HH = HH.toString();
    if(HH.length < 2) HH = '0'+HH;

    let fourth = tempDate.indexOf(":",third+1);
    let mm = tempDate.substring(third+1,fourth);
    if(mm.length < 2) mm = '0'+mm;

    let ss = '00';

    let newDate = dd + '-' + MM + '-' + yyyy + ' ' + HH + ':' + mm + ':' + ss;

    cur['REPORTED_DATE'] = newDate;

    newModifiedDataset.push(cur);

    console.log(i);
    // console.log(cur);
}

fs.writeFileSync('newModifiedDataset.json', JSON.stringify(newModifiedDataset));

console.log(newModifiedDataset.length);

