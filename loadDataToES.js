const data = require('./newModifiedDataset.json');

const elasticsearch = require('elasticsearch');;
const client = new elasticsearch.Client({
    hosts: ['localhost:9200']
});

const promise = require('bluebird');
promise.promisifyAll(client);

let numRecords = data.length;
// let numRecords = 62;

async function loadData() {
    for(let i = 0 ; i < numRecords ; i++) {
        // console.log(data[i]);
        let res = await client.indexAsync({
            index: 'crime_locations',
            body: data[i],
            id: i.toString()
        })
        console.log(i,res.result);
    }
}

loadData();
