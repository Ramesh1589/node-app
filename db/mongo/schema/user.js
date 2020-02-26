const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String
    },
    lastname: {
      type: String
    },
    email: {
      type: String,
      lowercase: true,
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

const User = module.exports = mongoose.model('User', UserSchema);

// Get Users
module.exports.getUsers = () => {
	return User.find();
}

// Get User
module.exports.getUserById = (id) => {
	return User.findById(id);
}

// Add User
module.exports.addUser = (user) => {
	return User.create(user);
}

// Update User
module.exports.updateUser = (id, user) => {
	var query = {_id: id};
	return User.findOneAndUpdate(query, user);
}

// Delete User
module.exports.removeUser = (id) => {
	var query = {_id: id};
	return User.remove(query);
}