import {decodeToken} from 'react-jwt'
import { Outlet, Navigate } from 'react-router-dom'

const accessToken = localStorage.getItem("token")
export const verifyToken=()=>{
   
    if (accessToken)
       {
        const {user} =  decodeToken(accessToken)
          return user
       }
    else
      {
        return {
          _id:'',
          username:'',

        }
      }
    
  }


  

export const PrivateRoutes = () => {
    let auth = {'token':accessToken}
    return(
        auth.token ? <Outlet/> : <Navigate to="/login"/>
    )
}



export const AdminRoutes = () => {
  let auth = {'admin':verifyToken().isAdmin}
  return(
      auth.admin ? <Outlet/> : <Navigate to="/"/>
  )
}

export const ClientRoutes = () => {
  let auth = {'token':accessToken}
  return(
      !auth.token ? <Outlet/> : <Navigate to="/"/>
  )
}

