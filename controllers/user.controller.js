const User = require('../models/user.model.js');

// Create and Save a new user
exports.create = (req, res) => {
    if(!req.body.email) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }

    // Create a User
    const user = new User({
        email: req.body.email, 
        password: req.body.password, 
        firstName: req.body.firstName,
        lastName: req.body.lasttName
    });

    // Save User in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the userS."
        });
    });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving userS."
        });
    });
};

// Find a singleuser with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.userId
        });
    });
};

// Update auser identified by the userId in the request
exports.update = (req, res) => {
// Validate Request
if(!req.body.email) {
    return res.status(400).send({
        message: "Note content can not be empty"
    });
}

// Find User and update it with the request body
User.findByIdAndUpdate(req.params.userId, {
    name: req.body.name || "Untitled Note",
    email: req.body.email
}, {new: true})
.then(user => {
    if(!user) {
        return res.status(404).send({
            message: "Note not found with id " + req.params.userId
        });
    }
    res.send(user);
}).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Note not found with id " + req.params.userId
        });                
    }
    return res.status(500).send({
        message: "Error updating note with id " + req.params.userId
    });
});
};

// Delete auser with the specified userId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};


exports.authenticate = (req, res) => {
   const user = new User(req.body);
   User.findOne({ email:user.email ,password:user.password})
   .then(user => {
       if(!user) {
           return res.status(404).send({
               message: "user not found with id " + req.params.userId
           });            
       }
       res.send(user);
   }).catch(err => {
       if(err.kind === 'ObjectId') {
           return res.status(404).send({
               message: "user not found with id " + req.params.userId
           });                
       }
       return res.status(500).send({
           message: "Error retrieving note with id " + req.params.userId
       });
   });
};

