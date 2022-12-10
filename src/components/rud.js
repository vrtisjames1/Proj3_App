import {useState, useEffect} from 'react'
import axios from 'axios'

// RUD - READ, UPDATE, DELETE 
const RUD = (props) => {
    const [newParent, setNewParent] = useState('');
    const [newKid, setKid] = useState('');
    const [newPhoto, setNewPhoto] = useState('');
    const [newStatus, setNewStatus] = useState([]);
    const [newStatus1, setNewStatus1] = useState('');
    const [updateNewStatus, setUpdateNewStatus] = useState(false)
    // const [updateStudents, setUpdateStudents] = useState([])

    //add commments variables
    const [textbox, settextbox] = useState(false)
    const [inputDate, setInputDate] = useState('');
    const [inputCommments, setInputComments] = useState('');
    const [inputHeader, setInputHeader] = useState('');

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


    // const updateStatus = () => {
    //     setUpdateNewStatus(true)
    // }

    // const submitStatus = (event) =>{
    //     setNewStatus1(event.target.value);
    //     console.log(newStatus1);
    // }

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
                                    <p>{statusParam.comments}</p>
                                    
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
                                    textbox === true? <button onClick={ () => { handleUpdateStatus(students); settextbox(false); }}>Submit</button>: <button onClick={ () => { openTextbox()}}>Add Update</button>
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