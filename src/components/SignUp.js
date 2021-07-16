import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import jwt_decode from "jwt-decode";
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Container, Navbar, Nav, NavDropdown, Form, Button, Image, Row, Col } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'
import Register from './Register'

function SignUp (props) {

    const [formData, setformData] = useState({email: "", password: ""})
    const [register, setregister] = useState(false)

    let history = useHistory()

    const handleFormDataChange = (e) => {
        setformData({...formData, [e.target.name]: e.target.value})
    }

    const handleLoginSubmit = async (e) => {
        try {
            e.preventDefault()
            const loginData = await formData
            console.log("🚀 ~ file: signUp.js ~ line 16 ~ handleLoginSubmit ~ loginData", loginData)
            // const config = await {
            //     headers: {
            //         Authentication: 'Bearer' + localStorage.getItem('token')
            //     }
            // }
            const response = await Axios.post("api/v1/users/login", loginData)
            console.log("🚀 ~ file: signUp.js ~ line 20 ~ handleLoginSubmit ~ response", response)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('userRole', response.data.role)
            const authedUserId = await jwt_decode(response.data.token).id
            await props.setAuthedUser(authedUserId)
            setformData({email: "", password: ""})

            if (response.data.role === 'user') {
                history.push('/')
            } else {
                history.push('/admin')
            }

            return loginData;
        }
        catch(e) {
            console.error(e.message)
        }
    }

    // const autoLogin = async () => {
    //     const userToken = await localStorage.getItem('token')
    //     if (!userToken) {
    //         return false
    //     }

    //     const currentTime = await Date.now() / 1000

    //     if (currentTime > jwt_decode(userToken).exp) {
    //         return false
    //     }

    //     const userId = await jwt_decode(userToken).id
    //     await props.setAuthedUser(userId)

    //     return true
    // }

    // const logout = () => {
    //     props.setAuthedUser(null)
    //     localStorage.clear()
    // }

    return (
        <div>
            {/* <Link to='/' style={{color: 'black', textDecoration:'none'}}>
                <h2 className="text-left ml-5 mt-3">edge.</h2>
            </Link> */}
            <NavBar wish={false} />
            <br />
            <br />
            <br />
            <Container>
                <Row>
                    <Col>
                        {register ? (<Image src="https://res.cloudinary.com/djtpiagbk/image/upload/v1626468089/register_ra0doi.png" />) : (
                            <Image src="https://res.cloudinary.com/djtpiagbk/image/upload/v1626468088/sign_up_kkit4d.png" />
                        )}
                    </Col>
                    <Col>
                        <Row>
                            <Col><Button className="signupBtns" onClick={() => setregister(false)} autoFocus>Sign in</Button></Col>
                            <Col><Button className="signupBtns" onClick={() => setregister(true)}>Register</Button></Col>
                        </Row>
                        <br />
                        <br />
                        {register ? (<Register />) : (
                            <Form className="text-left" onSubmit={handleLoginSubmit}>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        name="email"
                                        value = {formData.email}
                                        className="formInput" 
                                        onChange={handleFormDataChange} 
                                    />
                                </Form.Group>
                                <br />
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        name="password" 
                                        value = {formData.password}
                                        className="formInput" 
                                        onChange={handleFormDataChange} 
                                    />
                                </Form.Group>
                                <br />
                                <Button className="signup-submit-btn" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        )}
                    </Col>
                </Row>
            </Container>
            <br />
            <br />
            <br />
        </div>
    )
}

function mapDispatchToProps (dispatch) {
    return {
      setAuthedUser: (data) => dispatch(setAuthedUser(data))
    }
}

export default connect(null, mapDispatchToProps)(SignUp);