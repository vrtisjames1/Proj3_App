import {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';  
import {Form} from 'react-bootstrap';  

// import css
import IndexCSS from '../index.module.css';


const Create = (props) => {
    const [newParent, setNewParent] = useState('');
    const [newKid, setKid] = useState('');
    const [newPhoto, setNewPhoto] = useState('');
    const [newStatus, setNewStatus] = useState([]);
    const [students, setStudents] = useState([]);
    const[showCreate, setShowCreate] = useState(false);
    

    const handleNewParentChange = (event)=>{
        setNewParent(event.target.value);
      };

      const handleNewKidChange = (event)=>{
        setKid(event.target.value);
      };

      const handleNewPhotoChange = (event)=>{
        setNewPhoto(event.target.value);
      };

      const changeShow = () =>{
        setShowCreate(true);
      }

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
                    props.setStudents(response.data);
                    setNewParent('');
                    setKid('');
                    setNewPhoto('');
                    setShowCreate(false);
                    console.log(response.data);
                })
            })
        };

    return (
        <div>
            {
                showCreate === true?
                                    <form onSubmit={ (event)=>{ handleNewKidFormSubmit(event, props.students)}} >
                                    <input type="text" placeholder="Parent" onChange={handleNewParentChange}/><br/>
                                    <input type="text" placeholder="Kid" onChange={handleNewKidChange}/><br/>
                                    <input type="text" placeholder="Photo" onChange={handleNewPhotoChange}/><br/>
                                    <input type="submit" value="Submit"/>
                                    </form> 
                                : <button onClick={changeShow}>Add A Profile</button>
                                
                                
            }

        </div>
        )
    };
    
    export default Create