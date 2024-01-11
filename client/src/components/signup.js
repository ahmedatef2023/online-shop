import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";



const Signup = () => {
    const navigate = useNavigate()
	const [Data, setData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
const [error,setError]=useState()	
	

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...Data, [input.name]: input.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		
			axios({
                method: 'post',
                url:`/signup`,
                data: Data
                }).then(({data})=>{
                    navigate("/login") }
                ).catch((err)=>setError(err.response.data))
			
			
		
		
	};

	return (
		
<div className="container text-center">
    <h3>Create Account</h3>
    {error?(<p className="alert alert-danger">{error}</p>):''}
    
    <form onSubmit={handleSubmit}>
        
       
            <br/>
        <input type="text" className="form-control" name="username" placeholder="Username" required
        onChange={handleChange}
        value={Data.username}/>
      <br/>
        <input type="email" className="form-control" name="email" placeholder="E-mail" required
        onChange={handleChange}
        value={Data.email}/>
        <br/>
        <input type="password" className="form-control" name="password" placeholder="Password(not less than 6 char)" required
        onChange={handleChange}
        value={Data.password}/>
       <br/>
        <input type="password" className="form-control" name="confirmPassword" placeholder="Confirm Password" required
        onChange={handleChange}
        value={Data.confirmPassword}/>
       <br/>
        <input type="submit" value="Create Account" className="btn btn-primary"/>
    </form>


    <br/>
    <div>
        Already have account ? <Link to="/login">Login</Link>
    </div>
    </div>
	);
};

export default Signup;