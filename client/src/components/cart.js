import axios from 'axios';
import React,{ useEffect, useState} from 'react'
import { Link } from "react-router-dom";

const Cart = () => {
    const [Items, setItems] = useState([])
    const [isLoading, setLoading] = useState(true)
    const token = localStorage.getItem("token");
    
function updateCartHandler(item,amount){
  
            axios({   method: 'post',
                    url:`/cart/save`,
                    headers: { "Authorization": `Bearer ${token}` },
                    data:{amount: (amount>0)?amount:1 , cartId:item._id},
                    
                }).then(res => {
                    // console.log(res.data)
                })
        
    }

    const handleDelete=(item)=>{
        axios({   method: 'post',
                    url:`/cart/delete`,
                    headers: { "Authorization": `Bearer ${token}` },
                    data: item
                    
                }).then(res => {
                    // console.log(res.data)
                })
    }

   
    useEffect(() => {
       
        axios({   
                method: 'get',
                url:'/cart',
                headers: { "Authorization": `Bearer ${token}` }
                }).then(res => {
                setItems(res.data)
                setLoading(false)
                }).catch((error)=>{
                    setLoading(false)
             })
      })

    
    
      
    
      
    
      if (isLoading) {
        return 
      }

    return (


        <div className="container">
            
            {Items.length === 0 ? (
                <p className="alert alert-danger">There is no items</p>
            ) : (
 

                <div className="table-responsive" id="no-more-tables">
                    <form  >
                    <table className="table bg-white">
                        <thead className="bg-dark text-light">
                            <tr>
                                <td>no</td>
                                <td>Product name</td>
                                <td>Price</td>
                                <td>Amount</td>
                                <td>Total</td>
                                <td>Action</td>
                                <td></td>
                            </tr>
                        </thead>
                        
                            {Items.map((item,i) => (
                                
                                   <tbody key={item._id}> 
                                <tr>
                                    <td> {i+1} </td>
                                    <td> <Link to={`/product/${item.productId}`}>{item.name}</Link> </td>
                                    <td> {item.price} EGP </td>
                                     
                            <td> <button className="rounded-circle" onClick={(e) =>{
                                e.preventDefault()
                          updateCartHandler(item, item.amount - 1)}}> - </button>
                      <span>{item.amount}</span>
                      <button className="rounded-circle" onClick={(e) =>{
                      e.preventDefault()
                          updateCartHandler(item, item.amount + 1)}}>+</button></td>
                            <td> {item.price * item.amount} EGP</td>
                            <td><Link className="btn btn-primary" to={`/verify-order/${item._id}`}> Order </Link>
                            &nbsp;<button onClick={(e)=>{
                                e.preventDefault()
                                handleDelete(item)
                            }} className="btn btn-danger">Delete</button></td>
                    
                        
                                </tr>
                                </tbody>
                               
                            ))}
                        
                    </table> 
                    </form> 
                </div>


            )} 

        </div>


    )
}

export default Cart