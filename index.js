const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config()

app.use(cors());
app.use(express.json());

//user : simpleDBuser
//pass : vpLJKUVtJlJg9r1J

const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_password}@cluster0.u8prwai.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API //
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const database = client.db('usersdb');
    const userCollection = database.collection('users');

    app.get('/users', async (req, res) => {
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post('/users', async (req, res) => {
      console.log('data in the server', req.body);
      const newUser = req.body;
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });

    await client.db('admin').command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close(); // এখন বন্ধ করিস না, নইলে ডেটাবেজ connect থাকবেনা
  }
}


run().catch(console.dir);

app.get('/', (req,res) => {
  res.send('simple crud server running')
})

app.listen(port, () => {
    console.log(`simple crud server running ${port}`)
})