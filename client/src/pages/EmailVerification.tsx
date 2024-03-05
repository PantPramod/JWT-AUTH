import axios from "axios"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { useNavigate, useSearchParams } from "react-router-dom"

const EmailVerification = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")
    

    useEffect(() => {
        (async () => {
            if (token) {
                try {
                    const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/verify`, {
                        token: token,
                    });
                    localStorage.setItem("token", token)
                    toast.success(data.message)
                    navigate("/posts")
                } catch (err) {
                    toast.error("Wrong Token")
                    navigate('/')
                }
            }else{
                toast.error("No Token Found")
                navigate('/')
            }
        })()
    }, [])
    return (
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
    )
}

export default EmailVerification
