import {useState, useEffect} from 'react'
import axios from 'axios'

// RUD - READ, UPDATE, DELETE 
const RUD = (props) => {
    const [newParent, setNewParent] = useState('');
    const [newKid, setKid] = useState('');
    const [newPhoto, setNewPhoto] = useState('');
    const [newStatus, setNewStatus] = useState([]);
    const [updateNewStatus, setUpdateNewStatus] = useState(false)

    //add commments variables
    const [textbox, settextbox] = useState(false)
    const [inputDate, setInputDate] = useState('');
    const [inputCommments, setInputComments] = useState('');
    const [inputHeader, setInputHeader] = useState('');

    //edit comments
    const [editComments, setEditComments] = useState(false);
    const [commentsNewchange, setcommentsNewchange] = useState('');
    const [editCommentsBox, setEditCommentsBox] = useState(false);


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
            console.log(response.data);
            setUpdateNewStatus(false);
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
        console.log(inputDate, inputHeader, inputCommments)
    }

    const newEditComments = (event) =>{
        setcommentsNewchange(event.target.value);
        console.log(commentsNewchange);
    }

    const handleUpdateComments = (students) => {
        axios.put(`https://whispering-plateau-43837.herokuapp.com/comments/${students._id}`, {
            comments: commentsNewchange

        }).then((response) => {
          axios.get("https://whispering-plateau-43837.herokuapp.com").then((response) => {
            props.setStudents(response.data);
            console.log(response.data);
            setUpdateNewStatus(false);
          });
        });
      };


    return (
        <>
            {/* READ  */}
            {props.students.map((students) => {
                return (
                        <div className='card'>
                            <div className='student-info'>
                                {/* CHILD NAME */}
                                <h3>{students.kid}</h3><br />
                                <p>{students.parent}</p>
                                <img src={students.photo} /><br />
                            </div>

                            {students.status.map((statusParam) => {
                                return (
                                    <>
                                    <p><b>{statusParam.header}</b></p>
                                    <p>{statusParam.date}</p>
                                    {
                                        editComments === true? <div><textarea defaultValue={statusParam.comments} onKeyUp={newEditComments}></textarea><button onClick={ () => { handleUpdateComments(statusParam); setEditComments(false); setEditCommentsBox(false);}}>Submit</button></div> : <p>{statusParam.comments}</p>
                                    }
                                    
                                    
                                    </>
                                        )
                                    })}
                                    <>
                                    {
                                            textbox === true? <div>
                                                <input type="text" placeholder="Date" onKeyUp={newInputDate} /><br/>
                                                <input type="text" placeholder="Subject" onKeyUp={newInputHeader}/><br/>
                                                <textarea type="text" placeholder="Body" onKeyUp={newInputComments}/><br/>
                                                
                                                </div>: null
                                    }
                                    </>

                                    

                            <div className='student-status'>
  
                            </div>

                            <div className='card-button'>
                                {/* DELETE BUTTON  */}
                                <button onClick={() => {
                                    handleDelete(students)
                                }} >Delete Profile</button>

                                {
                                    textbox === true? <div><button onClick={ () => { handleUpdateStatus(students); settextbox(false); }}>Submit</button><button onClick={ () => { settextbox(false); }}>Cancel</button></div> : <button onClick={ () => { openTextbox()}}>Add Update</button>
                                }

                                {
                                    editCommentsBox == true? <button onClick={ () => { setEditComments(false); setEditCommentsBox(false);}}>Cancel Edit</button> : <button onClick={ () => { setEditComments(true); setEditCommentsBox(true);}}>Edit Comments</button> 
                                }
                                
                                
                                
                                


                            </div>
                        </div>
                )
            })}
            




            {/* <div>
                <form onSubmit={() => {handleUpdateDescription(props.student)}}>
                    <input onChange={updateParentInfo} defaultValue={props.student.parent} /><br />
                    <input onChange={updateKidName} defaultValue={props.student.kid} /><br />
                    <input onChange={updateKidPhoto} defaultValue={props.student.photo} /><br />
                </form>
            </div> */}



        </>
)}


export default RUD