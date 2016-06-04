var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var caseWorkerSchema = new Schema ({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    phonenumber: {type: Number, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    caseworkerID: {type: ObjectId}
});

caseWorkerSchema.pre('save', function (next) {
   var user = this;

    if(!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, function(err, salt) {
       if (err) {
           return next(err);
       }

        bcrypt.hash(user.password, salt, function(err, hash) {
           if (err) {
               return next(err);
           }
            user.password = hash;
            next();
        });
    });
});

caseWorkerSchema.methods.comparePassword = function (triedPassword, cb) {
    bcrypt.compare(triedPassword, this.password, function(err, isMatch) {
       if(err) return cb(err);
        cb(null, isMatch);
    });
};

var caseUser = mongoose.model('User', caseWorkerSchema);

module.exports = User;