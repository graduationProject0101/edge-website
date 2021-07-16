import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Aos from 'aos'
import jwt_decode from "jwt-decode";
import { Container, Carousel, Image, Row, Col, Card, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'


function WishList (props) {

    const [wishList, setwishList] = useState()

    useEffect(() => {

        Aos.init({
            offset: 100,
            duration: 1500,
            easing: 'ease'
        })

        const getWishList = async () => {
            try {
                const user = await jwt_decode(localStorage.getItem('token')).id

                const response = await Axios.get(`api/v1/favorite?owner=${user}`)
                console.log("🚀 ~ file: WishList.js ~ line 28 ~ getWishList ~ response", response)

                setwishList(response.data.data.items)
                console.log('Wish-List', wishList)
            }
            catch(e) {
                console.error(e.message)
            }
        }

        getWishList()
    }, [])

    return (
        <div>
            {wishList ? (
                <div>
                    <NavBar wish={true} />
                    <br />
                    <br />
                    <Container data-aos="zoom-in">
                        <h4 className="text-left text-muted"> 
                            {`${wishList.length} Results for`} &nbsp; <strong className="text-dark">"Wish List"</strong> 
                        </h4>
                        <br />
                        <br />
                        {wishList.map((item) => (
                            // <div key={item._id} id="filtered-item" >
                            //     <Image alt="item-pic" src={item.images[0]} style={{objectFit:'cover', height:'200px', verticalAlign:'text-top'}} />
                            //     <br />
                            //     <br />
                            //     <h5> {item.itemName} </h5>
                            //     <h4> {item.Price} </h4>
                            // </div>
                            <Link to={`/item/${item.itemId}`}>
                                <Card key={item._id} id="filtered-item" data-aos="zoom-in">
                                    <Card.Img src={item.images[0]} style={{objectFit:"cover", height:'300px', verticalAlign:'top', position:'relative'}} />
                                    <Card.Body>
                                        <Card.Text style={{height:'50px'}}>
                                            {item.itemName}
                                        </Card.Text>
                                        <Card.Title> {`${item.price} LE`} </Card.Title>
                                    </Card.Body>
                                </Card>
                            </Link>
                        ))}
                    </Container>
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

export default WishList;