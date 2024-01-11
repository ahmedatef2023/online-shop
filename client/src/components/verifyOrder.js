import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const VerifyOrder=()=>{
    const [Address,setAddress]=useState("")
    const [Order,setOrder]=useState()
    const {idItem}=useParams()
    const navigate=useNavigate()
    
    const token = localStorage.getItem("token");
    const hanldeSubmit=(e)=>{
        e.preventDefault()
        axios({
            method: 'post',
            url: `/orders`,
            headers: { "Authorization": `Bearer ${token}` },
            data: Order
        }).then(({data} )=> {
            
            
            // console.log(data)
            navigate("/orders")
        }).catch((error) => {
            // console.log(error)
        })
    }
   const  handleChange=(e)=>{
        setAddress(e.target.value)
        
   }

   useEffect(() => {
    
    axios({
        method: 'post',
        url: `/verify-order`,
        headers: { "Authorization": `Bearer ${token}` },
        data: {
            "idItem" : idItem
        }
    }).then(({data} )=> {
        data.address=Address
        setOrder(data)
        
        // console.log(Order)
        
    }).catch((error) => {
        // console.log(error)
    })

},[Address]);

return(
    <div className="container text-center">
    <h3>Verify Order</h3>
   
    <form onSubmit={hanldeSubmit} >
        
        <input onChange={handleChange} type="text" value={Address} name="address" placeholder="Enter the Address" className="form-control"/>
        <input type="submit" value="Verify" className="btn btn-primary"/>
    </form>
</div>
)
}

export default VerifyOrder