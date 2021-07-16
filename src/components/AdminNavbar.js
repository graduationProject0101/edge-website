import React, { useState, useEffect } from 'react'
import { Switch, Route, Link, Redirect, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { Container, Navbar, Nav, NavDropdown, Form, Button, Image, Dropdown, Spinner } from 'react-bootstrap'
import Aos from 'aos'
import { setAuthedUser } from '../actions/authedUser'

function AdminNavbar (props) {

    const history = useHistory()
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(setAuthedUser(null))
        localStorage.clear()
        history.push('/signup')
    }

    return (
        <div>
            <Navbar bg="light" expand="lg" id="admin-navbar" data-aos="fade-down">
                <Navbar.Brand as={Link} to="/admin" className="ml-4 text-bold" style={{fontSize:"35px", color:'white'}} data-aos="zoom-in" data-aos-delay="900">edge.</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto" style={{marginLeft:'200px', letterSpacing:'2px', fontSize:'20px'}}>
                        <Nav.Link as={Link} to="/admin" className="navText admin-navtext">DASHBOARD</Nav.Link>
                        <Nav.Link as={Link} to="/admin/users" className="navText admin-navtext">USERS</Nav.Link>
                        <Nav.Link as={Link} to="/admin/products" className="navText admin-navtext">PRODUCTS</Nav.Link>
                        <Nav.Link as={Link} to="/admin/orders" className="navText admin-navtext">ORDERS</Nav.Link>
                        <Nav.Link className="navText admin-navtext" onClick={logout}>LOGOUT</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default AdminNavbar;