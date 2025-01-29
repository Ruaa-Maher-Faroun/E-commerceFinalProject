import React from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import logo from "../../../../assets/BOTIGA.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass,faUser } from '@fortawesome/free-solid-svg-icons';

export default function MainNavbar() {

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary w-100">
                <Container>
                <Navbar.Brand as={Link} to={"/"}>
                <img src={logo} alt="logo" />
                </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mx-auto">
                            <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
                            <Nav.Link as={Link} to={"/categories"}>Categories</Nav.Link>
                            <Nav.Link as={Link} to={"/products"}>products</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                        <Nav className="ms-auto">
                            <Button variant="link"><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>
                            <Nav.Link as={Link} to={"/auth/login"}><FontAwesomeIcon icon={faUser} /></Nav.Link>
                            <Nav.Link as={Link} to={"/cart"}><FontAwesomeIcon icon={ faCartShopping} /></Nav.Link>

                        </Nav>

                </Container>
            </Navbar>
        </>
    );
}

