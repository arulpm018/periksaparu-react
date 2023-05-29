import React,{useState} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import img from "../images/User_cicrle_light.svg"
import img2 from "../images/CPU_light.svg"
import "./css/stylelogin.css"


const Register2 = () => {

    const[name,setName] = useState('');
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[confPassword,setConfPassword] = useState('');
    const[role,setRole]= useState('');
    const navigate = useNavigate();
    const[msg,setmsg]= useState('');

    const Register = async(e)=>{
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users',{
                name:name,
                email:email,
                password:password,
                confPassword:confPassword,
                role:role
            });
            navigate("/");
        } catch (error) {
            if(error.response){
                setmsg(error.response.data.msg);
            }
        }
    }

    console.log(role);

  return (
    <body>
        <div class="container">
            <div class="navbar">
                <div class="logo-navbar">
                    <img src={img2} alt=""/>
                    <h3>PeriksaParu</h3>
                </div>
                <div class="menu-navbar">
                    <a href='/'>Login</a>
                    <a href='Register'>Register</a>
                </div>
            </div>

            <div class="login-container">  
                <img src={img} alt=""/>
                <h1>Sign up to PeriksaParu</h1>

            <form onSubmit={Register}>
                <div class="form-wrapper">
                        <p>Name</p>
                        <input type="text" className='input' placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>
                        <p>Email</p>
                        <input type="email" className='input' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <p>Password</p>
                        <input type="password" className='input' placeholder='********' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        <p>Confirm Password</p>
                        <input type="password" className='input' placeholder='********' value={confPassword} onChange={(e)=>setConfPassword(e.target.value)}/>
                        <p>Role</p>
                        <div class="selects">
                            <select value={role} onChange={(e)=>setRole(e.target.value)}>
                                <option value='' disabled selected>Select the Role</option>
                                <option value="Dokter"  >Dokter</option>
                                <option value="Radiolog" >Radiolog</option>
                            </select>
                        </div>

                        <button>Register</button>
                        <p className='msg-reg'>{msg}</p>
                </div>
            </form>

            </div>
        </div>
    </body>

  )
}

export default Register2
