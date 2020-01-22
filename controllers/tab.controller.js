const Tab = require('../models/tab.model.js');

// Create and Save a new Tab info
exports.create = (req, res) => {
    if(!req.body.name) {
        return res.status(400).send({
            message: "tab content can not be empty"
        });
    }

    // Create a Tab
    const tab = new Tab({
        name: req.body.name,
        description: req.body.description
    });

    // Save User in the database
    tab.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the tab."
        });
    });
};

// Retrieve and return all tabs from the database.
exports.findAll = (req, res) => {
    Tab.find()
    .then(tabs => {
        res.send(tabs);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving tabs."
        });
    });
};

// Find a singleuser with a tabId
exports.findOne = (req, res) => {
    Tab.findById(req.params.tabId)
    .then(tab => {
        if(!tab) {
            return res.status(404).send({
                message: "user not found with id " + req.params.tabId
            });            
        }
        res.send(tab);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.tabId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.tabId
        });
    });
};

// Update auser identified by the userId in the request
exports.update = (req, res) => {
// Validate Request
if(!req.body.name) {
    return res.status(400).send({
        message: "tab content can not be empty"
    });
}

// Find User and update it with the request body
Tab.findByIdAndUpdate(req.params.tabId, {
    name: req.body.name || "Untitled Note",
    description: req.body.description
}, {new: true})
.then(tab => {
    if(!tab) {
        return res.status(404).send({
            message: "Note not found with id " + req.params.tabId
        });
    }
    res.send(tab);
}).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Note not found with id " + req.params.tabId
        });                
    }
    return res.status(500).send({
        message: "Error updating note with id " + req.params.tabId
    });
});
};

// Delete auser with the specified userId in the request
exports.delete = (req, res) => {
    Tab.findByIdAndRemove(req.params.tabId)
    .then(tab => {
        if(!tab) {
            return res.status(404).send({
                message: "User not found with id " + req.params.tabId
            });
        }
        res.send({message: "Tab deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.tabId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.tabId
        });
    });
};



