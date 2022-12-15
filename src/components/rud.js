import {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';  
import 'bootstrap/dist/js/bootstrap.js';
import {DropdownButton, Dropdown, Form, Card, Button} from 'react-bootstrap'; 
import IndexCSS from '../index.module.css';
import Create from './create.js';

// RUD - READ, UPDATE, DELETE 
const RUD = (props) => {
    //==================================================
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
    const [dropdown, setDropdown] = useState([]);

    //changing card class
    const[activeClass, setClass] = useState(true);


    //==================================================
    //toggle card to expand cards
    //==================================================

    const toggleClass = () => {
        setClass(!activeClass);
      };

    //==================================================
    //delete a proile
    //==================================================
    const handleDelete = (studentData) => {
        axios.delete(`https://whispering-plateau-43837.herokuapp.com/${studentData._id}`).then(() => {
            axios.get('https://whispering-plateau-43837.herokuapp.com').then((response) => {
            setDropdown(response.data)
            setStudents(response.data)
            })
        })
    };

    //==================================================
    //edit new input data
    //==================================================

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
      
    //==================================================
    // Filter results
    //==================================================
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
    //==================================================
    //delete comments
    //==================================================
    const handleDeleteComments = (students) =>{
        axios.put(`https://whispering-plateau-43837.herokuapp.com/deletecomments/${students._id}`, {
        }).then((response) => {
            //execute filter function to remain on same page   
            handelFilterResults(filterID)
            
        })
    }

    //==================================================
    //update comments
    //==================================================
    const handleComments = (statusParam) =>{
        axios.put(`https://whispering-plateau-43837.herokuapp.com/comments/${statusParam._id}`, {
            comments: commentsNewchange
        }).then((response) => {

            handelFilterResults(filterID)
            
        })
    }

    //==================================================
    //edit data and record target value
    //==================================================

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

    //==================================================
    // edit the names
    //==================================================
    const handleNameEdits = (students)=>{
        axios.put(`https://whispering-plateau-43837.herokuapp.com/${students._id}`,
                {
                    username: students.username,
                    admin: students.admin,
                    confirm: students.confirm,
                    kid: editKid,
                    photo: students.photo,
                    status: students.status
                }
            ).then((response) => { 
                //execute filter function to remain on same page
                handelFilterResults(filterID)
        })
    }

    //==========================================
    //edit the username
    //==========================================
    const handleParentEdits = (students)=>{
        axios.put(`https://whispering-plateau-43837.herokuapp.com/${students._id}`,
                {
                    username: editParent,
                    admin: students.admin,
                    confirm: students.confirm,
                    kid: students.kid,
                    photo: students.photo,
                    status: students.status
                }
            ).then((response) => { 
                //execute filter function to remain on same page
                handelFilterResults(filterID)
        })
    }

    //==================================================
    // edit the password
    //==================================================
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
                //execute filter function to remain on same page
                handelFilterResults(filterID)
        })
    }

    //==================================================
    // edit the photo url
    //==================================================
    const handlePhotoEdits = (students)=>{
        axios.put(`https://whispering-plateau-43837.herokuapp.com/${students._id}`,
                {
                    username: students.username,
                    admin: students.admin,
                    confirm: students.confirm,
                    kid: students.kid,
                    photo: editPhoto,
                    status: students.status
                }
            ).then((response) => { 

                //execute filter function to remain on same page
                handelFilterResults(filterID)
        })
    }

    //==================================================
    // edit admin permissions
    //==================================================
    const handleAdminEdits = (students)=>{
        (editAdmin === false)? setEditAdmin(true): setEditAdmin(false)
        axios.put(`https://whispering-plateau-43837.herokuapp.com/${students._id}`,
                {
                    username: students.username,
                    admin: editAdmin,
                    confirm: students.confirm,
                    kid: students.kid,
                    photo: students.photo,
                    status: students.status
                }
            ).then((response) => { 

                //execute filter function to remain on same page
                handelFilterResults(filterID)
        })
    }

    //==================================================
    // change read update status to false
    //==================================================
    const changeTrueUpdate = (students)=>{
        axios.put(`https://whispering-plateau-43837.herokuapp.com/${students._id}`,
                {
                    username: students.username,
                    admin: students.admin,
                    confirm: false,
                    kid: students.kid,
                    photo: students.photo,
                    status: students.status
                }
            ).then((response) => { 

                //execute filter function to remain on same page
                handelFilterResults(filterID);
        })
    }
    //==================================================
    // change read update status to true
    //==================================================
    const changeFalseUpdate = (students)=>{
        axios.put(`https://whispering-plateau-43837.herokuapp.com/${students._id}`,
                {
                    username: students.username,
                    admin: students.admin,
                    confirm: true,
                    kid: students.kid,
                    photo: students.photo,
                    status: students.status
                }
            ).then((response) => { 
                //execute filter function to remain on same page
                handelFilterResults(filterID);
        })
    }

       //==================================================
       //add updated message
       //===================================================
       const handleUpdateStatus = (students) => {
        axios.put(`https://whispering-plateau-43837.herokuapp.com/status/${students._id}`, {
            date: inputDate, 
            header: inputHeader, 
            comments: inputCommments

            })
        
            .then((response) => {
                //execute filter function to remain on same page
                handelFilterResults(filterID);
            })
        }

    // set the initial state of the page
    useEffect(() => {
        axios.get('https://whispering-plateau-43837.herokuapp.com').then((response) => {
          setStudents(response.data);

          //set the dropdown item names for the filter
          setDropdown(response.data);
        })
      }, [])


    //===================================================
    //returns the data on the page
    //===================================================
    return (
        <>
        {/* start of maping through the data */}
        <Create students={students} setStudents={setStudents} setDropdown={setDropdown}/>
            <div>
                {/* dropdown to filter results */}
                <DropdownButton title="Select Profile" className={IndexCSS.dropdown} id="dropdown-menu-align-right" onSelect={handleSelect}>
                    {/* show all kids */}
                    <Dropdown.Item href="#" eventKey="None">Show All</Dropdown.Item>
                    <Dropdown.Divider />
                {dropdown.map((students) => {
                    return (
                        <div key={students._id}>
                            {/* map through kids names */}
                            <Dropdown.Item href="#" eventKey={students._id}>{students.kid}</Dropdown.Item>   
                        </div>
                        )})}
                        <div>

                        </div>
                </DropdownButton>
                {/* end of dropdown */}
            </div>
        <div >

            {/* show students in reverse order of database */}
            <div className={IndexCSS.cardsBody}>
            {students.slice(0).reverse().map((students) => {
                return (
                    <div key={students._id}>
                            {/* function to change width of card */}
                        <Card className={`${IndexCSS.cards} ${activeClass ? IndexCSS.cardSmall : IndexCSS.card}`}>
                                {
                                    // show edit page if true.
                                    edits === true? 
                                    <div className={IndexCSS.profileButtons}>
                                        <div className={IndexCSS.nameChange}>
                                           <Form>
                                                <div>
                                                    {/* if edits is true then a form is generated to change the name */}
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Student Name</Form.Label>
                                                    <Form.Control defaultValue={students.kid} onKeyUp={editKidData} />
                                                </Form.Group>
                                                </div>
                                                <div>
                                                <Button variant="secondary" onClick={() =>{handleNameEdits(students); setEditProfiles(false); toggleClass();}}>Submit Name</Button>
                                                </div>
                                            </Form>
                                        </div>
                                        <div className={IndexCSS.parentNameChange}>
                                           <Form>
                                            {/* if edits is true then a form is generated to change the username */}
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Username</Form.Label>
                                                    <Form.Control defaultValue={students.username} onKeyUp={editParentData} />
                                                </Form.Group>
                                                <div>
                                                    <Button variant="secondary" onClick={() =>{handleParentEdits(students); setEditProfiles(false); toggleClass();}}>Submit Username</Button>
                                                </div>
                                            </Form>
                                        </div>
                                        <div className={IndexCSS.parentNameChange}>
                                           <Form>
                                            {/* if edits is true then a form is generated to change the password*/}
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control onKeyUp={editPasswordData} />
                                                </Form.Group>
                                                <div>
                                                    <Button variant="secondary" onClick={() =>{handlePasswordEdits(students); setEditProfiles(false); toggleClass();}}>Submit Password</Button>
                                                </div>
                                            </Form>
                                        </div>
                                        <div className={IndexCSS.imageChange}>
                                        <Form>
                                            {/* if edits is true then a form is generated to change the photo */}
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Photo</Form.Label>
                                                    <Form.Control defaultValue={students.photo} onChange={editPhotoData} />
                                                </Form.Group>
                                                <div>
                                                    <Button variant="secondary" onClick={() =>{handlePhotoEdits(students); setEditProfiles(false); toggleClass();}}>Submit Photo</Button>
                                                </div>
                                            </Form>
                                        </div>
                                        <div className={IndexCSS.imageChange}>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                                <Form.Check type="checkbox" checked={students.admin} label="Admin" onChange={() => {handleAdminEdits(students); setEditProfiles(false); toggleClass();}}/>
                                            </Form.Group>
                                        </Form>
                                        </div>
                                    </div>
                                    // end of terinary statement for edits. If edits is not true then display the results
                                    : 
                                    <div className={IndexCSS.profileHeader}>
                                        <Card.Header>
                                            {/* display results */}
                                            <b>Student: {students.kid}</b><br />
                                            Username: {students.username}<br />
                                            Admin: {students.admin === true? <b style={{color: "purple"}}>True</b>: "False"}<br />
                                            {
                                                students.confirm === true? <p style={{color: "green"}}>Read Updates: &#x2713;</p> : <p style={{color: "red"}}>Read Updates: &#10007;</p>
                                            }
                                             
                                        </Card.Header>
                                        <div className={IndexCSS.photodiv}>
                                            <img className={IndexCSS.photo} src={students.photo} alt="dbimage"/><br />
                                        </div>
                                    </div>
                                }

                                {/* display the comments/status of students */}
                                {students.status.slice(0).reverse().map((statusParam) => {
                                return (
                                    <div key={statusParam._id} className={IndexCSS.statusBox}>
                                        <Card.Title>{statusParam.header}: {statusParam.date}</Card.Title>
                                        {
                                        editComments === true? 
                                        <div>
                                            <Form>
                                                {/* form control to edit the comments */}
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                    <Form.Control as="textarea" rows={5} defaultValue={statusParam.comments} onKeyUp={newEditComments}/>
                                                </Form.Group>
                                            </Form>
                                            <div className={IndexCSS.editCommentsButton}>
                                                <div>
                                                    <Button className={IndexCSS.buttonLight} variant="secondary" onClick={ () => { handleComments(statusParam); setEditComments(false); setEditProfiles(false); toggleClass();}}>Submit Comments</Button>
                                                </div>
                                                <div>
                                                    <Button className={IndexCSS.buttonLight} variant="danger" onClick={ () => { handleDeleteComments(statusParam); setEditComments(false); setEditProfiles(false); toggleClass();}}>Delete Comments</Button>
                                                </div>
                                            </div>
                                        </div> 
                                        :
                                        // end of terniary to display comments if not edititing
                                        <Card.Text>{statusParam.comments}</Card.Text>
                                        }
                                    </div>
                                        )
                                    })}
                                
                                    <>
                                    {/* terinary statement to add a status updated if edit condition is true */}
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
                                                // else display null if edit is not true
                                                : ''
                                    }
                                    </>
                            <div className={IndexCSS.cardButton}>
                                {
                                edits === true? 
                                <div className={IndexCSS.editCommentsButton}>
                                    <Button className={IndexCSS.buttonLight} variant="danger" onClick={() => {handleDelete(students); settextbox(false); setEditProfiles(false); toggleClass();}} >Delete Profile</Button>
                                    <Button className={IndexCSS.buttonLight} variant="light" onClick={ () => { setEditComments(true);}}>Edit Comments</Button>
                                    <Button className={IndexCSS.buttonLight} variant="light" onClick={ () => {setEditProfiles(false); setEditComments(false); toggleClass();}}>Cancel</Button> 
                                </div>
                                :
                                <div>
                                    {
                                    textbox === true? 
                                    <div className={IndexCSS.editCommentsButton}>
                                        <div>
                                            <Button className={IndexCSS.buttonLight} variant="success" onClick={ () => { handleUpdateStatus(students); settextbox (false); toggleClass(); }}>Submit</Button>
                                        </div>
                                        <div>
                                            <Button variant="light" className={IndexCSS.buttonLight} onClick={ () => { settextbox(false); toggleClass();}}>Cancel</Button>
                                        </div>
                                    </div> 
                                    : 
                                    <div className={IndexCSS.editCommentsButton}>
                                        <div>
                                            <Button className={IndexCSS.buttonLight} variant="light" onClick={ () => { openTextbox(); toggleClass();}}>Add Update</Button>
                                        </div>
                                        <div>
                                            <Button className={IndexCSS.buttonLight} variant="light" onClick={ () => { setEditProfiles(true); toggleClass();}}>Edit</Button>
                                        </div>
                                        <div>
                                            <Button className={IndexCSS.buttonLight} variant="light" onClick={ () => { students.confirm === true? changeTrueUpdate(students): changeFalseUpdate(students);}}>Change Update Status</Button>
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
        </div>
        </>
)}
//==================================================
//export RUD
//==================================================
export default RUD