const elasticsearch = require('elasticsearch');;
const client = new elasticsearch.Client({
    hosts: ['localhost:9200']
});

// to test connection to es
// client.ping({
//     // ping usually has a 3000ms timeout
//     requestTimeout: 1000
//   }, function (error) {
//     if (error) {
//       console.trace('elasticsearch cluster is down!');
//     } else {
//       console.log('All is well');
//     }
//   });

// to check if an index exists and create one if it doesn't
// client.indices.exists({index: 'crime_locations'}, (err, res, status) => {
//     if (res) {
//         console.log('index already exists');
//     } else {
//         client.indices.create( {index: 'crime_locations'}, (err, res, status) => {
//         console.log(err, res, status);
//     })
//   }
// })


// to set the mapping of an index - incomplete for now
client.indices.putMapping({  
  index: 'crime_locations',
  includeTypeName: true,
  type: 'crime_record',
  body: {
    properties: {
        "OFFENSE_TYPE_ID": {
            "type": "text"
        },
        "OFFENSE_CATEGORY_ID": {
            "type": "text"
        },
        "REPORTED_DATE": {
            "type": "date",
            "format": "dd-MM-yyyy HH:mm:ss"
        },
        "INCIDENT_ADDRESS": {
            "type": "text"
        },
        "LOCATION": { 
            //will contain geo_lon and geo_lat
            "type": "geo_point"
        },
        "NEIGHBORHOOD_ID": {
            "type": "text"
        }
    }
  }
}, (err, resp, status) => {
    if (err) console.log(err);
    else console.log(resp,status);
});

// to list all the indices
// client.cat.indices({format: 'json'}).then((index) => console.log(index));

// to get the mapping of a particular index
// client.indices.getMapping({
//     index: 'crime_locations'
// },(err, res) => {
//     if(err) console.log(err);
//     else console.log(JSON.stringify(res));
// })

//to count the number of docs in an index
// client.count({index: 'crime_locations'})
// .then((err,resp) => {
//     if(err) console.log(err)
//     else console.log(resp)
// })
