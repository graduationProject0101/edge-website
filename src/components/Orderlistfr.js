import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Aos from 'aos'
import jwt_decode from "jwt-decode";
import { Container, Carousel, Image, Row, Col, Card , Button , Form, Spinner } from 'react-bootstrap'
import NavBar from './NavBar'
import Footer from './Footer'
import Item from './Item'
import { withRouter } from 'react-router-dom'
import { IoMdArrowRoundBack, IoShirtSharp } from 'react-icons/io'
import {FaClipboardList} from "react-icons/fa"
import {FaTshirt} from "react-icons/fa"




function Orders(props) {

    const [userOrders, setuserOrders] = useState()
    
    useEffect(() => {

        Aos.init({
            duration: 1500,
            easing: 'ease'
        })

        const getUserOrders = async () => {
            try {
                const user = await jwt_decode(localStorage.getItem('token')).id
                const response = await Axios.get(`api/v1/order/getorder?owner=${user}`)
                console.log("🚀 ~ file: Orderlistfr.js ~ line 22 ~ getUserOrders ~ response", response)
                setuserOrders(response.data.data[0].orders)
                console.log('user-orders', userOrders)
            }
            catch(e) {
                console.error(e.message)
            }
        }
        getUserOrders()
    }, [])

    return (
        <div>
            {userOrders ? (
                <div>
                    <NavBar wish={false}/>
                    <br />
                    <Container data-aos="fade">
                    <h1 style={{fontWeight:"bold", textAlign:'left'}}>
                        Orders
                        <FaClipboardList size="35" className="ml-2 mt-n2" />
                    </h1>
                    <br />


                    {userOrders.map((order) => (
                        <div key={order.totalPrice}>
                            <div style={{ borderRadius:"0.5 rem" , mb:"1", boxShadow:'0px 2px 10px grey'}}>
                                <Card  style={{ width: '100%',textAlign:'left' }}>
                                    <Card.Header>
                                    <h5>
                                        ORDER {order.orderID}
                                        <FaTshirt size="25" className="ml-2 mt-n2 " />
                                    </h5>
                                    <span className="text-muted ml-2">
                                        {`Placed on ${order.date}`}
                                    </span>
                                    </Card.Header>
                                    <Card.Body>
                                        {order.order.map((item) => (
                                            <div key={item._id} className="d-inline-block mb-4 mr-1">
                                                <Image style={{height:"150px", display:'inline-block'}}
                                                    src={item.images}
                                                />
                                                <p style={{width:"200px", wordWrap:'break-word',display:'inline-block',marginLeft:"10px"}}>
                                                    {item.itemName}
                                                </p>
                                            </div>
                                        ))}
                                    </Card.Body>
                                </Card>
                            </div>
                            <br />
                            <br />
                        </div>
                    ))}
                    
                </Container>
                <br />
                <br />
                <br />
                <Footer />
                </div>
                ) : (
                    <Spinner animation="border" style={{marginTop:"400px"}} />
                )}
           </div>

    )
}

export default withRouter(Orders);

