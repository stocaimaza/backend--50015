const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true
    }, 
    accountId: {
        type: String,
        required: true
    }
}); 

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;