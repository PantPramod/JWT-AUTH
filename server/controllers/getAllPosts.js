import expressAsyncHandler from "express-async-handler"
import Post from "../models/post.js";

const getAllPosts = expressAsyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skipIndex = (page - 1) * limit;


    const totalPosts = await Post.countDocuments();
    const totalPages = Math.ceil(totalPosts / limit);

    if (page > totalPages) {
        res.status(400)
        throw new Error('Page number exceeds total pages');
    }

    const posts = await Post.find()
        .skip(skipIndex)
        .limit(limit);

    const hasNextPage = page < totalPages;

    res.json({
        pageNumber: page,
        totalPages: totalPages,
        hasNextPage: hasNextPage,
        data: posts
    });


})

export default getAllPosts