import {useState, useEffect} from 'react'
import axios from 'axios'
import Create from './components/create';
import RUD from './components/rud.js'

const App = () => {

  // ======================================
  //                 HOOK
  // ======================================

  const [students, setStudents] = useState([]);
  const[confirm, setConfirm] = useState(false);




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
