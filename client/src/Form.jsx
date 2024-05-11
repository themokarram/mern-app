import React, { useEffect, useState } from 'react';
import './App.css'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function FormSample({setRefresh,isEdit,editData,setIsEdit,}) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [age, setAge] = useState("")

    console.log("name", name, age, email)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!isEdit){
            await axios.post("http://localhost:5000/createUser", { name, email, age })
                .then(response => {console.log("postResponse", response);
                setName('');
                setEmail('');
                setAge('');
                setRefresh(true)
                })
                .catch(err => console.log(err))
        }else{
            await axios.put(`http://localhost:5000/users/update/${editData._id}`, { name, email, age })
                .then(response => {console.log("putResponse", response);
                setName('');
                setEmail('');
                setAge('');
                setRefresh(true)
                setIsEdit(false);
                })
                .catch(err => console.log(err))
        }
    }
useEffect(()=>{
if(isEdit){
    setName(editData.name)
    setEmail(editData.email)
    setAge(editData.age)
}
},[isEdit])
console.log("iseditData",editData)
    return (
        <>
        <Form className='w-50 mx-auto mt-5' onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control value={name} type="name" placeholder="Enter name"  onChange={(e) => setName(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control value={email} type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Age</Form.Label>
        <Form.Control value={age} type="age" placeholder="Enter Age" onChange={(e) => setAge(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
        </>
    )
}

export default FormSample
