import React from 'react'
import style from './homePage.module.css';
import { Button, Container } from 'react-bootstrap';
export default function Home() {
  return (
    <>
    <header className={`${style.header}`}>
      <Container>
        <h1>Headline that grabs people’s attention</h1>
        <Button variant="dark">Shop now</Button>
   
      </Container>
    </header>
    </>
 
  )
}
