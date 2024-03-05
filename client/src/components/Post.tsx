import { postInterface } from '../pages/Posts'
import getRandomDarkColor from '../helper/getRandomDarkColor'

type propTypes = {
    post: postInterface
}
const Post = ({ post }: propTypes) => {
    return (
        <div className="pb-10 w-11/12 sm:w-8/12 max-w-[500px] mx-auto">
            <div className="flex items-center gap-x-3 p-2">
                <div 
                style={{background:getRandomDarkColor()}}
                className={`w-7 h-7 rounded-full  bg-blue-600 text-white grid place-items-center`}>{post?.author[0]}</div>
                <p className="font-semibold">{post?.author}</p>
            </div>
            <img
                src={post?.imageUrl}
                alt={`image_${post.imageUrl}`}
                width={200}
                height={200}
                className="w-full rounded-xl"
            />
            <p className="text-gray-600 px-10">{post?.title}</p>

        </div>
    )
}

export default Post
