import React from 'react' 
import { Link } from 'react-router-dom';
import '../mystyle.css';
import { Navbar,Nav  } from 'react-bootstrap';


const navbar = 
<Navbar bg="dark" variant="dark" id="navbar">
    <Navbar.Brand href="#home">Shop</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/"> Login Page</Nav.Link>
      {/* <Nav.Link href="/CCShopPage">Shop Page</Nav.Link> */}

    </Nav>
  </Navbar>
export default navbar;
