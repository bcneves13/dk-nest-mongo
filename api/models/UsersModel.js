import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    fullName:  String, // String is shorthand for {type: String}
    email: String,
    address:   String,
    phoneNumber: String,
    addressNumber: Number
})

const Users = mongoose.model('Users', userSchema);

export default Users;
