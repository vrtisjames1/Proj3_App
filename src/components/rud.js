import {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';  
import 'bootstrap/dist/js/bootstrap.js';
// import $ from 'jquery';
// import Popper from 'popper.js';
import {DropdownButton, Dropdown, Form, Card, Button} from 'react-bootstrap'; 
import IndexCSS from '../index.module.css';
import Create from './create.js';

// RUD - READ, UPDATE, DELETE 
const RUD = (props) => {

    //edit profiles
    const [editParent, setEditParent] = useState('');
    const [editPassword, setEditPassword] = useState(false);
    const [editKid, setEditKid] = useState('');
    const [editPhoto, setEditPhoto] = useState('');
    const [edits, setEditProfiles] = useState(false);
    // const[confirm, setConfirm] = useState(false);
    const [students, setStudents] = useState([]);
    const [editAdmin, setEditAdmin] = useState('');

    //add commments variables
    const [textbox, settextbox] = useState(false)
    const [inputDate, setInputDate] = useState('');
    const [inputCommments, setInputComments] = useState('');
    const [inputHeader, setInputHeader] = useState('');

    //edit comments
    const [editComments, setEditComments] = useState(false);
    const [commentsNewchange, setcommentsNewchange] = useState('');

    //filter
    const[filterID, setFilter] = useState('None');


    const handleDelete = (studentData) => {
        axios.delete(`https://whispering-plateau-43837.herokuapp.com/${studentData._id}`).then(() => {
            axios.get('https://whispering-plateau-43837.herokuapp.com').then((response) => {
                
            setStudents(response.data)
            })
        })
    };

    const openTextbox = () =>{
        settextbox(true);
    }

    const newInputDate = (event) =>{
        setInputDate(event.target.value);
    }

    const newInputHeader = (event) => {
        setInputHeader(event.target.value);
    }

    const newInputComments = (event) => {
        setInputComments(event.target.value);
    }

    const newEditComments = (event) =>{
        setcommentsNewchange(event.target.value);
    }
      

    //==========================================
    // FILTER RESULTS
    const handelFilterResults = (filterID) =>{
        
            filterID === "None"?  
            axios.get(`https://whispering-plateau-43837.herokuapp.com`).then((response) => {
                setStudents(response.data);
            }) :
            axios.get(`https://whispering-plateau-43837.herokuapp.com/find/${filterID}`).then((response) => {
                setStudents(response.data);
            })
    }

    const handleSelect=(e)=>{
            setFilter(e)
            handelFilterResults(e)
    }



    //=======================================
    //delete comments
    const handleDeleteComments = (students) =>{
        axios.put(`https://whispering-plateau-43837.herokuapp.com/deletecomments/${students._id}`, {
        }).then((response) => {

            handelFilterResults(filterID)
            
        })
    }

    //===========================================
    //update comments

    const handleComments = (statusParam) =>{
        axios.put(`https://whispering-plateau-43837.herokuapp.com/comments/${statusParam._id}`, {
            comments: commentsNewchange
        }).then((response) => {

            handelFilterResults(filterID)
            
        })
    }

    //=======================================
    //edit data

    const editParentData=(e)=>{
        setEditParent(e.target.value)
    }

    const editPasswordData=(e)=>{
        setEditPassword(e.target.value)
    }

    const editKidData=(e)=>{
        setEditKid(e.target.value)
    }

    const editPhotoData=(e)=>{
        setEditPhoto(e.target.value)
    }

    const handleNameEdits = (students)=>{
        axios.put(`https://whispering-plateau-43837.herokuapp.com/${students._id}`,
                {
                    username: students.username,
                    // password: students.password,
                    admin: students.admin,
                    confirm: students.confirm,
                    kid: editKid,
                    photo: students.photo,
                    status: students.status
                }
            ).then((response) => { 

                handelFilterResults(filterID)
        })
    }

    const handleParentEdits = (students)=>{
        axios.put(`https://whispering-plateau-43837.herokuapp.com/${students._id}`,
                {
                    username: editParent,
                    // password: students.password,
                    admin: students.admin,
                    confirm: students.confirm,
                    kid: students.kid,
                    photo: students.photo,
                    status: students.status
                }
            ).then((response) => { 
                
                handelFilterResults(filterID)
        })
    }

    const handlePasswordEdits = (students)=>{
        axios.put(`https://whispering-plateau-43837.herokuapp.com/password/${students._id}`,
                {
                    username: students.username,
                    password: editPassword,
                    admin: students.admin,
                    confirm: students.confirm,
                    kid: students.kid,
                    photo: students.photo,
                    status: students.status
                }
            ).then((response) => { 
                
                handelFilterResults(filterID)
        })
    }

    const handlePhotoEdits = (students)=>{
        axios.put(`https://whispering-plateau-43837.herokuapp.com/${students._id}`,
                {
                    username: students.username,
                    // password: students.password,
                    admin: students.admin,
                    confirm: students.confirm,
                    kid: students.kid,
                    photo: editPhoto,
                    status: students.status
                }
            ).then((response) => { 
                
                handelFilterResults(filterID)
        })
    }

    const handleAdminEdits = (students)=>{
        (editAdmin === false)? setEditAdmin(true): setEditAdmin(false)
        axios.put(`https://whispering-plateau-43837.herokuapp.com/${students._id}`,
                {
                    username: students.username,
                    // password: students.password,
                    admin: editAdmin,
                    confirm: students.confirm,
                    kid: students.kid,
                    photo: students.photo,
                    status: students.status
                }
            ).then((response) => { 
                
                handelFilterResults(filterID)
        })
    }


    //======================================
    // change update status
    const changeTrueUpdate = (students)=>{
        axios.put(`https://whispering-plateau-43837.herokuapp.com/${students._id}`,
                {
                    username: students.username,
                    // password: students.password,
                    admin: students.admin,
                    confirm: false,
                    kid: students.kid,
                    photo: students.photo,
                    status: students.status
                }
            ).then((response) => { 

                handelFilterResults(filterID);
        })
    }
    const changeFalseUpdate = (students)=>{
        axios.put(`https://whispering-plateau-43837.herokuapp.com/${students._id}`,
                {
                    username: students.username,
                    // password: students.password,
                    admin: students.admin,
                    confirm: true,
                    kid: students.kid,
                    photo: students.photo,
                    status: students.status
                }
            ).then((response) => { 
                
                handelFilterResults(filterID);
        })
    }

       //==========================================
       const handleUpdateStatus = (students) => {
        axios.put(`https://whispering-plateau-43837.herokuapp.com/status/${students._id}`, {
            date: inputDate, 
            header: inputHeader, 
            comments: inputCommments

        })
        
        .then((response) => {

            handelFilterResults(filterID);
        })
      }

    useEffect(() => {
        axios.get('https://whispering-plateau-43837.herokuapp.com').then((response) => {
          setStudents(response.data);
        })
      }, [])

    return (
        <>
        <Create students={students} setStudents={setStudents}/>
            <div>
                <DropdownButton title="Select Profile" id="dropdown-menu-align-right" onSelect={handleSelect}>
                {students.map((students) => {
                    return (
                        <div key={students._id}>
                            <Dropdown.Item href="#" eventKey={students._id}>{students.kid}</Dropdown.Item>   
                        </div>
                        )})}
                        <div>
                            <Dropdown.Divider />
                            <Dropdown.Item href="#" eventKey="None">None</Dropdown.Item> 
                        </div>
                </DropdownButton>
            </div>
        <div >
            {students.slice(0).reverse().map((students) => {
                return (
                        <div key={students._id}>
                        <Card className={IndexCSS.card}>
                                {
                                    edits === true? 
                                    <div className={IndexCSS.profileButtons}>
                                        <div className={IndexCSS.nameChange}>
                                           <Form>
                                                <div>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Student Name</Form.Label>
                                                    <Form.Control defaultValue={students.kid} onKeyUp={editKidData} />
                                                </Form.Group>
                                                </div>
                                                <div>
                                                <Button variant="secondary" onClick={() =>{handleNameEdits(students); setEditProfiles(false);}}>Submit Name Change</Button>
                                                </div>
                                            </Form>
                                        </div>
                                        <div className={IndexCSS.parentNameChange}>
                                           <Form>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Username</Form.Label>
                                                    <Form.Control defaultValue={students.username} onKeyUp={editParentData} />
                                                </Form.Group>
                                                <div>
                                                    <Button variant="secondary" onClick={() =>{handleParentEdits(students); setEditProfiles(false);}}>Submit Username Change</Button>
                                                </div>
                                            </Form>
                                        </div>
                                        <div className={IndexCSS.parentNameChange}>
                                           <Form>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control onKeyUp={editPasswordData} />
                                                </Form.Group>
                                                <div>
                                                    <Button variant="secondary" onClick={() =>{handlePasswordEdits(students); setEditProfiles(false);}}>Submit Password Change</Button>
                                                </div>
                                            </Form>
                                        </div>
                                        <div className={IndexCSS.imageChange}>
                                        <Form>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Photo</Form.Label>
                                                    <Form.Control defaultValue={students.photo} onChange={editPhotoData} />
                                                </Form.Group>
                                                <div>
                                                    <Button variant="secondary" onClick={() =>{handlePhotoEdits(students); setEditProfiles(false);}}>Submit Photo Change</Button>
                                                </div>
                                            </Form>
                                        </div>
                                        <div className={IndexCSS.imageChange}>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                                <Form.Check type="checkbox" checked={students.admin} label="Admin" onChange={() => {handleAdminEdits(students); setEditProfiles(false);}}/>
                                            </Form.Group>
                                        </Form>
                                        </div>
                                    </div>
                                    : 
                                    <div className={IndexCSS.profileHeader}>
                                        <Card.Header>
                                            <b>Student: {students.kid}</b><br />
                                            Username: {students.username}<br />
                                            Admin: {students.admin === true? <b style={{color: "purple"}}>True</b>: "False"}<br />
                                            {
                                                students.confirm === true? <p style={{color: "green"}}>Read Updates: &#x2713;</p> : <p style={{color: "red"}}>Read Updates: &#10007;</p>
                                            }
                                             
                                        </Card.Header>
                                        <div>
                                            <img className={IndexCSS.photo} src={students.photo} alt="dbimage"/><br />
                                        </div>
                                    </div>
                                }

                                {students.status.slice(0).reverse().map((statusParam) => {
                                return (
                                    <div key={statusParam._id} className={IndexCSS.statusBox}>
                                        <Card.Title>{statusParam.header}: {statusParam.date}</Card.Title>
                                        {
                                        editComments === true? 
                                        <div>
                                            <Form>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                    <Form.Control as="textarea" rows={5} defaultValue={statusParam.comments} onKeyUp={newEditComments}/>
                                                </Form.Group>
                                            </Form>
                                            <div className={IndexCSS.editCommentsButton}>
                                                <div>
                                                    <Button className={IndexCSS.buttonLight} variant="secondary" onClick={ () => { handleComments(statusParam); setEditComments(false); setEditProfiles(false);}}>Submit Comments</Button>
                                                </div>
                                                <div>
                                                    <Button className={IndexCSS.buttonLight} variant="danger" onClick={ () => { handleDeleteComments(statusParam); setEditComments(false); setEditProfiles(false)}}>Delete Comments</Button>
                                                </div>
                                            </div>
                                        </div> 
                                        :
                                        <Card.Text>{statusParam.comments}</Card.Text>
                                        }
                                    </div>
                                        )
                                    })}
                                
                                    <>
                                    {
                                        textbox === true? <div className={IndexCSS.newComments}>
                                            <Form>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Date</Form.Label>
                                                    <Form.Control type="email" placeholder="i.e. 18 Apr 2023" onKeyUp={newInputDate}/>
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Subject</Form.Label>
                                                    <Form.Control type="email" placeholder="Subject" onKeyUp={newInputHeader}/>
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                     <Form.Label>Body</Form.Label>
                                                    <Form.Control as="textarea" rows={5} onKeyUp={newInputComments}/>
                                                </Form.Group>
                                                </Form>
                                                </div>
                                                : ''
                                    }
                                    </>
                            <div className={IndexCSS.cardButton}>
                                {
                                edits === true? 
                                <div className={IndexCSS.editCommentsButton}>
                                    <Button className={IndexCSS.buttonLight} variant="danger" onClick={() => {handleDelete(students); settextbox(false); setEditProfiles(false);}} >Delete Profile</Button>
                                    <Button className={IndexCSS.buttonLight} variant="light" onClick={ () => { setEditComments(true)}}>Edit Comments</Button>
                                    <Button className={IndexCSS.buttonLight} variant="light" onClick={ () => {setEditProfiles(false); setEditComments(false);}}>Cancel</Button> 
                                </div>
                                :
                                <div>
                                    {
                                    textbox === true? 
                                    <div className={IndexCSS.editCommentsButton}>
                                        <div>
                                            <Button className={IndexCSS.buttonLight} variant="success" onClick={ () => { handleUpdateStatus(students); settextbox (false); }}>Submit</Button>
                                        </div>
                                        <div>
                                            <Button variant="light" className={IndexCSS.buttonLight} onClick={ () => { settextbox(false); }}>Cancel</Button>
                                        </div>
                                    </div> 
                                    : 
                                    <div className={IndexCSS.editCommentsButton}>
                                        <div>
                                            <Button className={IndexCSS.buttonLight} variant="light" onClick={ () => { openTextbox()}}>Add Update</Button>
                                        </div>
                                        <div>
                                            <Button className={IndexCSS.buttonLight} variant="light" onClick={ () => { setEditProfiles(true)}}>Edit</Button>
                                        </div>
                                        <div>
                                            <Button className={IndexCSS.buttonLight} variant="light" onClick={ () => { students.confirm === true? changeTrueUpdate(students): changeFalseUpdate(students) }}>Change Update Status</Button>
                                        </div>
                                    </div>
                                    }
                                </div>
                                }
                            </div>
                        </Card>
                        </div>
                )
            })}
        </div>
        </>
)}

export default RUD