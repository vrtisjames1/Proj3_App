import {useState, useEffect} from 'react'
import axios from 'axios'


const RUD = () => {
    const [updateNewParent, setUpdateNewParent] = useState('')
    const [updateNewKid, setUpdateKid] = useState('')
    const [updateNewPhoto, setUpdateNewPhoto] = useState('')
    const [updateNewStatus, setUpdateNewStatus] = useState('')
    const [updateStudents, setUpdateStudents] = useState([])

    const handleUpdateDescription = (studentData) =>  {
        axios.put(`https://whispering-plateau-43837.herokuapp.com/${studentData._id}`,
        {
            parent: updateHandleNewParent,
            kid: updateHandleNewKid,
            photo: updateHandleNewPhoto,
            status: [{date: updateHandleNewDate, header: updateHandleNewTitle, comments: updateHandleNewComment}]
        }).then((response) => {
            axios.get('https://whispering-plateau-43837.herokuapp.com/').then((response) => {
                props.setStudents(response.data)
            })
        })
    }
}