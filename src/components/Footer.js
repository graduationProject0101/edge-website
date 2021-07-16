import React, { useEffect } from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { IconContext } from "react-icons"
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import Facebook from '../img/facebook.svg'
import Twitter from '../img/twitter.svg'

function Footer() {

    return (
        <IconContext.Provider value={{style:{size: "2em", color: "whitesmoke", marginRight:"12px"}, className:"mr-n2"}}>
            <div id="footer">
                <br />
                <br />
                <div>
                    <Row xs="3" sm="3" md="3" className="text-left pl-5 ml-5">
                        <Col>
                            <h2>edge.</h2>
                            <br />
                            <p className="footer-text" style={{wordWrap:"normal"}}>156 E 2nd St, New York, NY 10009, United States</p>
                            <p className="footer-text">info@edge.com</p>
                            <p className="footer-text">+12174677800</p>
                            <Row>
                                <Col xs="1" md="1">
                                    <FaFacebook size="20px" /> 
                                </Col>
                                <Col xs="1" md="1">
                                    <FaInstagram size="20px" />
                                </Col>
                                <Col xs="1" md="1">
                                    <FaTwitter size="20px" /> 
                                </Col>
                                <Col xs="1" md="1">
                                    <FaYoutube size="20px" />
                                </Col>
                            </Row>
                        </Col>
                        <Row style={{marginLeft:"70px", marginTop:"30px"}}>
                            <Col className="mr-3">
                                <p className="footer-text">LIVING ROOM</p>
                                <p className="footer-text">BATHROOM</p>
                                <p className="footer-text">KITCHEN</p>
                                <p className="footer-text">BEDROOM</p>
                            </Col>
                            <Col>
                                <p className="footer-text">SHIPPING</p>
                                <p className="footer-text">PAYMENTS</p>
                                <p className="footer-text">PRIVACY POLICY</p>
                                <p className="footer-text">Q & A</p>
                            </Col>
                        </Row>
                    </Row>
                </div>
                <br />
                <br />
            </div>
        </IconContext.Provider>
    )
}

export default Footer;
