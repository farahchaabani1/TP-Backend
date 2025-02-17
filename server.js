const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/products", {
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Error ...', err);
    process.exit();
});

const produit = express();

produit.use(bodyParser.urlencoded({ extended: true }))

produit.use(bodyParser.json())

produit.get('/', (req, res) => {
    res.json({"message": "Server is running :D"});
});

let PORT = 8080

require('./Produit/routes/productroute.js')(produit);

produit.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});