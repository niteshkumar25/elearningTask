const {MongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017/';
const database = 'eleraningtask';
const client = new MongoClient(url);
async function dbConnect(collectionName)
{
    let result =  await client.connect();
    let db = result.db(database);
    return db.collection(collectionName);
}


module.exports = dbConnect;


