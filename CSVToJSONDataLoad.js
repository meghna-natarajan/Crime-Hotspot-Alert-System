const csv = require('csvtojson');
const fs = require('fs');
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    hosts: ['localhost:9200']
});

const filePath = "/home/janani/Desktop/kafka_producer_consumer_tutorial-master/dataset/crime.csv";

async function csvToJSONDataLoad() {
    const jsonArray = await csv().fromFile(filePath);
    fs.writeFileSync('dataset.json',JSON.stringify(jsonArray));
    console.log(jsonArray.length);
} 

csvToJSONDataLoad();