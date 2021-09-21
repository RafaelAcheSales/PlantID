const User = require('../models/user');
const Logger = require('../utils/logger');

module.exports = new class UserRepository {
    getAll(){
        return User.find();
    }

    getByUUID(reqUUID){
        return User.find({uuid: reqUUID});
    }

    getByEmail(email){
        return User.find({email: email});
    }

    create(user){
        return User.create(user);
    }

    update(email, body){
        return User.findOneAndUpdate({email: email}, body, {new: true});
    }

    delete(email){
        User.findOneAndRemove({email: email});
    }
    
}