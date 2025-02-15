import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import logo from "../../../../assets/BOTIGA.svg";
import style from "../mainStyle.module.css";
import { Col, Row } from 'react-bootstrap';


export default function CustomNavbar() {
    return (
        <Navbar expand="lg" className={`${style.nav} mw-100 p-3 fixed-top`}>
            <Container className='p-0'>
                <Row className='w-100 align-items-center'>

                    <Col className='d-flex justify-content-start'>
                        <Navbar.Brand as={Link} to={"/"}>
                            <img src={logo} alt="logo" className={`${style.imgWidth}`} />
                        </Navbar.Brand>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to={"/auth/register"}>Register</Nav.Link>
                            <Nav.Link as={Link} to={"/auth/login"}>Login</Nav.Link>

                        </Nav>
                    </Col>
                </Row>

            </Container>
        </Navbar>
    )
}




