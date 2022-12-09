import {useState, useEffect} from 'react'
import axios from 'axios'
import Create from './components/create';
import RUD from './components/rud.js'

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
      setStudents(response.data);
    })
  }, [])


  return (
    <>
 



        <div>
          <Create />

          <RUD students={students} setStudents={setStudents}/>
          
          {/* // sudents={students}
          //       handleNewKidFormSubmit={handleNewKidFormSubmit}
          //       handleNewParentChange={handleNewParentChange}
          //       handleNewKidChange={handleNewKidChange}
          //       handleNewPhotoChange={handleNewPhotoChange}
          //       setNewParent={setNewParent}
          //       setKid={setKid}
          //       setNewPhoto={setNewPhoto}
          //       setStudents={setStudents}/> */}
        </div>
    </>

  )
}

export default App;
