import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../AuthContext/useAuth';


const ProtectedRoutes = () => {
    const { token } = useAuth()
    return (
        token ? <Outlet /> : <Navigate to="/login" />
    )
}

export default ProtectedRoutes
