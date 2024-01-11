import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link,useNavigate } from "react-router-dom";

const Home = () => {
    const [Products, setProducts] = useState([])
    const token = localStorage.getItem("token");
    const navigate=useNavigate()
    const category=useRef()

    const handleSubmit=(e)=>{
        e.preventDefault();
		
			
			axios({
				method: 'post',
				url:`/`,
				data: {category:category.current.value}
			}).then(res=>{
				setProducts(res.data)
			}).catch((err)=>{

            })
           
			
    }

    const handleChange=(product)=>{
        axios({
            method: 'post',
            url: `/cart`,
            headers: { "Authorization": `Bearer ${token}` },
            data: product
        }).then(res => {
            // console.log(res.data)
         token? navigate("/cart"):navigate("/login")
        }).catch((error) => {
            // console.log(error)
        })
        
        
        
    }

    useEffect(() => {
      axios({
            method: 'post',
            url: `/` 
           
        }).then(res => {
            setProducts(res.data)
            
        }).catch((error) => {
            // console.log(error)
        })

    },[]);



    return (

        <div className="container">

            <br />
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col col-md-10">
                        <select ref={category} name="category" className="form-control">
                            <option value="All">All</option>
                            <option value="phones">Phones</option>
                            <option value="clothes">Clothes</option>
                            <option value="computers">Computers</option>
                        </select>
                    </div>
                    <div className="col col-md-2">
                        <input type="submit" className="btn btn-primary" value="Filter" />
                    </div>
                </div>
            </form>
            <br />
            <div className="row">
                {Products.map(product => (

                    <div key={product._id} className="col col-12 col-md-6 col-lg-4 col-xl-3">
                        <div className="card" style={{ width: '100%' }}>

                            <img src={`http://localhost:8000/${product.imgUrl}`} alt="not found " className="card-img-top" style={{ height: "200px" }} />
                            <div className="card-body">
                                <h5 className="card-title">
                                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                                    <p>Price: {product.price} EGP</p>
                                </h5>
                                <button onClick={(e)=>{
                            e.preventDefault()
                            handleChange(product)
                         }}  className="btn btn-primary">Add to cart</button>

                            </div>
                        </div>
                        <br />
                    </div>



                ))}
            </div>
        </div>

    )

}

export default Home