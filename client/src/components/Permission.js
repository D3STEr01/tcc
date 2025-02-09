import { useContext, useEffect } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { AuthContext } from "../contexts/authContext"

export const CheckPermission = async (values) => {
    const { checkUserPermission } = useContext(AuthContext)

    const p = await checkUserPermission(300)

    return (
        p ? "" : <Navigate to='/desktop'/>
    )
}