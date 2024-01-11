import { Link } from "react-router-dom"

const NotFound=()=>{

    return(
        <div className="container text-center">
        <p className="alert alert-danger">not Found this page 404!</p>
      
            {/* <Link to='/' className="btn btn-danger">Home</Link> */}
       
        </div>
    )
}

export default NotFound