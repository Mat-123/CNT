import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
    const user = useSelector((state) => state.user);

    if (!user) {
        return <Navigate to="/login" />;
    }

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;