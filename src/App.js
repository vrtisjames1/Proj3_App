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
  const [students, setStudents] = useState([]);
  const[showCreate, setShowCreate] = useState(false);

  const handleNewKidFormSubmit = (event, data)=>{
    event.preventDefault();
    axios.post('https://whispering-plateau-43837.herokuapp.com/',
        {
            parent: newParent,
            kid: newKid,
            photo: newPhoto,
            status: newStatus,
  
        }).then(()=>{axios.get('https://whispering-plateau-43837.herokuapp.com/')
            .then((response)=>{
                setStudents(response.data);
                setNewParent('');
                setKid('');
                setNewPhoto('');
                setShowCreate(false);
                console.log(response.data);
            })
        })
    };

  useEffect(() => {
    axios.get('https://whispering-plateau-43837.herokuapp.com/').then((response) => {
      setStudents(response.data);
    })
  }, [])


  return (
    <>
 



        <div>
          <Create />
          <RUD students={students} setStudents={setStudents} 
          handleNewKidFormSubmit={handleNewKidFormSubmit}/>

        </div>
    </>

  )
}

export default App;
