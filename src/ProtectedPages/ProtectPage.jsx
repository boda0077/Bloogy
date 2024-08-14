import { Navigate } from "react-router-dom"
export const ProtectPage = ({children , user }) => {
return user ? children : <Navigate to="/LogIn"/> ;
} ;