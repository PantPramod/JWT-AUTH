import axios from "axios"
import { FormEvent, useState } from "react"
import toast from "react-hot-toast"

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const submitHandler = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/forgotpassword`, { email })

            console.log(data)

            toast.success(data?.message)

        } catch (err: any) {
            toast.error(err?.response?.data?.message)
        }

    }
    return (
        <form onSubmit={submitHandler} className="max-w-[500px] mx-auto px-4">

            <h2 className="text-center text-2xl uppercase pt-10">Login Form</h2>

            <input
                type="email"
                placeholder="Email Address"
                className="border border-gray-400 rounded-md outline-none p-3 mt-10 w-full"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button
                type="submit"
                className="mt-10 border-blue-600 border-2 font-bold w-full rounded-md text-blue-600 p-3 hover:bg-blue-800 hover:text-white transition-all ease-in-out duration-300"
            >
                Send Password Reset Link
            </button>
        </form>
    )
}

export default ForgotPassword
