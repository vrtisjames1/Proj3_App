import {useState, useEffect} from 'react'
import axios from 'axios'

// RUD - READ, UPDATE, DELETE 
const RUD = (props) => {
    const [updateNewParent, setUpdateNewParent] = useState('')
    const [updateNewKid, setUpdateKid] = useState('')
    const [updateNewPhoto, setUpdateNewPhoto] = useState('')
    const [updateNewStatus, setUpdateNewStatus] = useState('')
    const [updateStudents, setUpdateStudents] = useState([])

    // const handleUpdateDescription = (studentData) =>  {
    //     axios.put(`https://whispering-plateau-43837.herokuapp.com/${studentData._id}`,
    //     {
    //         parent: updateHandleNewParent,
    //         kid: updateHandleNewKid,
    //         photo: updateHandleNewPhoto,
    //         status: [{date: updateHandleNewDate, header: updateHandleNewTitle, comments: updateHandleNewComment}]
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
    {props.students.map((student) => {
        return (
            <li>
                <div className='card'>
                    <div className='student-info'>
                        {/* CHILD NAME */}
                        <h3>{student.kid}</h3><br />
                        <img src={student.image} /><br />
                    </div>

                    <div className='student-status'>
                        <h4>{student.status.header}</h4><br />
                        <h4>{student.status.date}</h4><br />
                        <p>{student.status.comment}</p><br />
                    </div>

                    <div className='card-button'>
                        <button on>Update</button>
                    </div>
                </div>
            </li>
        )
    })}

    {/* UPDATE FORM  */}
        {/* <form>
            <input onChange={updateParentInfo} defaultValue={props.student.parent} /><br />
            <input onChange={updateKidName} defaultValue={props.student.kid} /><br />
            <input onChange={updateKidPhoto} defaultValue={props.student.photo} /><br /> */}
            {/* <input onChange={updateStatus} defaultValue={} /><br /> */}

        {/* </form> */}
    </>
)}
export default RUD