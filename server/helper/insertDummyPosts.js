import expressAsyncHandler from "express-async-handler"
import Post from "../models/post.js"
import sampleData from "../data/sampleData.js"

const insertDummyPosts = expressAsyncHandler(async () => {
   const totalPosts = await Post.countDocuments();
   if (totalPosts <= 0) {
      await Post.insertMany(sampleData)
      console.log("Inserted Dummy Posts ")
   }

})

export default insertDummyPosts