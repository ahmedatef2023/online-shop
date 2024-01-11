import { useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Login = () => {
	const email=useRef()
	const password=useRef()
	const [error,setError]=useState()

	
	const handleSubmit = async (e) => {
		e.preventDefault();
		
			
			axios({
				method: 'post',
				url:`/login`,
				data: {email:email.current.value,password:password.current.value}
			}).then(({ data })=>{
				localStorage.setItem("token", data)
			    window.location = "/"
			}).catch((err)=>setError(err.response.data))
           
			
		
	};
		
	return (
		<div className="container text-center">
			{error&&(<p className="alert alert-danger">{error}</p>)}
				
					<form onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							ref={email}
							required
							className="form-control"
						/>
                        <br/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							ref={password}
							required
							className="form-control"
						/>
                        <br/>
						
						<button type="submit" className="btn btn-primary">
							Sing In
						</button>
					</form>
				
				<div>
					<h1>New Here ?</h1>
					<Link to="/signup">
						
							Sing Up
						
					</Link>
				</div>
			
		</div>
	);
};

export default Login;