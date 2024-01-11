import { useNavigate, useParams } from "react-router-dom"

import axios from "axios"
const { useState, useEffect } = require("react")


const GetProduct=()=>{
const [Product,setProduct]=useState({})
const {idProduct}=useParams()
const token = localStorage.getItem("token");
const navigate=useNavigate()
const handleChange=()=>{
    axios({
        method: 'post',
        url: `/cart`,
        headers: { "Authorization": `Bearer ${token}` },
        data: Product
    }).then(res => {
        console.log(res.data)

    }).catch((error) => {
        console.log(error)
    })
    navigate("/cart")
}

useEffect(() => {
  
    
     axios({
        method: 'get',
        url: `/api/product/${idProduct}`,
        headers: { "Authorization": `Bearer ${token}` }
    }).then(res=> setProduct(res.data))
   
   },[])
    
    

    return(
        
 <div className="container">
    <br/>
    { !Product?(
     <div className="alert alert-danger">
         there is no Product matches this id
     </div>):

     (
     <div className="row">
         <div className="col col-12 col-md-6">
             <div className="card" style={{width: "100%"}}>
                 <img src={`http://localhost:8000/${Product.imgUrl}`}  alt="" className="card-img-top" style={{maxHeight: "400px"} }/>
                 <div className="card-body">
                   
                        
                        
                         <button onClick={(e)=>{
                            e.preventDefault()
                            handleChange()
                         }}  className="btn btn-primary">Add to cart</button>
                  
                    
                 </div>
             </div>
         </div>
         <div className="col col-12 col-md-6 Product-detail">
             <h3>{Product.name}</h3>
             <h5>Price: {Product.price} EGP</h5>
             <p>{Product.description}</p>
         </div>
     </div>
    

    )}
    </div>
)
}

export default GetProduct