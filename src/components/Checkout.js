import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Axios from 'axios'
import Aos from 'aos'
import jwt_decode from "jwt-decode";
// import { usePaymentInputs } from 'react-payment-inputs'
import { Container, Carousel, Image, Row, Col, Table, Form, Button, Spinner } from 'react-bootstrap'
import { IoMdArrowRoundBack, IoIosHome } from 'react-icons/io'
import { FaCreditCard } from 'react-icons/fa'
import { GiMoneyStack } from 'react-icons/gi'


function Checkout () {

    const history = useHistory()
    const today = new Date()

    const cartItems = useSelector(state => state.cart)
    console.log("🚀 ~ file: Checkout.js ~ line 17 ~ Checkout ~ cartItems", Object.values(cartItems).length)
    let SubTotal = useSelector(state => state.totalPrice)
    const authedUser = useSelector(state => state.authedUser)

    const [paymentMethod, setpaymentMethod] = useState(false)
    const [orderCart, setorderCart] = useState(cartItems)
    const [subTotal, setsubTotal] = useState(SubTotal)

    useEffect(() => {

        window.scrollTo({
            top:'0',
            behavior: 'smooth'
        })

        Aos.init({
            duration: 1500,
            easing: 'ease'
        })

        const getOrderCart = async () => {
            if (Object.values(cartItems).length === 0) {
                try {
                    const user = await jwt_decode(localStorage.getItem('token')).id
                    const response = await Axios.get(`api/v1/cart/getcart?owner=${user}`)
                    console.log("🚀 ~ file: Checkout.js ~ line 26 ~ getOrderCart ~ response", response)
                    await setorderCart(response.data.data.items)
                    await setsubTotal(response.data.data.totalPrice)
                }
                catch(e) {
                    console.error(e.message)
                }
            }
        }

        getOrderCart()
    }, [])

    const placeOrder = async (e) => {
        try {
            e.preventDefault()
            const response = await Axios.post("api/v1/order/checkout", {
                owner: authedUser,
                orders: [
                    {
                        totalPrice: subTotal,
                        date: (today.getMonth()+1) + '-' + today.getDate() + '-' + today.getFullYear(),
                        order: orderCart
                    }
                ]
            })
            console.log("🚀 ~ file: Checkout.js ~ line 57 ~ placeOrder ~ response", response)
            history.push('/')
        }
        catch(e) {
            console.error(e.message)
        }
    }

    // const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps } = usePaymentInputs();

    return (
        <div>
            {orderCart && subTotal ? (
                <div>
                    <section style={{backgroundColor:'black', color:'white', height:'80px'}} data-aos="slide-down">
                        <IoMdArrowRoundBack 
                            size="33" 
                            className="d-inline-block float-left ml-5 mt-3" 
                            style={{cursor:'pointer'}}
                            onClick={() => history.push('/cart')}
                        />
                        <h3 className="d-inline-block float-left ml-4 mt-3">Cart</h3>
                        <h3 
                            className="d-inline-block float-right mr-5 mt-3"
                            style={{cursor:'pointer'}}
                            onClick={() => history.push('/')}
                        >edge.</h3>
                    </section>

                    <br />
                    <br />

                    <Container>
                        <Row>
                            <Col md="8" className="text-left">
                                <h2>Payment</h2>
                                <br />
                                <h3>PAYMENT METHOD</h3>
                                <Row>
                                    <Col>
                                        <Button className="paymentBtn float-left" onClick={() => setpaymentMethod(false)}>
                                            <h5>
                                                <FaCreditCard size="20" color="black" className="mr-2" />
                                                Pay with card
                                            </h5>
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button className="paymentBtn float-right" onClick={() => setpaymentMethod(true)}>
                                            <h5>
                                                <GiMoneyStack size="25" color="black" className="mr-2" />
                                                Pay with cash
                                            </h5>
                                        </Button>
                                    </Col>
                                </Row>
                                <br />
                                {!paymentMethod ? (
                                    <section>
                                        <Form onSubmit={placeOrder}>
                                            <section style={{padding:'15px', border:'1px solid black', backgroundColor:'whitesmoke'}}>
                                                <Form.Group>
                                                    <Form.Label>CARD NUMBER</Form.Label>
                                                    <Form.Control className="checkout-form" type="text" placeholder="**** **** **** ****" />
                                                </Form.Group>
                                                <Form.Group className="d-inline-block">
                                                    <Form.Label>EXPIRY DATE</Form.Label>
                                                    <Form.Control className="checkout-form" type="date" />
                                                </Form.Group>
                                                <Form.Group className="d-inline-block ml-4">
                                                    <Form.Label>CVV</Form.Label>
                                                    <Form.Control className="checkout-form" type="text" placeholder="Code" />
                                                </Form.Group>
                                            </section>
                                            <br />
                                            <h3>DELIVERY OPTIONS</h3>
                                            <Form.Group style={{padding:'15px'}}>
                                                <Row>
                                                    <Col md="1">
                                                        <Form.Check 
                                                            type="checkbox"
                                                            name="leaveAtMyDoor"
                                                            style={{zoom:'2'}}
                                                        />
                                                    </Col>
                                                    <Col md="10">
                                                        <section className="d-inline-block ml-n3">
                                                            <h5>
                                                                <IoIosHome size="30" />
                                                                Leave At My Door
                                                            </h5>
                                                            <p className="text-muted">Your delivery will be left at your door and a photo will be sent to you as confirmation. Valid on prepaid orders only.</p>
                                                        </section>
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                            <Button 
                                                type="submit" 
                                                className="placeorderBtn"
                                            >
                                                PLACE ORDER
                                            </Button>
                                        </Form>
                                    </section>
                                ) : (
                                    <Button 
                                        className="placeorderBtn mt-2"
                                        onClick={placeOrder}
                                    >
                                        PLACE ORDER
                                    </Button>
                                )
                                }
                                <br />
                                <br />
                                <h4>YOUR ORDER</h4>
                                <br />
                                {Object.values(orderCart).map((item) => (
                                    <div key={item.itemId} style={{padding:'15px'}} data-aos="fade">
                                        <Row>
                                            <Col md="2">
                                                <Image src={item.images} style={{height:'150px'}} />
                                            </Col>
                                            <Col md="7">
                                                <p className="text-muted">{item.seller}</p>
                                                <h5>{item.itemName}</h5>
                                                <p>Order now and get it by <span style={{color:'green'}}>Sun,Jun 27</span></p>
                                            </Col>
                                            <Col md="3">
                                                <h3>{`$${item.price}`}</h3>
                                                <h6 className="text-muted">{`QTY: ${item.qty}`}</h6>
                                            </Col>
                                        </Row>
                                    </div>
                                ))}
                                <br />
                                <br />
                            </Col>
                            <Col md="4" data-aos="slide-left">
                                <br />
                                <br />
                                <div className="text-left p-3" style={{border:'1px solid grey'}}>
                                    <h3>ORDER SUMMARY</h3>
                                    <br />
                                    <p className="text-muted"><span>Subtotal</span><span className="float-right">${subTotal.toFixed(2)}</span></p>
                                    <p className="text-muted"><span>Shipping Fee</span><span className="float-right">$0</span></p>
                                    <p className="text-muted"><span>COD Fee</span><span className="float-right">$0</span></p>
                                    <hr />
                                    <p><span style={{fontSize:'12px',color:'grey'}}><strong style={{fontSize:'18px', color:'black'}}>Total</strong>   (Estimated VAT included)</span> <span className="float-right">{`$${subTotal.toFixed(2)}`}</span></p>
                                    <p className="text-muted"><span>Estimated VAT</span><span className="float-right">{`$${(0.14 * subTotal).toFixed(2)}`}</span></p>
                                    <section style={{backgroundColor:'whitesmoke', color:'grey', height:'5vh', padding:'5px', marginBottom:'15px', width:'calc(100% + 32px)', marginLeft:'-16px'}}>
                                        <h5 className="ml-2">SHIP TO</h5>
                                    </section>
                                    <h6>Zezo Noaman</h6>
                                    <h6>Tanta Qism 2 - Gharbia - Egypt</h6>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            ) : (
                <Spinner animation="border" style={{marginTop:"400px"}} />
            ) }
                
        </div>
    )
}

export default Checkout;