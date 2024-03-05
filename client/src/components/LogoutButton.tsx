import useAuth from '../AuthContext/useAuth'

const LogoutButton = () => {
    const { removeToken } = useAuth()
    const logoutHandler = () => {
        removeToken()
    }
    return (
        <button
            onClick={logoutHandler}
            className='bg-teal-600 text-white rounded-md px-4 py-2 text-sm'>
            Logout
        </button>
    )
}

export default LogoutButton
