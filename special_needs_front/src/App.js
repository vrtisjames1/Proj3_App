import {useState, useEffect} from 'react'
import axios from 'axios'


const App = () => {

  // ======================================
  //                 HOOK
  // ======================================

  const [newParent, setNewParent] = useState('')
  const [newKid, setKid] = useState('')
  const [newPhoto, setNewPhoto] = useState('')
  const [newStatus, setNewStatus] = useState('')
  const [students, setStudents] = useState([])



  useEffect(() => {
    axios.get('https://whispering-plateau-43837.herokuapp.com/').then((response) => {
      setStudents(response.data)
    })
  }, [])


  return (
    <>
    <h1></h1>

    </>

  )
}

export default App;
