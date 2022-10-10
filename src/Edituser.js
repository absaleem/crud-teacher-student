import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate,Link,useParams } from 'react-router-dom';
import Listusers from './Listusers';
import Dashboard from './Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function Edituser() {
const navigate = useNavigate();
const params = useParams();

let formValues={
  id:"",
  name:"",
  age:"",
  email:"",
  gender:"",
  education:"",
  address:"",
  error:{
    name:"",
    age:"",
    email:"",
    gender:"",
    education:"",
    address:"",
 }
}
const [formData,setFormdata]=useState(formValues); 
const [userdata,setUserdata]=useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  setLoading(true);
  try{
async function getData(rowId){
    const response = await axios.get(`https://6341636a20f1f9d7997200a7.mockapi.io/teacher/${rowId}`);
    const response1 = response.data;
    setFormdata({...formData,
            id:response1.id,
            name:response1.name,
            age:response1.age,
            email:response1.email,
            gender:response1.gender,
            education:formData.education,
            address:formData.address
    });    
 }
 getData(params.userId);//call user data when loading the file

  }catch(error){

  }
  
setLoading(false);
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
    const response=await axios.put(`https://6341636a20f1f9d7997200a7.mockapi.io/teacher/${formData.id}`,{
        name:formData.name,
        age:formData.age,
        email:formData.email,
        gender:formData.gender,
        education:formData.education,
        address:formData.address
      });
      let users = [ ...userdata ];
      let index = userdata.findIndex((row)=>row.id === response.data.id);
      users[index]= response.data;
      setUserdata(users); 
      alert('updated successfully');
      setFormdata(formValues);
      navigate('/Listusers');
    }catch(error){

    }
    setLoading(false);

    }
 } 

    return (
    <>    
     <h1>CRUD WITH STUDENT & TEACHER MANAGEMENT</h1>
     <h2><Link to="/" element={<Dashboard />}>Dashboard</Link> |<Link to="/createuser" element={<Listusers />}>Create Teacher</Link> | <Link to="/Listusers" element={<Listusers />}>View Teacher</Link></h2>
   
    <div className="col-md-6"></div>    
    <div className="container col-md-6">
    <h2>Update Teacher</h2>
    {loading && <div className='loading'>Loading</div>}
    {!loading && (
      <Form  onSubmit={(e)=>handleSubmit(e)}>
        <Form.Group className="col-md-6"  controlId="exampleForm.ControlInput1">
            <Form.Label>Teacher name</Form.Label>
            <Form.Control  type="text" placeholder="name"  name="name" value={formData.name}  onChange={(e) => handleChange(e)}  required /> <span style={{color:"red"}}> {formData.error.name}</span><br/>
        </Form.Group>

      <Form.Group className="col-md-6"   controlId="exampleForm.ControlInput2">
        <Form.Label>Teacher email</Form.Label>
        <Form.Control  type="text"  placeholder="email" name="email" value={formData.email}  onChange={(e) => handleChange(e)}  required /> <span style={{color:"red"}}> {formData.error.email}</span><br/>
      </Form.Group>

      <Form.Group className="col-md-6"  controlId="exampleForm.ControlInput3">
        <Form.Label>Teacher age</Form.Label>
        <Form.Control size="lg" type="text" placeholder="age" name="age" value={formData.age} onChange={(e) => handleChange(e)}  required /> <span style={{color:"red"}}> {formData.error.age}</span><br/>
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
        <Form.Label>Education</Form.Label>
        <Form.Control type="text" placeholder="education" name="education" value={formData.education} onChange={(e) => handleChange(e)}  required /> <span style={{color:"red"}}> {formData.error.education}</span><br/>
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
      <span style={{color:"red"}}> {formData.error.address}</span><br/>     
      <Button type="submit" variant="primary">Save</Button>
     </Form>
    )}
    </div>
    </>
  );
}

export default Edituser;