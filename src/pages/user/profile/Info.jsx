import React, { useContext } from 'react'
import { UserContext } from '../../../context/user/UserContext'
import { Container } from 'react-bootstrap';

export default function Info() {
    const {user} = useContext(UserContext);
    
  return (
    <>
        <h1>Info</h1>
        <p>Username: {user.userName}</p>
        <p>Email: {user.email}</p>
        <p>Status: {user.status}</p>
    </>
  )
}
