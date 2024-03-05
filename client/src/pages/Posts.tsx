
import { useEffect, useState } from "react"
import Post from "../components/Post"
import LogoutButton from "../components/LogoutButton"
import axios from '../helper/axios'
import toast from "react-hot-toast"

export interface postInterface {
  _id: string,
  imageUrl: string,
  title: string,
  author: string
}

const Posts = () => {
  const [page, setPage] = useState(1)
  const [posts, setPosts] = useState<postInterface[]>([])
  const [hasNextPage, setHasNextPage] = useState(true)
  const limit = 5;

  useEffect(() => {

    (async () => {
      if (hasNextPage) {
        try {
          const { data } = await axios.get(`/posts`,
            {
              params: { page, limit }
            }
          )
          setHasNextPage(data?.hasNextPage)
          setPosts((prevData) => [...prevData, ...data.data])
        } catch (err: any) {
          if (err?.response?.status === 429) {
            toast.error(err?.response?.data)
          }

          console.log(err)
        }
      }
    })()
  }, [page])

  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll)
    return () => {
      window.removeEventListener('scroll', handleInfiniteScroll)
    }
  }, [])

  const handleInfiniteScroll = () => {

    const scrollHeight = document.documentElement.scrollHeight
    const innerHeight = window.innerHeight
    const scrollTop = document.documentElement.scrollTop

    if (innerHeight + scrollTop + 1 > scrollHeight) {
      setPage(prev => prev + 1)
    }

  }
  return (
    <>
      <div className="flex justify-end  p-3">
        <LogoutButton />
      </div>
      <div className="py-20">
        {posts.map((post) => <Post post={post} key={post?._id} />)}
      </div>
    </>
  )
}

export default Posts
