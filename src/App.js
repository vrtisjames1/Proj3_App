import {useState, useEffect} from 'react'
import axios from 'axios'
import Create from './components/create';
import RUD from './components/rud.js'

const App = () => {

  // ======================================
  //                 HOOK
  // ======================================

  // const [newParent, setNewParent] = useState('')
  // const [newKid, setKid] = useState('')
  // const [newPhoto, setNewPhoto] = useState('')
  // const [newStatus, setNewStatus] = useState('')
  const [students, setStudents] = useState([]);
  // const[showCreate, setShowCreate] = useState(false);

 

  useEffect(() => {
    axios.get('https://whispering-plateau-43837.herokuapp.com/').then((response) => {
      setStudents(response.data);
    })
  }, [])


  return (
    <>
 



        <div>
          <Create students={students} setStudents={setStudents}/>
          <RUD students={students} setStudents={setStudents}/>

        </div>
    </>

  )
}

export default App;
