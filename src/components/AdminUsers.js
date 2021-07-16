import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import Aos from 'aos'
import { useSelector, useDispatch } from 'react-redux'
import jwt_decode from "jwt-decode";
import { Container, Carousel, Image, Row, Col, Table, Form, Button, Spinner } from 'react-bootstrap'
import AdminNavber from './AdminNavbar'


function AdminUsers () {

    const [users, setUsers] = useState()

    useEffect(() => {

        Aos.init({
            duration: 1500,
            easing: 'ease'
        })

        const getAllUsers = async () => {
            const response = await Axios.get("api/v1/users")
            console.log("🚀 ~ file: AdminUsers.js ~ line 16 ~ getAllUsers ~ response", response)
            setUsers(response.data.data.users)
        }

        getAllUsers()
    }, [])

    return (
        <div>
            {users ? (
                <div style={{backgroundColor:'#f4f4f4'}}>
                    <AdminNavber />
                    <br />
                    <br />
                    <Container data-aos="fade">
                        <Table bordered hover className="adminTable">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr className="tableRow">
                                        <td>{index + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Container>
                    <br />
                    <br />
                </div>
            ) : (
                <Spinner animation="border" style={{marginTop:"400px"}} />
            ) }
        </div>
    )
}

export default AdminUsers;