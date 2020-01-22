module.exports = (app) => {
    const tab = require('../controllers/tab.controller.js');
    
    // Create a new tab
    app.post('/api/saveTabInfo', tab.create);

    // Retrieve all tabs
    app.get('/api/getAllTabs', tab.findAll);

    // Retrieve a single tab with tabId
    app.get('/api/getOneTab/:tabId', tab.findOne);

    // Update a tab with tabId
    app.put('/api/updateOneTab/:tabId', tab.update);

    // Delete a tab with tabId
    app.delete('/api/removeTab/:tabId', tab.delete);

    
}