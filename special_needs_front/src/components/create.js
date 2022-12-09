import {useState} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';  
// import {Card, CardGroup} from 'react-bootstrap';  

// import css
import IndexCSS from '../index.module.css';


const Create = (props) => {
    const [newParent, setNewParent] = useState('');
    const [newKid, setKid] = useState('');
    const [newPhoto, setNewPhoto] = useState('');
    const [newStatus, setNewStatus] = useState([]);
    const [students, setStudents] = useState([]);

    const handleNewParentChange = (event)=>{
        setNewParent(event.target.value);
      };

      const handleNewKidChange = (event)=>{
        setKid(event.target.value);
      };

      const handleNewPhotoChange = (event)=>{
        setNewPhoto(event.target.value);
      };

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
                    console.log(response.data);
                })
            })
        };

    return (
        <div>
                <form onSubmit={ (event)=>{ handleNewKidFormSubmit(event, students)}} >
                  <input type="text" placeholder="Parent" onChange={handleNewParentChange}/><br/>
                  <input type="text" placeholder="Kid" onChange={handleNewKidChange}/><br/>
                  <input type="text" placeholder="Photo" onChange={handleNewPhotoChange}/><br/>
                  <input type="submit" value="Create New Listing"/>
                </form>
        </div>
        )
    };
    
    export default Create