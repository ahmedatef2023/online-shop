import axios from "axios";
import { useEffect, useLayoutEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom";

const Orders=()=>{
const [isLoading, setLoading] = useState(true)
const [items,setItems]=useState([])
   
const token = localStorage.getItem("token");
    
const handleCancel=(item)=>{
    axios({
        method: 'post',
        url: `/orders/cancel`,
        headers: { "Authorization": `Bearer ${token}` },
        data: item
    }).then(res => {
       

    }).catch((error) => {
        console.log(error)
    })
}



useEffect(() => {
   
        axios({
            method: 'get',
            url: `/orders`,
            headers: { "Authorization": `Bearer ${token}` }
        }).then(res => {
            setItems(res.data)
            setLoading(false)
        }).catch((error) => {
            setLoading(false)
        })
       
    })

    if (isLoading) {
        return 
      }

    return(
     
        
        <div className="container">

            {(items.length===0)? (
                <p className="alert alert-danger">There is no items</p>
            ):
                    (
                        <div className="table-responsive" id="no-more-tables">
                            <table className="table bg-white">
                                <thead className="bg-dark text-light">
                            <tr>


                                    <th>no</th>
                                    <th>Product name</th>
                                    <th>Price</th>
                                    <th>Amount</th>
                                    <th>Total</th>
                                    <th>Address</th>
                                    <th>Status</th>
                                    <th>Action</th>

                                </tr>
                                </thead>
                                <tbody>

                                {items.map((item,i) => (
                                        <tr key={item._id}>
                                            <td>
                                               {i+1 }
                                            </td>
                                            <td> <Link to={`/product/${item.productId} `}>
                                                    {item.name}
                                                </Link> </td>
                                            <td>
                                                {item.price} EGP
                                            </td>
                                            
                                                <td>
                                                    {item.amount }
                                                </td>
                                                <td>
                                                    {item.price * item.amount} EGP
                                                </td>
                                                <td>
                                                {item.address}
                                                </td>
                                                <td>
                                                    {item.status}
                                                </td>
                                                <td>
                                                    
                                                    {(item.status==='pending' )? (
                                                        <button className="btn btn-danger" 
                                                        onClick={(e)=>{
                                                            e.preventDefault()
                                                            handleCancel(item)
                                                        }} >Cancel</button>

                                                        ):''}
                                                </td>
                                            
                                        </tr>

                                                    ))}
                                </tbody>
                            </table>
                        </div>
                    
                    )}
        </div>


        
    )
}

export default Orders