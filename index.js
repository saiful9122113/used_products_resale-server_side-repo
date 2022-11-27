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
        const orderCollection = client.db('resaleProduct').collection('order');

        // Api for adding Product 
        app.post('/add-product', async(req, res)=>{
            const product = req.body;
            // console.log(product);
            const result = await productCollection.insertOne(product);
            res.send(result);
        });

        // Api for post user & seller information 
        app.post('/user-role', async(req, res)=>{
            const role = req.body;
            const result = await userRoleCollection.insertOne(role);
            res.send(result);
        });

        // Api for sellers own product 
        app.get('/products/:email', async (req, res) => {
            const query = { email: req.params.email };
            const result = await productCollection.find(query).toArray();
            res.send(result);
        });
        
        // Api for categorywise data 
        app.get('/product/:category', async (req, res) => {
            const query = { category: req.params.category };
            const result = await productCollection.find(query).toArray();
            res.send(result);
        });

        // Api for adding order 
        app.post('/add-order', async(req, res)=>{
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.send(result);
        });

        //   app.get('/review', async(req, res) =>{
        //     // console.log(req.query.email);
        //     let query = {};
        //     if(req.query.email){
        //         query={
        //             email: req.query.email
        //         }
        //     }
        //     const review = await reviewCollection.find(query).toArray();
        //     res.send(review);
        // })

        // API for get products 
        // app.get('/products', async(req, res)=>{
        //     const query = {_id: ObjectId(id)};
        //     const cursor = productCollection.find(query);
        //     console.log(productCollection);
        //     const products = await cursor.toArray();
        //     return res.send(products);
        // })

        // app.get('/services/:id', async(req, res)=>{
        //     const id = req.params.id;
        //     const query ={_id: ObjectId(id)};
        //     const service = await serviceCollection.findOne(query);
        //     res.send(service);
        // })

        
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