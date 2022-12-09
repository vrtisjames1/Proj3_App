import {useState, useEffect} from 'react'
import axios from 'axios'

// RUD - READ, UPDATE, DELETE 
const RUD = (props) => {
    const [updateNewParent, setUpdateNewParent] = useState('')
    const [updateNewKid, setUpdateKid] = useState('')
    const [updateNewPhoto, setUpdateNewPhoto] = useState('')
    const [updateNewStatus, setUpdateNewStatus] = useState('')
    const [updateStudents, setUpdateStudents] = useState([])

    const handleDelete = (studentData) => {
        axios.delete(`https://whispering-plateau-43837.herokuapp.com/${studentData._id}`).then(() => {
            axios.get('https://whispering-plateau-43837.herokuapp.com').then((response) => {
                props.setStudents(response.data)
            })
        })
    }

    // UPDATE FORM SUBMISSION 
    // const handleUpdateDescription = (studentData) =>  {
    //     axios.put(`https://whispering-plateau-43837.herokuapp.com/${studentData._id}`,
    //     {
    //         parent: updateNewParent,
    //         kid: updateNewKid,
    //         photo: updateNewPhoto,
    //         // status: [{date: updateNewDate, header: updateNewTitle, comments: updateNewComment}]
    //     }).then((response) => {
    //         axios.get('https://whispering-plateau-43837.herokuapp.com/').then((response) => {
    //             props.setStudents(response.data)
    //         })
    //     })
    // }


    const updateParentInfo = (e) => {
        setUpdateNewParent(e.target.value)
    }

    const updateKidName = (e) => {
        setUpdateKid(e.target.value)
    }

    const updateKidPhoto = (e) => {
        setUpdateNewPhoto(e.target.value)
    }

    // const updateStatus = (e) => {
    //     setUpdateNewStatus(e.target.value)
    // }

    return (
        <>
            {/* READ  */}
            {props.students.map((students) => {
                return (
                    <li>
                        <div className='card'>
                            <div className='student-info'>
                                {/* CHILD NAME */}
                                <h3>{students.kid}</h3><br />
                                <img src={students.photo} /><br />
                            </div>

                            {students.status.map((statusParam) => {
                                return (
                                    <p>
                                    <p><b>{statusParam.header}</b></p><br />
                                    <p>{statusParam.date}</p><br />
                                    <p>{statusParam.comments}</p><br />
                                    </p>
                                        )
                                    })}

                            <div className='student-status'>
  
                            </div>

                            <div className='card-button'>
                                {/* DELETE BUTTON  */}
                                <button onClick={() => {
                                    handleDelete(students)
                                }} >DELETE</button>


                                {/* <button on>Update</button> */}
                            </div>
                        </div>
                    </li>
                )
            })}
            

            {/* UPDATE FORM  */}
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