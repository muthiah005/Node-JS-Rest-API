const Product = require('../models/product.model.js');

// Create and Save a new product
exports.create = (req, res) => {
    if(!req.body.name) {
        return res.status(400).send({
            message: "product content can not be empty"
        });
    }

    // Create a product
    const product = new Product({
        name: req.body.name, 
        description: req.body.description, 
        price: req.body.price
    });

    // Save product in the database
    product.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the productS."
        });
    });
};

// Retrieve and return all products from the database.
exports.findAll = (req, res) => {
    Product.find()
    .then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving productS."
        });
    });
};

// Find a singleproduct with a productId
exports.findOne = (req, res) => {
    Product.findById(req.params.productId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "product not found with id " + req.params.productId
            });            
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.productId
        });
    });
};

// Update aproduct identified by the productId in the request
exports.update = (req, res) => {
// Validate Request
if(!req.body.name) {
    return res.status(400).send({
        message: "Note content can not be empty"
    });
}

// Find product and update it with the request body
Product.findByIdAndUpdate(req.params.productId, {
    name: req.body.name || "Untitled Note",
    description: req.body.description,
    price: req.body.price
}, {new: true})
.then(product => {
    if(!product) {
        return res.status(404).send({
            message: "Note not found with id " + req.params.productId
        });
    }
    res.send(product);
}).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Note not found with id " + req.params.productId
        });                
    }
    return res.status(500).send({
        message: "Error updating note with id " + req.params.productId
    });
});
};

// Delete aproduct with the specified productId in the request
exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.productId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "product not found with id " + req.params.productId
            });
        }
        res.send({message: "product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Could not delete product with id " + req.params.productId
        });
    });
};



