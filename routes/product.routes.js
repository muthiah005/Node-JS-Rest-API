module.exports = (app) => {
    const product = require('../controllers/product.controller.js');
    
    // Create a new Product
    app.post('/api/saveProduct', product.create);

    // Retrieve all products
    app.get('/api/getAllProducts', product.findAll);

    // Retrieve a single tab with productId
    app.get('/api/getOneProduct/:productId', product.findOne);

    // Update a tab with productId
    app.put('/api/updateOneProduct/:productId', product.update);

    // Delete a tab with productId
    app.delete('/api/removeProduct/:productId', product.delete);

    
}