const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

//middleWares
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lbe4zil.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        const productCollection = client.db('resaleProduct').collection('product');
        const userRoleCollection = client.db('resaleProduct').collection('userRole');

        app.post('/add-product', async(req, res)=>{
            const product = req.body;
            // console.log(product);
            const result = await productCollection.insertOne(product);
            res.send(result);
        });

        app.post('/user-role', async(req, res)=>{
            const role = req.body;
            const result = await userRoleCollection.insertOne(role);
            res.send(result);
        });

        
    }
    finally{

    }
}
run().catch(err=>console.log(err))


app.get('/', async(req, res) =>{
    res.send('Doctors portal server is running port ')
});

app.listen(port, ()=> {
    console.log(`doctors portal running on this ${port}`)
});