import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import jwt_decode from "jwt-decode";
import { connect, useSelector } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { useHistory } from 'react-router-dom'
import { Container, Navbar, Nav, NavDropdown, Form, Button, Image , Row , Col, Spinner } from 'react-bootstrap'
import { BsColumns } from 'react-icons/bs'
import Footer from './Footer'
import NavBar from './NavBar'



 function Register (props){

  const [formData, setformData] = useState({name: "", email: "", password: ""})
  const [passwordConfirm, setpasswordConfirm] = useState("")

  let history = useHistory()
  let authedUser = useSelector(state => state.authedUser)
  console.log("🚀 ~ file: Register.js ~ line 21 ~ Register ~ authedUser", authedUser)

  const handleFormDataChange = (e) => {
    setformData({...formData, [e.target.name]: e.target.value})
  }

  const handleSignUpSubmit = async (e) => {
    try {
        e.preventDefault()
        document.getElementById("reg-spinner").style.display = "block";
        const loginData = await formData
        console.log("🚀 ~ file: signUp.js ~ line 16 ~ handleLoginSubmit ~ loginData", loginData)
        const response = await Axios.post("api/v1/users/signup", {
          name: loginData.name,
          email: loginData.email,
          password: loginData.password,
          passwordConfirm: passwordConfirm
      }, {
        headers: { "Content-Type": "application/json" }
      })
        console.log("🚀 ~ file: signUp.js ~ line 20 ~ handleLoginSubmit ~ response", response)
        console.log('token', response.data.token)
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userRole', response.data.role)
        const authedUserId = await jwt_decode(response.data.token).id
        console.log("🚀 ~ file: Register.js ~ line 36 ~ handleLoginSubmit ~ authedUserId", authedUserId)
        await props.setAuthedUser(authedUserId)
        console.log('getToken', localStorage.getItem('token'))
        setformData({email: "", password: ""})
        setpasswordConfirm("")

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

   return(
    
      <div>
          {/* <Image  
          src="https://www.electroniclibrarian.org/wp-content/uploads/2020/11/ERL21-Website-Icons-and-Images-300x200@2x.png"  />   */}
          <Form className="text-left" onSubmit={handleSignUpSubmit}>

          <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                name="name"
                value = {formData.name || ""}
                className="formInput" 
                onChange={handleFormDataChange}   
              />
          </Form.Group>

            <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                  type="email" 
                  name="email"
                  value = {formData.email || ""}
                  className="formInput" 
                  onChange={handleFormDataChange}   
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  name="password"
                  value = {formData.password || ""}
                  className="formInput" 
                  onChange={handleFormDataChange}  
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                  type="password" 
                  className="formInput"   
                  value={passwordConfirm || ""}
                  onChange={(e) => setpasswordConfirm(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
            <Form.Check type="checkbox" label="I accept the Privacy Statement" />
            </Form.Group>
            <Row>
              <Col md="11">
                <Button 
                  type="submit" 
                  className="signup-submit-btn" 
                  disabled={(formData.password !== passwordConfirm) || (formData.password === "") }>
                  Register
                </Button>
              </Col>
              <Col md="1">
                {!authedUser && 
                <Spinner 
                  animation="border" 
                  id="reg-spinner" 
                  className="mt-3" 
                  style={{display:"none"}} 
                />
                }
              </Col>
            </Row>
          </Form>
    </div>
    



   )


 }

 function mapDispatchToProps (dispatch) {
   return {
     setAuthedUser: (data) => dispatch(setAuthedUser(data))
   }
 }

 export default connect(null, mapDispatchToProps)(Register);