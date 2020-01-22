module.exports = (app) => {
    const user = require('../controllers/user.controller.js');
    
    app.post('/api/authenticate', user.authenticate);

    // Create a new user
    app.post('/api/createUser', user.create);

    // Retrieve all users
    app.get('/api/getAllUsers', user.findAll);

    // Retrieve a single user with userId
    app.get('/api/getOneUser/:userId', user.findOne);

    // Update a user with userId
    app.put('/api/updateOneUser/:userId', user.update);

    // Delete a user with userId
    app.delete('/api/removeUser/:userId', user.delete);

    
}