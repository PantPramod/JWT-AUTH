import axios from "axios"
import { FormEvent, useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../AuthContext/useAuth"


const Login = () => {
    const { saveToken , saveRefreshToken} = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/login`, { email, password })
            saveToken(data?.token)
            saveRefreshToken(data?.refreshToken)
            toast.success(data?.message)
            navigate("/posts")
        } catch (err: any) {
            toast.error(err?.response?.data?.message)
        }

    }
    return (
        <form className="max-w-[500px] mx-auto px-4" onSubmit={handleSubmit}>

            <h2 className="text-center text-2xl uppercase pt-10">Login Form</h2>

            <input
                type="email"
                placeholder="Email Address"
                className="border border-gray-400 rounded-md outline-none p-3 mt-5 w-full"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                className="border border-gray-400 rounded-md outline-none p-3 mt-5 w-full"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                type="submit"
                className="mt-10 bg-blue-600 w-full rounded-md text-white p-3"
            >
                Log In
            </button>
            <p className="text-center"> <Link to="/"
                className="mt-2 text-sm text-blue-900"
            >Don't have an account . Click here to Register</Link></p>
        </form>
    )
}

export default Login
