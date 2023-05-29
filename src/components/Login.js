import React,{useState,useEffect} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import img from "../images/User_cicrle_light.svg"
import img2 from "../images/CPU_light.svg"
import "./css/stylelogin.css"



const Login2 = () => {

    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const navigate = useNavigate();
    const[msg,setmsg]= useState('');
    const[data,setData]= useState([]);



    const getUsers= async()=> {
            try{
                const response = await axios.get('http://localhost:5000/users');
                setData(response.data);

                const user = response.data.find((item) => item.email === email);
                if (user) {
                    if (user.role === "Radiolog") {
                        navigate("/dashboard3");
                    } else if (user.role === "Dokter") {
                        navigate("/dashboard");
                    }
                }
            }catch(error){
                console.log(error)
            }
          }
    

    const Login = async(e)=>{
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/login',{
                email:email,
                password:password,
            })
            
            getUsers()
        
            

        } catch (error) {
            if(error.response){
                setmsg(error.response.data.msg);
            }
        }
    }

  return (
    <body>
        <div class="container">
            <div class="navbar">
                <div class="logo-navbar">
                    <img src={img2} alt=""/>
                    <h3>PeriksaParu</h3>
                </div>
                <div class="menu-navbar">
                    <a>Login</a>
                    <a href='Register'>Register</a>
                </div>
            </div>

            <div class="login-container">  
                <img src={img} alt=""/>

                <h1>Sign in to PeriksaParu</h1>

                <form onSubmit={Login}>
                    <div class="form-wrapper">
                        <p>Email or Username</p>
                        <input type="email" className='input' placeholder='Username or Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <p>Password</p>
                        <input type="password" className='input' placeholder='********' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        <button>Login</button>
                    </div>
                </form>
                <p>{msg}</p>
                

            </div>
        </div>    
    </body>
    

  )
}

export default Login2
