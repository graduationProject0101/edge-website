import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import jwt_decode from "jwt-decode";
import Aos from 'aos'
import { Container, Carousel, Image, Row, Col, Card, Spinner, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'

function Profile () {

    const [userData, setuserData] = useState({
        name: '',
        email: ''
    })

    useEffect(() => {
        Aos.init({
            duration: 1500,
            easing: 'ease'
        })
        
        const getUserData = async () => {
            try {
                const user = await jwt_decode(localStorage.getItem('token')).id
                console.log("🚀 ~ file: Profile.js ~ line 23 ~ getUserData ~ user", user)
                const response = Axios.get(`api/v1/users/getuser?_id=${user}`)
                console.log("🚀 ~ file: Profile.js ~ line 24 ~ getUserData ~ response", response)
                const data = await response.then(res => res.data.data[0])
                console.log("🚀 ~ file: Profile.js ~ line 27 ~ getUserData ~ data", data)
                setuserData({
                    name: data.name,
                    email: data.email
                })
            }
            catch(e) {
                console.error(e.message)
            }
        }

        getUserData()
    }, [])

    return (
        <div>
            <NavBar wish={false} />
            <br />
            <br />
            <Container className="text-left" data-aos="fade-up">
                <h3>Profile</h3>
                <h6 className="text-muted">Manage your profile details</h6>
                <br />
                <div className="profileBox">
                    <h4 className="profileHeader">General Information</h4>
                    <Form className="profileForm">
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={userData.name}
                                className="formInput" 
                                onChange={(e) => setuserData({...userData, name: e.target.value})}
                            />    
                        </Form.Group>
                        <Button 
                            variant="outline-dark" 
                            type="submit" 
                            className="profileBtn"
                        >SAVE</Button>
                    </Form>
                </div>
                <br />
                <br />
                <div className="profileBox" style={{height:'280px'}}>
                    <h4 className="profileHeader">Security</h4>
                    <Form className="profileForm">
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control 
                                        disabled
                                        type="text" 
                                        value={userData.email}
                                        className="formInput" 
                                        onChange={(e) => setuserData({...userData, email: e.target.value })}
                                    />    
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                        disabled
                                        type="text" 
                                        value="********"
                                        className="formInput" 
                                        // onChange={(e) => setuserData(e.target.value)}
                                    />    
                                </Form.Group>
                            </Col>
                        </Row>
                
                        <Button 
                            variant="outline-dark" 
                            type="submit" 
                            className="profileBtn"
                            style={{height:'80px', width:'180px', letterSpacing:'2px'}}
                        >CHANGE PASSWORD</Button>
                    </Form>
                </div>
            </Container>
            <br />
            <br />
            <br />
            <br />
            <Footer />
        </div>
    )
}

export default Profile;