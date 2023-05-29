import React,{useState,useEffect} from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import "./css/style.css"


import img from '../images/CPU_light.svg'
import img2 from '../images/Home_light.svg'
import img4 from "../images/Folder_alt_light.svg"
import img3 from "../images/test.jpeg"
import img5 from "../images/User_cicrle_light.svg" 
import img6 from "../images/Img_box_light.svg"
import img7 from "../images/File_dock_light.svg"
import img8 from "../images/stethoscope_light.svg"
import img9 from "../images/Export_light.svg"


const Report = () => {

    const [msg,setMsg]= useState('')
    const [doctorName,setDoctorName]= useState('')
    const [doctor,setDoctor]= useState([])
    const[name,setName] = useState('');
    const[patientName,setpatientName] = useState('');
    const[token,setToken] = useState('');
    const[expire,setExpire] = useState('');
    const[users,setUsers] = useState([]);
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const[report,setReport]=useState([])
    const[arrayPatient,setArrayPatient] = useState([])
    const [searchInput, setSearchInput] = useState('');
  

    
    const getDoctor= async()=> {
        try{
            const response = await axios.get('http://localhost:5000/dokter');
            setDoctor(response.data);
        }catch(error){
            console.log(error)
        }

      }
  useEffect(()=>{
    refreshToken();
    getDoctor();
    getPatientName();
    getReport();
  },[]);

  const handleFileInputChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.set('idDoctor', doctorName);
      console.log(doctorName);
      formData.set('patientname', patientName);
      const response = await axios.post('http://localhost:5000/upload', formData);
      const message = response.data.msg
      setMsg(message)
      if (message === 'Report berhasil dikirim') {
        // Periksa apakah nama pasien sudah ada dalam daftar
        const isDuplicate = arrayPatient.some((item) => item.patientname === patientName);
        
        if (!isDuplicate) {
          // Jika nama pasien belum ada dalam daftar, tambahkan ke arrayPatient
          setArrayPatient(prevArray => [...prevArray, { patientname: patientName }]);
        }
      }
      getReport();

      setTimeout(() => {
        setMsg('');
      }, 2000);
        
    } catch (error) {
      console.log(error)
    }
    
  };

  const refreshToken = async()=>{
    try {
        const response = await axios.get('http://localhost:5000/token');
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.name);
        setExpire(decoded.exp);
    } catch (error){
      if(error.response){
        navigate("/");
      }
    }
  }

  const searchPatient = (event) => {
    setSearchInput(event.target.value.toLowerCase());
  };

    const searchReport = (event)=> {
        let input = event.target.value.toLowerCase();
        let reportlist = document.getElementById('reports');
        let reports =  reportlist.getElementsByClassName('report');
    
        for (let i = 0; i < reports.length; i++) {
            let reportName = reports[i].querySelector('.user-wrapper p').innerText.toLowerCase();
    
            if (reportName.indexOf(input) > -1) {
                reports[i].style.display = '';
            } else {
                reports[i].style.display = 'none';
            }
        }
        }

    const addPatient = () => {
        setpatientName(document.getElementById('searchInput').value);
        console.log(patientName)
    };

    const addPatient2 = (name) => {
        setpatientName(name);
        console.log(patientName)
    };

    const getPatientName= async()=> {
        try{
            const response = await axios.get('http://localhost:5000/patientname');
            setArrayPatient(response.data);
            console.log(response.data)
        }catch(error){
            console.log(error)
        }
      }

      const getReport= async()=> {
        try{
            const response = await axios.get('http://localhost:5000/report');
            setReport(response.data);
        }catch(error){
            console.log(error)
        }
      }

    const Logout = async()=>{
        try {
            await axios.delete('http://localhost:5000/logout');
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <body>
      <div class="containers">
          <div class="sidebar">
              <div class="logo-wrapper">
                  <img src={img} alt=""/>
                  <h3>PeriksaParu</h3>
              </div>
              <div class="sidebar-wrapper">
                  <img src={img2} alt=""/>
                  <a href="/dashboard3">Home</a>
              </div>
              <div class="sidebar-wrapper">
                  <img src={img4} alt=""/>
                  <a href="/report">Report</a>
              </div>
               
          </div>
          <div class="home-wrapper">
              <div class="top-wrapper">
                  <input type="text" placeholder="Search..." onInput={searchReport}/>
                  <button onClick={Logout}>Log Out</button>
              </div>

              <div class="content-wrapper">
                  <div class="report-wrapper">
                      <h2>Report Pasien</h2>
                      <div class="reports" id="reports">
                        
                      {arrayPatient.map((item) => (
                        <div class="report" id="report" key={item.patientname}>
                            <div class="user-wrapper">
                                <img src={img5} alt="" />
                                <p>{item.patientname}</p>
                            </div>
                            {report.map((items) => {
                            if (item.patientname === items.patientname) {
                                const createdAt = new Date(items.createdAt);
                                const formattedDate = createdAt.toLocaleDateString(); // Format the date
                                const formattedTime = createdAt.toLocaleTimeString(); // Format the time
                                return (
                                <div class="results">
                                    <div class="result">
                                        <h4>Doctor Notes</h4>
                                        <h3>{items.analisisdokter}</h3>
                                    <div class="note-wrapper">
                                        <p>{formattedDate} {formattedTime}</p>
                                        <p class="predict">{items.result}</p>
                                    </div>
                                    </div>
                                </div>
                                );
                            }
                            return null; // Add this line if there's no else statement in your logic
                            })}
                        </div>
                        ))}

                      </div>
                  </div>
              </div>
          </div>

      </div>

    
    </body>
    
  )
}

export default Report
