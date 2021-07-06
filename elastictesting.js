const elasticsearch = require('elasticsearch');;
const client = new elasticsearch.Client({
    hosts: ['localhost:9200']
});

const promise = require('bluebird');
promise.promisifyAll(client);

async function check () {
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
// client.indices.exists({index: 'geo_testing'}, (err, res, status) => {
//     if (res) {
//         console.log('index already exists');
//     } else {
//         client.indices.create( {index: 'geo_testing'}, (err, res, status) => {
//         console.log(err, res, status);
//     })
//   }
// })

// to set the mapping of an index
// client.indices.putMapping({  
//     index: 'geo_test',
//     type : "crime_records",
//     includeTypeName: true,
//     body: {
//       properties: {
//           "OFFENSE_TYPE_ID": {
//               "type": "text"
//           },
//           "OFFENSE_CATEGORY_ID": {
//               "type": "text"
//           },
//           "INCIDENT_ADDRESS": {
//               "type": "text"
//           },
//           "LOCATION": { 
//               //will contain geo_lon and geo_lat
//               "type": "geo_point"
//           },
//           "NEIGHBORHOOD_ID": {
//               "type": "text"
//           },
//           "REPORTED_DATE": {
//               "type": "date",
//               "format": "dd-MM-yyyy HH:mm:ss"
//           }
//       }
//     }
//   }, (err, resp, status) => {
//       if (err) console.log(err);
//       else console.log(resp,status);
//   });

// to list all the indices
// client.cat.indices({format: 'json'}).then((index) => console.log(index));

// to get the mapping of a particular index
// client.indices.getMapping({
//     index: 'geo_test'
// },(err, res) => {
//     if(err) console.log(err);
//     else console.log(res.geo_test.mappings.properties);
// })

// to add a document to an index in es
// client.index({
//     index: 'wa_cities_points',
//     body: {
//         "location": {
//             "lat": 41.18,
//             "lon": -71.34
//         },
//         "name": "just some dummy point to test it out"
//     }
// }, (err,resp,status) => {
//     if(err) console.log(err)
//     else {
//         console.log(resp);
//         console.log(status);
//         console.log('-----------------------------------------------------------');
//         //to count the number of docs in an index
//         client.count({index: 'wa_cities_points'})
//         .then((err,resp) => {
//             if(err) console.log(err)
//             else console.log(resp)
//         })
//     }
// })


//to count the number of docs in an index

// promise version
// let countRes = await client.countAsync({index: 'crime_locations'});
// console.log(countRes);

// callback version
// client.count({index: 'wa_cities_points'})
// .then((err,resp) => {
//     if(err) console.log(err)
//     else console.log(resp)
// })


// to search for and list documents in an index - includes code to delete
// client.search({  
//   index: 'crime_locations',
//   body: {
//     query: {
//       match_all: {}
//     },
//   }
// },function (error, response,status) {
//     if (error){
//       console.log("search error: " + error)
//     }
//     else {
//       console.log("--- Response ---");
//       console.log(response);
//       console.log("--- Hits ---");
//       response.hits.hits.forEach(function(hit){
//         // console.log(hit);
//         client.delete({
//             index: hit._index,
//             id: hit._id
//         },(err,res) => {
//             if(err) console.log(err);
//             else console.log(res);
//         })
//       })
//     }
// });

// search for query
// let resp = await client.searchAsync({
//     index: 'crime_locations',
//     body: {
//         "query" : {
//             "bool" : {
//                 "must" : {
//                     "match_all" : {}
//                 },
//                 "filter" : {
//                     "geo_distance" : {
//                         "distance" : "10km",
//                         "LOCATION" : [-104.9151061,39.650024]
//                     }
//                 }
//             }
//         }
//     }
// })
// console.log(resp);

// client.search({  
//     index: 'crime_locations',
//     body: {
//         "query" : {
//             "bool" : {
//                 "must" : {
//                     "match_all" : {}
//                 },
//                 "filter" : {
//                     "geo_distance" : {
//                         "distance" : "10km",
//                         "LOCATION" : [-104.9151061,39.650024]
//                     }
//                 }
//             }
//         }
//     }
// },function (error, response, status) {
//     if (error){
//         console.log(error)
//     }
//     else {
//         console.log("status : " + status);
//         console.log("--- Response ---");
//         console.log(response);
//         console.log("--- Hits ---");
//         response.hits.hits.forEach(function(hit){
//         console.log(hit);
//       })
//     }
// });

}

check();

// const d = require('./newModifiedDataset.json');
// console.log(d.length);

// here we are forcing an index refresh, otherwise we will not
  // get any result in the consequent search
//   await client.indices.refresh({ index: 'game-of-thrones' })

async function search (lat, lon, radius) {
    console.log(lat,lon,radius)
    let resp = await client.searchAsync({
        index: 'crime_locations',
        body: {
            "query" : {
                "bool" : {
                    "must" : {
                        "match_all" : {}
                    },
                    "filter" : {
                        "geo_distance" : {
                            "distance" : radius,
                            "LOCATION" : [lat,lon]
                        }
                    }
                }
            }
        }
    })
    return resp;
}

module.exports = {search};