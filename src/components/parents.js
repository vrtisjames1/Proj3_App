import {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';  
import 'bootstrap/dist/js/bootstrap.js';
import {Card, Button} from 'react-bootstrap'; 
import IndexCSS from '../index.module.css';

// diplay parent views if not admin

const Parents = (props) => {
  //================================================== 
    const [students, setStudents] = useState([]);

    //==================================================
    // notifies the teacher and changes confirm statement to true
    //==================================================
    const notifyTeacher = (students) =>{
      axios.put(`https://whispering-plateau-43837.herokuapp.com/${students._id}`,
      {
          username: students.username,
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

    //===========================================
    //sets the intial state of the page
    //==================================================
    useEffect(() => {
        axios.get(`https://whispering-plateau-43837.herokuapp.com/find/${props.currentUser._id}`).then((response) => {
          setStudents(response.data);
        })
      }, [])

      //==================================================
      //displays the results on the page
      //==================================================
    return (
        <>
        {/* map through students */}
            {students.map((students) => {
                    return (
                      <div key={students._id} className={IndexCSS.parentDiv}>
                        <Card>
                          <Card.Header>{students.username}<br />
                          {/* notifies the teacher ternary statement to say the udpates where read and does PUT request to change status to true */}
                          {
                            students.confirm === true? <p style={{color: "green"}}>I've Read The Updates: &#x2713;</p> : 
                            <div>
                              <p className={IndexCSS.clickheader} style={{color: "red"}}>Click confirm to notify teacher: &#10007;</p><br/>
                              <Button className={IndexCSS.confirmbtn} variant="success" onClick={() => {notifyTeacher(students)}}><b>Confirm</b></Button>
                            </div>
                          }
                          </Card.Header>
                          <div className={IndexCSS.photodiv}>
                            <img className={IndexCSS.photo}src={students.photo} /><br />
                          </div>
                          
                          <Card.Body>
                            {/* displays comments for parent/username */}
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
//==================================================
// EXPORT TO login.js
//==================================================
export default Parents;