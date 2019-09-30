var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    id: {
        type: String,
        default: ''
    },
    provider: {
        type: String,
        default: ''
    },
    photo: {
        type: String,
        default: ''
    }
},
);

UserSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};
// export our module to use in server.js
module.exports = mongoose.model('User', UserSchema);