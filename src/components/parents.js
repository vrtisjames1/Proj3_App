import {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';  
import 'bootstrap/dist/js/bootstrap.js';
// import $ from 'jquery';
// import Popper from 'popper.js';
import {Card, Button} from 'react-bootstrap'; 
import IndexCSS from '../index.module.css';


// RUD - READ, UPDATE, DELETE 
const Parents = (props) => {
    // const[confirm, setConfirm] = useState(false);
    const [students, setStudents] = useState([]);

    const notifyTeacher = (students) =>{
      axios.put(`https://whispering-plateau-43837.herokuapp.com/${students._id}`,
      {
          username: students.username,
          // password: students.password,
          admin: students.admin,
          confirm: true,
          kid: students.kid,
          photo: students.photo,
          status: students.status
      }
  ).then((response) => { 
    axios.get(`https://whispering-plateau-43837.herokuapp.com/find/${students._id}`).then((response) => {
      setStudents(response.data);
      })
    })}

    useEffect(() => {
        axios.get(`https://whispering-plateau-43837.herokuapp.com/find/${props.currentUser._id}`).then((response) => {
          setStudents(response.data);
        })
      }, [])

    return (
        <>
            {students.map((students) => {
                    return (
                      <div key={students._id}>
                        <Card>
                          <Card.Header>{students.username}<br />
                          {
                            students.confirm === true? <p style={{color: "green"}}>I've Read The Updates: &#x2713;</p> : 
                            <div>
                              <p style={{color: "red"}}>Click confirm to notify teacher: &#10007;</p><br/>
                              <Button variant="success" onClick={() => {notifyTeacher(students)}}>Confirm</Button>
                            </div>
                          }
                          </Card.Header>
                          <img className={IndexCSS.photo}src={students.photo} /><br />
                          <Card.Body>
                          {students.status.slice(0).reverse().map((statusParam) => {
                                return (
                                    <div key={statusParam._id} className={IndexCSS.statusBox}>
                                        <Card.Title>{statusParam.header}: {statusParam.date}</Card.Title>
                                        <Card.Text>{statusParam.comments}</Card.Text>
                                    </div>
                                        )})}
                          </Card.Body>
                        </Card>
                        <p></p>
                      </div>
                            
            )})}
        </>
    )}

export default Parents;