import {useState, useEffect} from 'react'
import axios from 'axios'
import Create from './components/create';
// import RUD from './components/rud.js'
import 'bootstrap/dist/css/bootstrap.min.css';  
import {Form, Button} from 'react-bootstrap';  

// import css
import IndexCSS from './index.module.css';
import './App.css';

function App () {
    const [students, setStudents] = useState([]);

  const [toggleLogin, setToggleLogin] = useState(true)
  const [toggleError, setToggleError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [toggleLogout, setToggleLogout] = useState(false)
  const [currentUser, setCurrentUser] = useState({})

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleCreateUser = (event) => {
    event.preventDefault()
    event.currentTarget.reset()
    let userObj = {
      username: username,
      password: password
    }
    setUsername('')
    setPassword('')
    axios.post('https://whispering-plateau-43837.herokuapp.com/login/createaccount', userObj).then((response) => {
      if(response.data.username){
        console.log(response);
        setToggleError(false)
        setErrorMessage('')
        setCurrentUser(response.data)
        handleToggleLogout()
      } else {
        setErrorMessage(response.data)
        setToggleError(true)
      }
    })
  }

  const handleLogin = (event) => {
    event.preventDefault()
    event.currentTarget.reset()
    let userObj = {
      username: username,
      password: password
    }
    setUsername('')
    setPassword('')
    axios.put('https://whispering-plateau-43837.herokuapp.com/login/login', userObj).then((response) => {
      if(response.data.username){
        console.log(response);
        setToggleError(false)
        setErrorMessage('')
        setCurrentUser(response.data)
        handleToggleLogout()
      } else {
        console.log(response);
        setToggleError(true)
        setErrorMessage(response.data)
      }
    })
  }

  const handleLogout = () => {
    setCurrentUser({})
    handleToggleLogout()
  }

  const handleToggleForm = () => {
    setToggleError(false)
    if(toggleLogin === true) {
      setToggleLogin(false)
    } else {
      setToggleLogin(true)
    }
  }

  const handleToggleLogout = () => {
    if(toggleLogout) {
      setToggleLogout(false)
    } else {
      setToggleLogout(true)
    }
  }

  useEffect(() => {
    axios.get('https://whispering-plateau-43837.herokuapp.com/login').then((response) => {
      setStudents(response.data);
    })
  }, [])

  return (
    <div className="App">
      <div>
        {toggleLogout ?
          <button onClick={handleLogout} class='logoutBtn'>Logout</button> :
          <div class='appFormDiv'>
            {toggleLogin ?
              //login form
              <div className="formContainer">
                <h1 class='formTitle'>Login</h1>
                <form onSubmit={handleLogin} class='inputForm'>
                  <input type='text' placeholder='username' class='textInput' onChange={(event)=> {setUsername(event.target.value)}}/>
                  <input type='password' placeholder='password' class='textInput' onChange={(event)=> {setPassword(event.target.value)}}/>
                  {toggleError ?
                    <h5 class='errorMsg'>{errorMessage}</h5>
                    :
                    null
                  }
                  <input type='submit' value='Login' class='submitBtn'/>
                </form>
              </div>
            :
            // new user form
            <div className="App" class='formContainer'>
              <h1 class='formTitle'>Create an Account</h1>
              <form onSubmit={handleCreateUser} class='inputForm'>
                <input type='text' placeholder='username' class='textInput' onChange={(event)=> {setUsername(event.target.value)}}/>
                <input type='password' placeholder='password' class='textInput' onChange={(event)=> {setPassword(event.target.value)}}/>
                {toggleError ?
                  <h5 class='errorMsg'>{errorMessage}</h5>
                  :
                  null
                }
                <input type='submit' value='Register' class='submitBtn'/>
              </form>
            </div>
            }
            <button onClick={handleToggleForm} class='accountBtn'>{toggleLogin ? 'Need an account?' : 'Already have an account?'}</button>
          </div>
        }


      </div>
      {currentUser.username ?
        <div class='loggedInDiv'>
          <Create students={students} setStudents={setStudents}/>
          {/* <RUD students={students} setStudents={setStudents}/> */}
        </div>
        :
        null
      }
    </div>
  );
}

export default App;