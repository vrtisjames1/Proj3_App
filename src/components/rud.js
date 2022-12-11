import {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';  
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import Popper from 'popper.js';
import {DropdownButton, Dropdown} from 'react-bootstrap'; 
import IndexCSS from '../index.module.css';

// RUD - READ, UPDATE, DELETE 
const RUD = (props) => {

    //edit profiles
    const [editParent, setEditParent] = useState('');
    const [editKid, setEditKid] = useState('');
    const [editPhoto, setEditPhoto] = useState('');
    const [edits, setEditProfiles] = useState(false);

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
                props.setStudents(response.data)
            })
        })
    };

    const handleUpdateStatus = (students) => {
        axios.put(`https://whispering-plateau-43837.herokuapp.com/status/${students._id}`, {
            date: inputDate, 
            header: inputHeader, 
            comments: inputCommments

        }).then((response) => {
          axios.get("https://whispering-plateau-43837.herokuapp.com").then((response) => {
            props.setStudents(response.data);
          });
        });
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

    const handleUpdateComments = (students) => {
        axios.put(`https://whispering-plateau-43837.herokuapp.com/comments/${students._id}`, {
            comments: commentsNewchange

        }).then((response) => {
          axios.get("https://whispering-plateau-43837.herokuapp.com").then((response) => {
            props.setStudents(response.data);
          });
        });
      };
      

    //==========================================
    // FILTER RESULTS
    const handelFilterResults = (filterID) =>{
        {
            filterID == "None"?  
            axios.get(`https://whispering-plateau-43837.herokuapp.com`).then((response) => {
                props.setStudents(response.data);
            console.log(response.data);}) :
            axios.get(`https://whispering-plateau-43837.herokuapp.com/find/${filterID}`).then((response) => {
                props.setStudents(response.data);
            
                console.log(response.data);})
        }  
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
          axios.get("https://whispering-plateau-43837.herokuapp.com").then((response) => {
            props.setStudents(response.data);
          });
        });
    }

    //=======================================
    //edit data

    const editParentData=(e)=>{
        setEditParent(e.target.value)
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
                    parent: students.parent,
                    kid: editKid,
                    photo: students.photo,
                    status: students.status
                }
            ).then((response) => { 
                axios.get(`https://whispering-plateau-43837.herokuapp.com`).then((response) => {
                props.setStudents(response.data)
            }) 
        })
    }

    const handleParentEdits = (students)=>{
        axios.put(`https://whispering-plateau-43837.herokuapp.com/${students._id}`,
                {
                    parent: editParent,
                    kid: students.kid,
                    photo: students.photo,
                    status: students.status
                }
            ).then((response) => { axios.get(`https://whispering-plateau-43837.herokuapp.com`).then((response) => {
                props.setStudents(response.data)
            }) 
        })
    }

    const handlePhotoEdits = (students)=>{
        axios.put(`https://whispering-plateau-43837.herokuapp.com/${students._id}`,
                {
                    parent: students.parent,
                    kid: students.kid,
                    photo: editPhoto,
                    status: students.status
                }
            ).then((response) => { axios.get(`https://whispering-plateau-43837.herokuapp.com`).then((response) => {
                props.setStudents(response.data)
            }) 
        })
    }

     //==========================================
     //edit profiles

    return (
        <>
            <div>
                {/* filter results */}
            <DropdownButton title="Select Profile" id="dropdown-menu-align-right" onSelect={handleSelect}>
            {props.students.map((students) => {
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
           
            {props.students.slice(0).reverse().map((students) => {
                return (
                        <div className='card' key={students._id}>
                            <div className='student-info'>
                                {
                                    edits === true? 
                                    <div>
                                        <div><input defaultValue={students.kid} onKeyUp={editKidData}/><button onClick={()=>{ handleNameEdits(students); setEditProfiles(false);}}>Submit Name</button></div> 
                                        <div><input defaultValue={students.parent} onKeyUp={editParentData}/><button onClick={()=>{ handleParentEdits(students); setEditProfiles(false);}}>Submit Parents</button></div> 
                                        <div><input defaultValue={students.photo} onKeyUp={editPhotoData}/><button onClick={()=>{ handlePhotoEdits(students); setEditProfiles(false);}}>Submit Image</button></div> 
                                    </div>
                                    : 
                                    <div>
                                        <h3>{students.kid}</h3><br />
                                        <p>Parent(s): {students.parent}</p>
                                        <img className={IndexCSS.photo}src={students.photo} /><br />
                                    </div>
                                }

                            </div>

                            {students.status.slice(0).reverse().map((statusParam) => {
                                return (
                                    <div key={statusParam._id}>
                                    <p><b>{statusParam.header}</b></p>
                                    <p>{statusParam.date}</p>
                                    {
                                        editComments === true? <div>
                                            <textarea defaultValue={statusParam.comments} onKeyUp={newEditComments}></textarea>
                                            <button onClick={ () => { handleUpdateComments(statusParam); setEditComments(false); setEditProfiles(false)}}>Submit Comments</button><button onClick={ () => { handleDeleteComments(statusParam); setEditComments(false); setEditProfiles(false)}}>Delete Comments</button></div> 
                                        :
                                        <p>{statusParam.comments}</p>
                                    }
                                    
                                    
                                    </div>
                                        )
                                    })}
                                    <>
                                    {
                                            textbox === true? <div>
                                                <input type="text" placeholder="Date" onKeyUp={newInputDate} /><br/>
                                                <input type="text" placeholder="Subject" onKeyUp={newInputHeader}/><br/>
                                                <textarea type="text" placeholder="Body" onKeyUp={newInputComments}/><br/>
                                                </div>
                                                : null
                                    }
                                    </>

                                    

                            <div className='student-status'>
  
                            </div>

                            <div className='card-button'>

                                

                                {
                                edits === true? <div>
                                    <button onClick={() => {handleDelete(students); settextbox(false); setEditProfiles(false);}} >Delete Profile</button>
                                    <button onClick={ () => { setEditComments(true)}}>Edit Comments</button>
                                    <button onClick={ () => {setEditProfiles(false); setEditComments(false);}}>Cancel</button> 
                                    </div>
                                :
                                <div>
                                    {
                                    textbox === true? <div><button onClick={ () => { handleUpdateStatus(students); settextbox(false); }}>Submit</button><button onClick={ () => { settextbox(false); }}>Cancel</button></div> 
                                    : 
                                    <div>
                                        <button onClick={ () => { openTextbox()}}>Add Update</button>
                                        <button onClick={ () => { setEditProfiles(true)}}>Edit</button>
                                    </div>
                                    }
                                </div>

                                }
                            </div>
                        </div>
                )
            })}

        </>
)}


export default RUD