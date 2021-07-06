const Kafka = require('kafka-node');
const config  = require('./config');

const Producer = Kafka.Producer;
const client = new Kafka.KafkaClient({kafkaHost: config.KafkaHost});
const producer = new Producer(client,  {requireAcks: 0, partitionerType: 2});

const pushDataToKafka = (dataToPush) => {
  try {
    let payloadToKafkaTopic = [{topic: config.KafkaTopic, messages: JSON.stringify(dataToPush) }];
    // console.log(payloadToKafkaTopic);
    producer.on('ready', async function() {
      producer.send(payloadToKafkaTopic, (err, data) => {
        console.log('data: ', data);
      });
      producer.on('error', function(err) {
        //  handle error cases here
        console.log('an error occurred!' + err);
      })
    })
  }
  catch(error) {
    console.log(error);
  }
};

const jsonData = require('./coordinatesGen');

// let len = jsonData.length;
let len = 1;

for(let i=0;i<len;i++) {
  jsonData[i]['radius'] = '10km';
  pushDataToKafka(jsonData[i]);
  console.log(i);
}
// pushDataToKafka(jsonData);
