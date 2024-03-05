
import { useForm, SubmitHandler } from "react-hook-form"
import axios from "axios"
import { useState } from "react"
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";

type Inputs = {
    email: string
    password: string
    confirmPassword: string,
    name: string,
    confirmation: boolean
}

const Signup = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm<Inputs>()

    const [serverErrorMessage, setServerErrorMessage] = useState('')


    const onSubmit: SubmitHandler<Inputs> = async (info) => {
        const { email, password, name } = info

        setServerErrorMessage('')
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/signup`, {
                email, password, name
            })
            localStorage.setItem("token", data?.token)
            toast.success(data?.message)

        } catch (err: any) {
            toast.error(err?.response?.data?.message)
            setServerErrorMessage(err?.response?.data?.message)
        } finally {
            reset()
        }
    }

    function isValidEmail(email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-[500px] mx-auto px-4">

                <h2 className="text-center text-2xl uppercase pt-10">Signup Form</h2>

                {
                    serverErrorMessage &&
                    <p className="text-sm text-red-500 bg-red-100  p-3 mt-2">{serverErrorMessage} </p>
                }

                <input {...register("email", {
                    required: { message: "Email is Required", value: true },
                    validate: (val) => isValidEmail(val) || 'Invalid Email'
                })}
                    type="text"
                    placeholder="Enter Your Email *"
                    className="border border-gray-400 rounded-md outline-none p-3 mt-5 w-full"
                />
                <p className="text-sm text-red-500 h-[25px]">{errors?.email?.message} </p>

                <input {...register("password", {
                    required: { message: "Password is Required", value: true },
                    minLength: { message: "Password should be mininimum 2 Characters long", value: 2 },
                    maxLength: { message: "Password should be maximun 15 Characters long", value: 15 }
                })}
                    type="password"
                    placeholder="Select Your Password *"
                    className="border border-gray-400 rounded-md outline-none p-3 mt-2 w-full"
                />
                <p className="text-sm text-red-500 h-[25px]">{errors?.password?.message} </p>

                <input {...register("confirmPassword", {
                    required: { message: "Confirm Password is Required", value: true },
                    validate: (val) => watch("password") === val || "Confirm Password should be as Password"

                })}
                    type="password"
                    placeholder="Confirm Password *"
                    className="border border-gray-400 rounded-md outline-none p-3 mt-2 w-full"

                />
                <p className="text-sm text-red-500 h-[25px]">{errors?.confirmPassword?.message} </p>

                <input {...register("name", {
                    minLength: { value: 2, message: "Name should be minimum 2 Characters long" },
                    maxLength: { message: "Name should be maximum 30 characters long", value: 30 },

                })}
                    placeholder="Enter Your Name"
                    className="border border-gray-400 rounded-md outline-none p-3 mt-2 w-full"
                />
                <p className="text-sm text-red-500 h-[25px]">{errors?.name?.message} </p>

                <div className={`border p-2 rounded-md ${errors.confirmation?.message && "border-red-600"}`}>
                    <input {...register("confirmation", {
                        required: { value: true, message: "For signingup check this box" }
                    })}
                        type="checkbox"
                        className="mr-2 cursor-pointer "
                    />
                    <a href="#" className="text-sm">By Checking on this you will be Agree for Terms & Conditions.</a>
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-blue-600 w-full rounded-md text-white p-3"
                >
                    Sign Up
                </button>
                <p className="text-center"> <Link to="/login"
                    className="mt-2 text-sm text-blue-900"
                >Already have an account . Click here to login</Link></p>

            </form>
        </>
    )
}

export default Signup
