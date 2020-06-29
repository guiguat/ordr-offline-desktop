import React, {  useState, FormEvent } from 'react';
import NavBar from '../../Components/NavBar';
import { FiEdit, FiUserPlus, FiUserX } from 'react-icons/fi';
import Container from '../../Components/Container';
import Col from '../../Components/Col';

import './Users.scss';
import { useAuth } from '../../Contexts/Auth';
import { useForms } from '../../Contexts/Forms';


const Users: React.FC = () => {
const {currentUser, SignUp, DeleteUser, UpdateUser} = useAuth();
const {btnClicked, setBtnClicked} = useForms();
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [newName, setNewName] = useState("");
const [newEmail, setNewEmail] = useState("");
const [newPwd, setNewPwd] = useState("");
const [formType, setFormType] = useState("");

function handleNewUser(event:FormEvent){
    event.preventDefault();
    const data = {
    email,
    password,
    name
    }
    SignUp(data);
    clear();
}

function handleDelete(){
    DeleteUser(email, password);
    clear();
}

function handleUpdate(){
    const data={
    email,
    password,
    newName: newName===""?null:newName,
    newEmail: newEmail===""?null:newEmail,
    newPassword: newPwd===""?null:newPwd
    }
    UpdateUser(data);
    clear();
}

function handleManage(event:any){
    event.preventDefault();
    if(formType==="up") handleUpdate();
    if(formType==="del") handleDelete();
}

function clear(){
    setEmail("");
    setPassword("");
    setNewName("");
    setNewPwd("");
    setNewEmail("");
    setBtnClicked("");
}

if(btnClicked==="new_user") return (
    <div className="container-fluid mx-auto position-absolute p-0 h-100" id="ContainerNewUser">
        <form onSubmit={handleNewUser} className="container bg-light p-4 rounded-lg mt-5">
            <div className="row">
                <div className="col col-md-6">
                <h2 className="text-dark font-weight-bold mb-3">New User</h2>
                </div>
                <div className="col col-md-6">
                <button type="button" onClick={clear} className="close mb-4" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input type="text" value={name} required onChange={event=>setName(event.target.value)}
                className="form-control" id="name"
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email address *</label>
                <input type="email" value={email} required onChange={event=>setEmail(event.target.value)} 
                className="form-control" id="email"
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password *</label>
                <input type="password" value={password} required onChange={event=>setPassword(event.target.value)}
                className="form-control" id="password"
                />
            </div>
            <button type="submit" className="btn btn-primary">
                <FiUserPlus className="mr-2"/>
                Create user
            </button>
        </form>
    </div>
)

if(btnClicked==="man_user") return (
    <div className="container-fluid mx-auto position-absolute p-0 h-100" id="ContainerNewUser">
        <form onSubmit={handleManage} className="container bg-light p-4 rounded-lg mt-5">
            <div className="row">
                <div className="col col-md-6">
                <h2 className="text-dark font-weight-bold mb-3">Manage User</h2>
                </div>
                <div className="col col-md-6">
                <button type="button" onClick={clear} className="close mb-4" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email address *</label>
                <input type="email" value={email} required onChange={event=>setEmail(event.target.value)} 
                className="form-control" id="email"
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password *</label>
                <input type="password" value={password} required onChange={event=>setPassword(event.target.value)}
                className="form-control" id="password"
                />
            </div>
            <div className="form-group">
                <label htmlFor="newName">New name <span className="text-warning">(optional)</span></label>
                <input type="text" value={newName} onChange={event=>setNewName(event.target.value)}
                className="form-control" id="newName"
                />
            </div>
            <div className="form-group">
                <label htmlFor="newEmail">New Email <span className="text-warning">(optional)</span></label>
                <input type="email" value={newEmail} onChange={event=>setNewEmail(event.target.value)}
                className="form-control" id="newEmail"
                />
            </div>
            <div className="form-group">
                <label htmlFor="newPwd">New Password <span className="text-warning">(optional)</span></label>
                <input type="password" value={newPwd} onChange={event=>setNewPwd(event.target.value)}
                className="form-control" id="newPwd"
                />
            </div>
            <button onClick={()=>setFormType("up")} type="submit" className="btn btn-warning mr-3">
                <FiEdit className="mr-2"/>
                Update
            </button>
            <button onClick={()=>setFormType("del")} type="submit" className="btn btn-danger">
                <FiUserX className="mr-2"/>
                Delete
            </button>
        </form>
    </div>
)

return (
    <Container>
        <Col type="nav">
            <NavBar primary="user"/>
        </Col>
        <Col>

            <h1>Users</h1>
            <div className="container bg-light rounded-lg p-5 mt-5">
                <h2 className="text-dark font-weight-bold mb-3">Current User</h2>
                <h3 className="text-dark">Name: {currentUser?.displayName}</h3>
                <h3 className="text-dark">Email: {currentUser?.email}</h3>
                <button className="btn btn-primary w-100 mt-5" onClick={()=>setBtnClicked("new_user")}>
                    <FiUserPlus className="mr-3" />
                    Register New
                </button>
                <button className="btn btn-warning w-100 mt-3" onClick={()=>setBtnClicked("man_user")}>
                    <FiEdit className="mr-3"/>
                    Manage Users
                </button>
            </div>

        </Col>
    </Container>
);
}

export default Users;