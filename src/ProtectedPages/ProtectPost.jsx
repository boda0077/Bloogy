import { Navigate } from "react-router-dom"
export const ProtectPost = ({children , user }) => {
return user ? children : <Navigate to="/LogIn"/> ;
} ;