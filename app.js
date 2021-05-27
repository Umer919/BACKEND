const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');


require('dotenv/config');
const api = process.env.API_URL;
var Schema = mongoose.Schema;


//middle ware 

app.use(morgan('tiny'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true
    }

})

const Product = mongoose.model('Product', productSchema);

console.log("Server is running",api);


app.post(`products`, (req, res) =>{
  
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: {
            type: Number,
            required: true
        }
    })

     product.save().then((createdProduct => {
         res.status(201).json(createdProduct)
         


     })).catch((err)=>{
         res.status(500).json({
             error: err,
             success: false
         })
         res.send(newProduct);
     })
        })

    app.post(`/products`, (req, res) =>{
        const newProduct = req.body;
        console.log(newProduct);
        res.send(newProduct);
     
        mongoose.connect(process.env.CONNECTION_STRING, {
            useNewUrlParser : true,
            useUnifiedTopology: true,
            dbName: 'eshop-database'
        })
        .then(()=>{
            console.log('Database Connection is Ready....')
        })
        .catch((err)=>{
            console.log(err);
        })
})



app.post('/api/stuff', (req, res, next) => {
    const thing = new Thing({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      userId: req.body.userId
    });
    thing.save().then(
      () => {
        res.status(201).json({
          message: 'Post saved successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });
app.get('/test',(req,res)=> res.send('Welcome to the Server'))

app.listen(3000, ()=> {
    console.log(api);
    console.log('server is running http://localhost:3000');

})
