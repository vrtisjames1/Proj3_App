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
    const [updateStudents, setUpdateStudents] = useState([])

    const handleDelete = (studentData) => {
        axios.delete(`https://whispering-plateau-43837.herokuapp.com/${studentData._id}`).then(() => {
            axios.get('https://whispering-plateau-43837.herokuapp.com').then((response) => {
                props.setStudents(response.data)
            })
        })
    };

    const handleUpdateStatus = (list) => {
        axios.put(`https://whispering-plateau-43837.herokuapp.com/${list._id}`, {

          parent: list.parent,
          kid: list.kid,
          photo: list.photo,
          status: newStatus1

        }).then((response) => {
          axios.get("https://whispering-plateau-43837.herokuapp.com").then((response) => {
            props.setStudents(response.data);
            setUpdateNewStatus(false);
          });
        });
      };


    const updateStatus = () => {
        setUpdateNewStatus(true)
    }

    const submitStatus = (event) =>{
        setNewStatus1(event.target.value);
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
                                    
                                    {
                                        updateNewStatus === true? <textarea type="text" onKeyUp={submitStatus} defaultValue={statusParam.comments}></textarea> : <p>{statusParam.comments}</p>
                                    }
                                    </>
                                        )
                                    })}
                                    

                            <div className='student-status'>
  
                            </div>

                            <div className='card-button'>
                                {/* DELETE BUTTON  */}
                                <button onClick={() => {
                                    handleDelete(students)
                                }} >DELETE</button>

                                            
                                <button onClick={updateStatus}>Update Comments</button>
                                <button onClick={ () => { handleUpdateStatus(props.students)}}>Submit</button>


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