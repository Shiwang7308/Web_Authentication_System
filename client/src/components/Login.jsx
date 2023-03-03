import React from 'react'
import '../index.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Sample2() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function loginUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:3001/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})

		const data = await response.json()
        console.log("data: ",data);
		if (data.user==null) {
			
			alert('Please check your email and password')
             setEmail("");
             setPassword("");
		} else {
			alert('Login Successful');
            // navigate('/dashboard')
            window.location.replace('https://www.google.com/')
		}
	}

  return (
        <div className="bg-light body">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 bg-dark m-auto">
                        <h2 className='text-center text-light pt-3 mb-4'>Login</h2>
                        
                        <form id="myForm" onSubmit={loginUser}>
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className='fa fa-envelope'></i></span>
                                <input role="button" type="email" className='form-control' placeholder='Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className='fa fa-lock'></i></span>
                                <input type="password" className='form-control' placeholder='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            
                           <div className="d-grid mb-3">
                            <button type="submit" className="btn btn-primary" value="signin">SIGN IN</button>
                           </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
  )
}
