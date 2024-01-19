const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


// library-system
// aQT5wb6ywzzzUyyk


const uri = "mongodb+srv://library-system:aQT5wb6ywzzzUyyk@cluster0.2v17pzr.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
     
    const AllBrand = client.db("Librasy-system").collection("brand");
    const Allbooks = client.db("Librasy-system").collection("allbooks");
  
// Books Data
    app.get("/brand",async (req,res)=>{
      const brand = AllBrand.find();
      const result = await brand.toArray();
      res.send(result)
    })
    app.get("/allbooks",async (req,res)=>{
      const brand = Allbooks.find();
      const result = await brand.toArray();
      res.send(result)
    })
    app.get("/books/:books",async (req,res)=>{
      const brand = req.params.books;
      const data = Allbooks.find({category : brand} )
      const result = await data.toArray();
      res.send(result)
    })
    app.get("/book/:name",async (req,res)=>{
      const name = req.params.name;
      const data = Allbooks.find({ name : name })
      const result = await data.toArray();
      res.send(result)
    })
    // add book
    app.post("/add",async (req,res)=> {
      const data = req.body;
      const result = await Allbooks.insertOne(data)
      res.send(result);
    })

    // Update 
    app.put("/update/:id",async (req,res)=>{
      const id = req.params.id;
      const data = req.body;
      const quary = { _id : new ObjectId(id)};
      const updateData = {
        $set:{
          name : data.name,
          author : data.author,
          rating : data.rating,
          image : data.image,
          category : data.category,

        }
      }

  const result = await Allbooks.updateOne(quary,updateData);
  res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/',(req,res) => {
  res.send('Server site is running')
})

app.listen(port,() =>{
  console.log(`Server site is running on port: ${port}`)
})