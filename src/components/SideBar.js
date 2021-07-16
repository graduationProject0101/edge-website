import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import { withRouter } from "react-router";
// import '../pages/style/Dashboard.css'

function SideBar () {
   

    return (
        <div>
            <Navbar bg="light" expand="lg" id="navbar">
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav 
                        id="side-bar"
                        className="col-md-12 d-none d-md-block bg-light sidebar"
                        activeKey="/home"
                        onSelect={selectedKey => alert(`selected ${selectedKey}`)}
                    >
                        <div className="sidebar-sticky navItem">Dashboard</div>
                        <Nav.Item className="navItem">
                            <Nav.Link href="/home">Active</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="navItem">
                            <Nav.Link eventKey="link-1">Link</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="navItem">
                            <Nav.Link eventKey="link-2">Link</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="navItem">
                            <Nav.Link eventKey="disabled" disabled>
                            Disabled
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
          
        </div>
        );
};

export default withRouter(SideBar);