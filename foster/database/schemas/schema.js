var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

//define schemas
var caseWorkerSchema = new Schema ({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    phonenumber: {type: Number, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    caseworkerID: {type: Schema.Types.ObjectId}
});

var fosterSchema = new Schema({
    fistname: {type: String, required: true},
    lastname: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    fosterID: {type: Schema.Types.ObjectId}
});

var linkSchema = new Schema({
   childID: {type: Schema.Types.ObjectId, ref: 'fosterUser'},
    assigned: {type: Schema.Types.ObjectId, ref: 'caseUser'},
    serial: {type: Schema.Types.ObjectId}
});

var messageSchema = new Schema({
   childID: {type: Schema.Types.ObjectId, ref: 'fosterUser'},
    receiver: {type: Schema.Types.ObjectId, ref: 'caseUser'},
    message: {type: String, required: false},
    serial: {type: Schema.Types.ObjectId}
});

//define password behavior
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

fosterSchema.pre('save', function(next){
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

fosterSchema.methods.comparePassword = function (triedPassword, cb) {
    bcrypt.compare(triedPassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    });
};

//define models

var caseUser = mongoose.model('caseUser', caseWorkerSchema);

var fosterUser = mongoose.model('User', fosterSchema);

var link = mongoose.model('link', linkSchema);

var message = mongoose.model('message', messageSchema);

//define exports

module.exports = fosterUser;

module.exports = caseUser;

module.exports = link;

module.exports = message;