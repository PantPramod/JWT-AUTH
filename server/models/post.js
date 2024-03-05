import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    imageUrl: String,
    title: String,
    author: String,
});

const Post = mongoose.model('Post', postSchema);

export default Post