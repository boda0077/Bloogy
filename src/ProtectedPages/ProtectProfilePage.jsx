import { Navigate } from "react-router-dom"
export const ProtectProfilePage = ({children , user }) => {
return user ? children : <Navigate to="/LogIn"/> ;
} ;