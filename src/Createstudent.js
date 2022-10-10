import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate,Link } from 'react-router-dom';
import Liststudents from './Liststudents';
import Dashboard from './Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function Createstudent() {
    const navigate = useNavigate();
let formValues={
  name:"",
  age:"",
  email:"",
  gender:"",
  mobile_number:"",
  courses:"",
  address:"",
  education:"",
  joined_date:"",
  address:"",
  error:{
  name:"",
  age:"",
  mobile_number:"",
  email:"",
  gender:"",
  courses:"",
  address:"",
  education:"",
  joined_date:"",
  address:""
  }
}
const [formData,setFormdata]=useState(formValues); 
const [userdata,setUserdata]=useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {

async function getData(){
  setLoading(true);
    try {  
    const response=await axios.get("https://6341636a20f1f9d7997200a7.mockapi.io/student");
    setUserdata(response.data);  
    }catch(error){
    }
    setLoading(false);
}

getData();//call user data when loading the file

},[]);

const handleChange =(e)=>{
  let error= { ...formValues.error };
  if(e.target.value === ""){
    error[e.target.name]=`${e.target.name} is required`;
  }else{
    error[e.target.name]=""; 
  }
  setFormdata({...formData, [e.target.name]:e.target.value, error});
}

const handleSubmit= async (e)=>{
  e.preventDefault();

  const errorkeys=Object.keys(formData).filter((key)=>{
    if(formData[key] === "" && key!='error'){
      return key;
    }
  });
  
  if(errorkeys.length>0){
    alert('pls fill all the fields');
  }else{
    setLoading(true);
    try {
     const response=await axios.post("https://6341636a20f1f9d7997200a7.mockapi.io/student",{
       name:formData.name,
       age:formData.age,
       email:formData.email,
       gender:formData.gender,
       education:formData.education,
       courses:formData.courses,
       address:formData.address,
       mobile_number:formData.mobile_number,
       joined_date:formData.joined_date,
  
    });
   
    setUserdata([...userdata, response.data]); 
    setFormdata(formValues);
    alert('created successfully');
    navigate('/Liststudents');
  }catch(error){

  }
  setLoading(false);
  } 
}

    return (
    <>    
     <h1>CRUD WITH STUDENT & TEACHER MANAGEMENT</h1>
     <h2><Link to="/" element={<Dashboard />}>Dashboard</Link> | <Link to="/Liststudents" element={<Liststudents />}>View Student</Link></h2>
   
    <div className="col-md-6"></div>    
    <div className="container col-md-12">
    <h2>Create Student</h2>
    {loading && <div className='loading'>Loading</div>}
    {!loading && (
    
      <Form  onSubmit={(e)=>handleSubmit(e)}>
        <Form.Group className="col-md-6"  controlId="exampleForm.ControlInput1">
            <Form.Label>Student name</Form.Label>
            <Form.Control  type="text" placeholder="name"  name="name" value={formData.name}  onChange={(e) => handleChange(e)}  required /> <span style={{color:"red"}}> {formData.error.name}</span><br/>
        </Form.Group>

      <Form.Group className="col-md-6"   controlId="exampleForm.ControlInput2">
        <Form.Label>Student email</Form.Label>
        <Form.Control  type="text"  placeholder="email" name="email" value={formData.email}  onChange={(e) => handleChange(e)}  required /> <span style={{color:"red"}}> {formData.error.email}</span><br/>
      </Form.Group>

      <Form.Group className="col-md-6"  controlId="exampleForm.ControlInput3">
        <Form.Label>Student age</Form.Label>
        <Form.Control type="text" placeholder="age" name="age" value={formData.age} onChange={(e) => handleChange(e)}  required /> <span style={{color:"red"}}> {formData.error.age}</span><br/>
      </Form.Group>

      <Form.Group className="col-md-6"  controlId="exampleForm.ControlInput4" name="gender">
      <Form.Label>Gender</Form.Label>
    
        <Form.Check
          value="male"
          type="radio"
          aria-label="radio 1"
          label="male"
          onChange={(e)=>handleChange(e)}
          name="gender"
          checked={formData.gender === "male"}
        />
        <Form.Check
          value="female"
          type="radio"
          aria-label="radio 2"
          label="Female"
          onChange={(e)=>handleChange(e)}    
          name="gender"
          checked={formData.gender === "female"} 
        />
        <Form.Check
          value="other"
          type="radio"
          aria-label="radio 3"
          label="Other"
          name="gender"
          onChange={(e)=>handleChange(e)}     
        />
      </Form.Group> <br/>
      <Form.Group className="col-md-6"  controlId="exampleForm.ControlInput5">
        <Form.Label>Mobile number</Form.Label>
        <Form.Control type="text" placeholder="mobile_number" name="mobile_number" value={formData.mobile_number} onChange={(e) => handleChange(e)}  required /> <span style={{color:"red"}}> {formData.error.mobile_number}</span><br/>
      </Form.Group><br/>
 
      <Form.Group className="col-md-6"  controlId="exampleForm.ControlInput6">
        <Form.Label>Education</Form.Label>
        <Form.Control type="text" placeholder="education" name="education" value={formData.education} onChange={(e) => handleChange(e)}  required /> <span style={{color:"red"}}> {formData.error.education}</span><br/>
      </Form.Group><br/>
     
      <Form.Group className="col-md-6"  controlId="exampleForm.ControlInput5">
        <Form.Label>Courses</Form.Label>
        <Form.Control type="text" placeholder="courses" name="courses" value={formData.courses} onChange={(e) => handleChange(e)}  required /> <span style={{color:"red"}}> {formData.error.courses}</span><br/>
      </Form.Group><br/>

      <Form.Group className="col-md-6"  controlId="exampleForm.ControlInput5">
        <Form.Label>Joining date</Form.Label>
        <Form.Control type="date" placeholder="joined_date" name="joined_date" value={formData.joined_date} onChange={(e) => handleChange(e)}  required /> <span style={{color:"red"}}> {formData.error.joined_date}</span><br/>
      </Form.Group><br/>

      <Form.Label>Address</Form.Label>
      <FloatingLabel controlId="floatingTextarea2" label="Address">
        <Form.Control
          as="textarea"
          name="address"
          placeholder="Leave a address here"
          style={{ height: '100px' }}
          onChange={(e)=>handleChange(e)}  
          value={formData.address}
        />
      </FloatingLabel>
      <span style={{color:"red"}}> {formData.error.address}</span><br/><br/>

      <Button type="submit" variant="primary">Save</Button>
  
     </Form> 
    )}
    </div>
    </>
  );
}

export default Createstudent;