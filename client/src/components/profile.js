import { useEffect } from "react"
import { verifyToken } from "./auth"

const Profile=()=>{
    const name=verifyToken().username
    const email=verifyToken().email
    const admin=verifyToken().isAdmin

    
    return(
        <div className="container">
            
                
                <div className="table-responsive" id="no-more-tables">
                    <table className="table bg-white">
                        

                <tbody>

                    <tr>
                        <th>Name</th>
                        <th style={{color: "red"}}>
                           {name}
                        </th>
                    </tr>

                    <tr>
                        <th>Email</th>
                        <th style={{color: "red"}}>
                            {email}
                        </th>
                    </tr>
                    <tr>
                        <th>Account type</th>
                        {admin?(
                            <th style={{color: "red"}}> admin</th>):(
                            
                                <th style={{color: "red"}}> client</th>)
                            }
                                
                    </tr>
                </tbody>
            </table>
        </div>
        </div>
    )
}

export default Profile