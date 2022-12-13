import {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';  
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import Popper from 'popper.js';
import {DropdownButton, Dropdown, Form, Card, Button} from 'react-bootstrap'; 
import IndexCSS from '../index.module.css';


// RUD - READ, UPDATE, DELETE 
const Parents = (props) => {
    const[confirm, setConfirm] = useState(false);
    const [students, setStudents] = useState([]);


    useEffect(() => {
        axios.get(`https://whispering-plateau-43837.herokuapp.com/find/${props.currentUser._id}`).then((response) => {
          // props.setCurrentUser(response.data);
          setStudents(response.data);
        })
      }, [])

    return (
        <>
            {students.map((students) => {
                    return (
                      <div key={students._id}>
                        <p>{students.username} hello</p>
                      </div>
                            
            )})}
        </>
    )

}

export default Parents;