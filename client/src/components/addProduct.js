import React,{useState} from "react";
import axios from "axios";

const token = localStorage.getItem("token");

const AddProduct=()=>{
    const [error,setError]=useState()
    const [Product, setProduct] = useState({});
	const [file, setFile] = useState();
    const [done, setDone] = useState({added: false});

	const handleChange = (e) => {
		setProduct({ ...Product,[e.target.name]: e.target.value });
       
	};
    const handleFile = (e) => {
      setFile(e.target.files[0])  
	};
	
	const handleSubmit = async (e) => {
		e.preventDefault();

        const formData = new FormData();
         formData.append("file", file);
         formData.append("name", Product.name);
         formData.append("category", Product.category);
         formData.append("price", Product.price);
         formData.append("description", Product.description);
         
         
		axios({
            method: 'post',
            url:`/admin/add`,
            headers: { "Authorization": `Bearer ${token}` },
            data:formData
        }).then(({data})=>setDone(data))
        .catch((err)=>setError(err.response.data))
			
		 
	};



    return(
        
<div className="container text-center">

{(error&&!done.added)&&(<p className="alert alert-danger">{error}</p>)}
{done.added&&(<p className="alert alert-success">
        Product added successfully
    </p>)}
    
   
<h3>Add Product</h3>
<form onSubmit={handleSubmit}>
    <br/>
    <input type="text" className="form-control" name="name" placeholder="Name"
    onChange={handleChange}/>
   <br/>
    <input type="number" className="form-control" name="price" placeholder="Price"
    onChange={handleChange}/>
   <br/>
    <textarea type="text" className="form-control" name="description" placeholder="Description"
    onChange={handleChange}></textarea>
   <br/>
    <select type="text" className="form-control" name="category"
    onChange={handleChange}>
        <option>Choose a category</option>
        <option value="clothes">Clothes</option>
        <option value="phones">Phones</option>
        <option value="computers">Computers</option>
    </select>
    <br/>
    <input type="file" className="form-control" name="file" placeholder="Image"
    onChange={handleFile}/>
    <br/>
    <input type="submit" value="Add Product" className="btn btn-primary"/>
</form>

</div>
    )
}

export default AddProduct