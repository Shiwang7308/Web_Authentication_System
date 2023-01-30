import React from 'react'
import '../index.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Sample() {
    const navigate = useNavigate()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
    const [repassword, checkPassword] = useState('')
    const [country, selectCountry] = useState('India')
    const [checkbox, setCheckbox] = useState([]);
    
    const handleChange = (e) => {
        // Destructuring
        const { value, checked } = e.target;
        // const { languages } = userinfo;
          
        console.log(`${value} is ${checked}`);
         
        // Case 1 : The user checks the box
        if (checked) {
          const data = setCheckbox((prev)=>{
            let newArr = [...prev,value];
            return newArr;
          });
          console.log(data);
        }
      };

    let gender="";
    async function registerUser(event) {

		event.preventDefault()
            
            if(password!==repassword)
            {
                alert("Enter same password in Re-type Password field")
                checkPassword("");
                setPassword("");
                navigate('/');
            }

            var ele = document.getElementsByName('Gender');
              
            for(let i = 0; i < ele.length; i++) {
                if(ele[i].checked)
                gender=ele[i].value;
            }
            
            console.log(checkbox);

		const response = await fetch('http://localhost:3001/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			    firstName,
                lastName,
				email,
				password,
                 gender,
                country,
                checkbox
			}),
		})

		const res = await response.json()
         console.log(res);
		if (res.success === true) {
			navigate('/login')
		}
		else
		{
		      window.onload = ()=>{
				alert("Something went wrong! Plese Try again")
			  }
		}
	}

  return (
        <div className="bg-light body">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 bg-dark m-auto">
                        <h2 className='text-center text-light pt-3'>Registration Form</h2>
                        
                        <form id="myForm" onSubmit={registerUser}>
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className='fa fa-envelope'></i></span>
                                <input type="email" className='form-control' placeholder='Email'
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
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className='fa fa-lock'></i></span>
                                <input type="password" className='form-control' placeholder='Re-type Password'
                                   value={repassword}
                                   onChange={(e) => checkPassword(e.target.value)}
                                />
                            </div>
                            <div className='input-group-name d-flex' mb-3>
                              <div className="input-group mb-3 firstName">
                                <span className="input-group-text"><i className='fa fa-user'></i></span>
                                <input type="text" className='form-control' placeholder='First Name'
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                              </div>
                              <div className="input-group mb-3 lastName">
                                <span className="input-group-text"><i className='fa fa-user'></i></span>
                                <input type="text" className='form-control' placeholder='Last Name'
                                     value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className='input-group-radioButtton mb-3'>
                               <div class="form-check form-check-inline">
                               <input class="form-check-input" type="radio" name="Gender" value="male"/>
                               <label class="form-check-label text-light" for="inlineRadio1">Male</label>
                               </div>
                               <div class="form-check form-check-inline">
                                 <input class="form-check-input" type="radio" name="Gender" value="female"/>
                                 <label class="form-check-label text-light" for="inlineRadio2">Female</label>
                               </div>
                            </div>

                            <div className='input-group-select mb-3'>
                              <select class="form-select"
                              onChange={(e) => selectCountry(e.target.value)}>
                                <option selected>Select a country</option>
                                <option value="India">India</option>
                                <option value="USA">USA</option>
                                <option value="UK">UK</option>
                              </select>
                            </div>

                            <div className='input-group-checkbox mb-3 text-light'>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="I agree with terms and conditions" id="flexCheckDefault"
                                    onChange={handleChange}
                                />
                                <label class="form-check-label" for="flexCheckDefault">
                                    I agree with terms and conditions
                                </label>
                                </div>
                                <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="I want to receive the newsletter" id="flexCheckChecked"
                                    onChange={handleChange}
                                />
                                <label class="form-check-label" for="flexCheckChecked">
                                    I want to receive the newsletter
                                </label>
                               </div>
                            </div>
                           <div className="d-grid mb-3">
                            <button type="submit" className="btn btn-primary" value="Register">Register</button>
                           </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
  )
}
