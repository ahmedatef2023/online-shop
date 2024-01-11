
import { Link } from "react-router-dom";
import { verifyToken } from "./auth"

const navbar = () => {
 
  
	
const token=localStorage.getItem("token");
const admin=verifyToken().isAdmin
const name=verifyToken().username

	return (
  
   
    
    <nav className="navbar navbar-expand-lg bg-primary">
    <div className="container">
        <div className="container-fluid">
            
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page"  to="/">Home</Link>
                </li>
                 {!token?(<>
                <li className="nav-item">
                <Link className="nav-link" to="/login">login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">sign up</Link>
                </li></>
                 ):''}
                 {token?(<><li className="nav-item">
                  <Link className="nav-link" to="/cart">cart</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/orders">orders</Link>
                </li></>):""}
                
              {admin?(<> <li className="nav-item">
                  <Link className="nav-link" to="/admin/add">add products</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/orders">manage orders</Link>
                </li></>):""}
               
                
              </ul>
              
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              
                
              {token?(<>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile" >{name}</Link>
                 </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/logout" >logout</Link>
            </li>
              </>):""}
            </ul>
            
            </div>
          </div>
    </div>
  </nav>
  
  
	);
};

export default navbar;