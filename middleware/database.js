require("dotenv").config();
const { MongoClient } = require("mongodb");
 

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-hgbb4.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true`;

const client = new MongoClient(url);

export async function setUpDb(db) {
	db.collection('thumbnails');
	db.collection('comics');
}

export default async function database(req, res, next) {
	if(!client.isConnected()) await client.connect();
	req.dbClient = client;
	req.db = client.db(process.env.DB_NAME);
	setUpDb(req.db);
	return next();
}
