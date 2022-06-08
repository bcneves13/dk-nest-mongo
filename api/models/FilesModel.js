import mongoose from 'mongoose';
const { Schema } = mongoose;

const filesSchema = new Schema({
    id: String,
    fileId: String,
    type: String,
    name: String,
    parentFolder: String,
    createTime: Number,
    childs: Array,
    code: String
})

const Files = mongoose.model('Files', filesSchema);

export default Files;
