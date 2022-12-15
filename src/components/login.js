import {useState} from 'react'
import axios from 'axios'
import RUD from './rud.js'
import Parents from './parents.js'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import {Button} from 'react-bootstrap'; 
import LoginCSS from '../login.module.css';

function Login (props) {
  const [students, setStudents] = useState([]);
  const [toggleLogin, setToggleLogin] = useState(true)
  const [toggleError, setToggleError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [toggleLogout, setToggleLogout] = useState(false)
  const [currentUser, setCurrentUser] = useState([])
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
    axios.post('https://whispering-plateau-43837.herokuapp.com/createaccount', userObj).then((response) => {
      if(response.data.username){
        setToggleError(false)
        setErrorMessage('')
        setCurrentUser(response.data)
        setStudents(response.data)
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
    axios.put('https://whispering-plateau-43837.herokuapp.com/login', userObj).then((response) => {
      if(response.data.username){
        setToggleError(false)
        setErrorMessage('')
        setCurrentUser(response.data)
        setStudents(response.data)
        handleToggleLogout()
      } else {
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
//==================================================
// return the data on the page
//==================================================
  return (
    <div className={LoginCSS.App}>
      <div>
        {toggleLogout ?
          <Button onClick={handleLogout} className={LoginCSS.logoutBtn}  variant="danger" >Logout</Button> :
          <div className={LoginCSS.appFormDiv}>
            {toggleLogin ?
            //==================================================
              //login form
              <div className={LoginCSS.formContainer}>
                <h1 className={LoginCSS.formTitle}>Login</h1>
                <form onSubmit={handleLogin}  className={LoginCSS.inputForm} >
                  <input autoComplete="new-password" type='text' placeholder='username' className={LoginCSS.textInput} onChange={(event)=> {setUsername(event.target.value)}}/>
                  <input autoComplete="new-password" type='password' placeholder='password' className={LoginCSS.textInput} onChange={(event)=> {setPassword(event.target.value)}}/>
                  {toggleError ?
                    <h5 className={LoginCSS.errorMsg}>{errorMessage}</h5>
                    :
                    null
                  }
                  <input type='submit' value='Login' className={LoginCSS.submitBtn}/>
                </form>
              </div>
            :
            //==================================================
            // new user form. Not displayed currently because only want the admin to create users
            <div className={LoginCSS.App} >
              <h1 className={LoginCSS.formTitle}>Admin</h1>
              <form onSubmit={handleCreateUser} className={LoginCSS.inputForm}>
                <input autoComplete="new-password" type='text' placeholder='username' className={LoginCSS.textInput} onChange={(event)=> {setUsername(event.target.value)}}/>
                <input autoComplete="new-password" type='password' placeholder='password' className={LoginCSS.textInput} onChange={(event)=> {setPassword(event.target.value)}}/>
                {toggleError ?
                  <h5 className={LoginCSS.errorMsg}>{errorMessage}</h5>
                  :
                  null
                }
                <input type='submit' value='Register' className={LoginCSS.submitBtn}/>
              </form>
            </div>
            }
            <button onClick={handleToggleForm} className={LoginCSS.accountBtn}>{toggleLogin ? 'Admin' : 'Already have an account?'}</button>
          </div>
        }

        {/* login page determining the view permissions if an admin or not.  */}
      </div>
      {currentUser.username ? ( currentUser.admin === true? (<RUD students={students} setStudents={setStudents}/>) : (<Parents currentUser={currentUser}/>)) : (null)}
    </div>
  );
}
//==================================================
//export login
//==================================================
export default Login;