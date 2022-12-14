import {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';  
import {Form, Button} from 'react-bootstrap';  

// import css
import IndexCSS from '../index.module.css';


const Create = (props) => {
    const [newParent, setNewParent] = useState('');
    const [newKid, setKid] = useState('');
    const [newPhoto, setNewPhoto] = useState('');
    const [newStatus, setNewStatus] = useState([]);
    // const [students, setStudents] = useState([]);
    const[showCreate, setShowCreate] = useState(false);
    // const[confirm, setConfirm] = useState(false);
    const [password, setPassword] = useState('');
    const [newAdmin, setAdmin] = useState(false);
    

    const handleNewParentChange = (event)=>{
        setNewParent(event.target.value);
      };

      const handleNewPasswordChange = (event)=>{
        setPassword(event.target.value);
      };

      const handleNewKidChange = (event)=>{
        setKid(event.target.value);
      };

      const handleNewPhotoChange = (event)=>{
        setNewPhoto(event.target.value);
      };

      const changeShow = () =>{
        setShowCreate(true);
      }

      const toggleAdmin = () =>{
        {(newAdmin === false)? setAdmin(true): setAdmin(false)}
      }

      const handleNewKidFormSubmit = (event, data)=>{
        event.preventDefault();
        axios.post('https://whispering-plateau-43837.herokuapp.com/',
            {
                username: newParent,
                password: password,
                admin: newAdmin,
                confirm: false,
                kid: newKid,
                photo: newPhoto,
                status: newStatus,
      
            }).then(()=>{axios.get('https://whispering-plateau-43837.herokuapp.com/')
                .then((response)=>{
                    props.setStudents(response.data);
                    setPassword('');
                    setNewParent('');
                    setKid('');
                    setNewPhoto('');
                    setShowCreate(false);
                    setAdmin(false);
                })
            })
        };

        useEffect(() => {
            axios.get('https://whispering-plateau-43837.herokuapp.com/').then((response) => {
              props.setStudents(response.data);
            })
          }, [])

    return (
        <div>
            {
                showCreate === true?
                                    <div className={IndexCSS.inputform}>
                                         <Form onSubmit={ (event)=>{ handleNewKidFormSubmit(event, props.students)}}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Username</Form.Label>
                                                <Form.Control type="text" placeholder="Username" onChange={handleNewParentChange}/>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="text" placeholder="Password" onChange={handleNewPasswordChange}/>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Student Name</Form.Label>
                                                <Form.Control type="text" placeholder="Name" onChange={handleNewKidChange}/>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Image</Form.Label>
                                                <Form.Control type="text" placeholder="Image URL" onChange={handleNewPhotoChange}/>
                                            </Form.Group>
                                            <div className={IndexCSS.adminDiv}>
                                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                                <Form.Check type="checkbox" checked={newAdmin} label="Admin" onChange={() => toggleAdmin()}/>
                                            </Form.Group>
                                            </div>
                                            <Form.Group className={IndexCSS.inputButtons}>
                                                <div>
                                                    <Button type="submit" value="Submit">Submit</Button>
                                                </div>
                                                <div>
                                                <Button variant="danger" onClick={() =>{ setShowCreate(false); setNewParent(''); setKid(''); setNewPhoto('');}}>Cancel</Button>
                                                </div>
                                            </Form.Group>
 
                                            </Form>
                                    </div>
                                : <div className={IndexCSS.addProfile}><Button variant="success" onClick={changeShow}>Add A Profile</Button></div>
                                
                                
            }

        </div>
        )
    };
    
    export default Create