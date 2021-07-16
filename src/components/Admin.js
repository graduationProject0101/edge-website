import React, {useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import Aos from 'aos'
import SideBar from './SideBar'
import AdminNavbar from './AdminNavbar'
import { Dropdown, Badge, Button, Form, Row, Col, Container } from "react-bootstrap";


function Admin () {

    const history = useHistory()

    useEffect(() => {
        Aos.init({
            duration: 1500,
            easing: 'ease'
        })
    }, [])

    return (
        <div style={{backgroundColor:'#f4f4f4'}}>
            <AdminNavbar />
            <br />
            <br />
            <Container>
                <Row>
                    <Col>
                        <div 
                            className="adminMinBlock" 
                            onClick={() => history.push('/admin/users')} 
                            style={{backgroundImage: 'url("https://images8.alphacoders.com/809/809459.jpg")'}}
                            data-aos="fade-right"
                        >
                            MANAGE USERS
                        </div>
                    </Col>
                    <Col>
                        <div 
                            className="adminMinBlock" 
                            onClick={() => history.push('/admin/products')} 
                            style={{backgroundImage: 'url("https://images3.alphacoders.com/809/809460.jpg")'}}
                            data-aos="fade-left"
                        >
                            MANAGE PRODUCTS
                        </div>
                    </Col>
                </Row>
                <br />
                <div 
                    className="adminMinBlock" 
                    onClick={() => history.push('/admin/orders')} 
                    style={{backgroundImage: 'url("https://cdn.pixabay.com/photo/2017/07/08/09/49/gradient-2483939_960_720.jpg")'}}
                    data-aos="fade-up"
                >
                    MANAGE ORDERS
                </div>
            </Container>
            <br />
            <br />
            <br />
        </div>
    )
}

export default Admin;