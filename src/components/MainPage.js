import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { Container, Carousel, Image, Row, Col, Card, Spinner } from 'react-bootstrap'
import Aos from 'aos'
import jwt_decode from "jwt-decode";
import NavBar from './NavBar'
import Item from './Item'
// import Footer from './Footer'
import Footer from './Footer'
import SubCategory from './SubCategory'
import axios from 'axios'
import { IoIosArrowUp } from 'react-icons/io'
// import Banner_1 from '../img/banner1.jpg'
// import Banner_2 from '../img/banner2.PNG'
// import Banner_3 from '../img/banner3.PNG'

let Items = [1, 2, 3, 4, 5]

function MainPage(props) {

    const [menItems, setmenItems] = useState([])
    const [womenItems, setwomenItems] = useState([])

    useEffect(() => {

        Aos.init({
            duration: 1500,
            easing: 'ease'
        })


        const ScrollToUpButton = () => {
            let span = document.querySelector(".up")
            console.log("🚀 ~ file: MainPage.js ~ line 59 ~ MainPage ~ span", span)
            if (window.scrollY >= 1700 && span) {
                span.classList.add("show")
            } else if (window.scrollY < 1700 && span) {
                span.classList.remove("show")
            }
        }

        window.addEventListener('scroll', ScrollToUpButton);


        const fetchItems = async () => {
        //   const items = await props.handleInitialData()
        //   setitems(items.allItems)
        //   console.log('items fetched', items)
        //   return {items}

        try {
            const user = await jwt_decode(localStorage.getItem('token')).id
            const response =  await axios.post("api/v1/akin", {
                owner: user,
                samples: "10"
            })
            console.log("🚀 ~ file: MainPage.js ~ line 59 ~ fetchItems ~ response", response)
            const recommendations = await response.data.recommendations
            setmenItems(recommendations.slice(0, 5))
            setwomenItems(recommendations.slice(5, 10))

            // if (recommendations.length) {
            //     setmenItems(recommendations.slice(0, 5))
            //     setwomenItems(recommendations.slice(5, 10))
            // } else {
            //     const menResponse = await axios.get(`api/v1/items/paginate?Category=Men&page=${Math.floor(Math.random() * (10 - 1 + 1)) + 1}&limit=5`)
            //     console.log("🚀 ~ file: MainPage.js ~ line 74 ~ fetchItems ~ menResponse", menResponse)
            //     setmenItems(menResponse.data.data.paginatedItems)
            //     const womenResponse = await axios.get(`api/v1/items/paginate?Category=Women&page=${Math.floor(Math.random() * (7 - 1 + 1)) + 1}&limit=5`)
            //     console.log("🚀 ~ file: MainPage.js ~ line 77 ~ fetchItems ~ womenResponse", womenResponse)
            //     setwomenItems(womenResponse.data.data.paginatedItems)
            // }


            // const menResponse = await axios.get(`api/v1/items/paginate?Category=Men&page=${Math.floor(Math.random() * (10 - 1 + 1)) + 1}&limit=5`)
            // console.log("🚀 ~ file: MainPage.js ~ line 39 ~ fetchItems ~ menResponse", menResponse)
            // setmenItems(menResponse.data.data.paginatedItems)
            // const womenResponse = await axios.get(`api/v1/items/paginate?Category=Women&page=${Math.floor(Math.random() * (7 - 1 + 1)) + 1}&limit=5`)
            // console.log("🚀 ~ file: MainPage.js ~ line 41 ~ fetchItems ~ womenResponse", womenResponse)
            // setwomenItems(womenResponse.data.data.paginatedItems)
        }
        catch(e) {
            console.error(e.message)
        }

        }
    
        fetchItems()

        return () => {
            window.removeEventListener('scroll', ScrollToUpButton)
        }
    },[])

    


    // console.log('items Main Page', items)

    // let MenItems = items.filter(item => item.Category === "Men")
    // console.log("🚀 ~ file: MainPage.js ~ line 44 ~ MainPage ~ MenItems", MenItems)
    // let WomenItems = items.filter(item => item.Category === "Women")
    // console.log("🚀 ~ file: MainPage.js ~ line 46 ~ MainPage ~ WomenItems", WomenItems)

    return (
        <div>
            {menItems.length && womenItems.length ? (
                <div>
                    <NavBar wish={false} data-aos='fade-up'/>
                    <Container fluid data-aos='zoom-in' className="w-75">
                        <Carousel className="mt-3">
                            <Carousel.Item>
                                <Image style={{height:"650px"}}
                                    className="d-block w-100"
                                    src="https://res.cloudinary.com/djtpiagbk/image/upload/v1622331736/Canvas/White_Simple_We_Are_Open_Instagram_Post_aqgcur.png"
                                    alt="First slide"
                                />

                            </Carousel.Item>
                            <Carousel.Item >
                                <Image style={{height:"650px"}}
                                    className="d-block w-100"
                                    src="https://res.cloudinary.com/djtpiagbk/image/upload/v1622332517/Canvas/New_Collection_Instagram_Post_1_sqfaat.png"
                                    alt="Second slide"
                                />

                            </Carousel.Item>
                            <Carousel.Item>
                                <Image style={{height:"650px"}}
                                    className="d-block w-100"
                                    src="https://res.cloudinary.com/djtpiagbk/image/upload/v1622332415/Canvas/logo_1_sedqvu.gif"
                                    alt="Third slide"
                                />

                            </Carousel.Item>
                            <Carousel.Item>
                                <Image style={{height:"650px"}}
                                    className="d-block w-100"
                                    src="https://res.cloudinary.com/djtpiagbk/image/upload/v1622333549/Canvas/Copy_of_Shop_New_Arrivals_Collage_Instagram_Post_kjbci5.png"
                                    alt="Third slide"
                                />

                            </Carousel.Item>
                            <Carousel.Item>
                                <Image style={{height:"650px"}}
                                    className="d-block w-100"
                                    src="https://res.cloudinary.com/djtpiagbk/image/upload/v1622331707/Canvas/Orange_and_Green_Geometric_Apparel_Store_Flyer_vhw2cm.png"
                                    alt="Third slide"
                                />

                            </Carousel.Item>
                        </Carousel>
                    </Container>

                    <br />
                    <br />
                    <h3 style={{fontWeight:"bold"}}>CATEGORIES</h3>
                    <br />

                    <Container className="text-center" >
                        <Row className="text-left">

                            <Col md="6" className="mr-n3">
                                <Link to='/category/T-Shirt'>
                                    <Card className="bg-white text-dark p-2" style={{height:'320px'}} data-aos='fade-right'>
                                        <Card.Img  style={{objectFit:"cover"}}
                                        
                                        src="https://res.cloudinary.com/djtpiagbk/image/upload/v1624209297/Men/Summer/19/4241932250_2_3_8_uhogxg.jpg" alt="Card image"/>
                                        <Card.ImgOverlay>
                                            <Card.Title>T-SHIRT</Card.Title>
                                            <Card.Text style={{textDecoration:"underline"}}>
                                                SHOP NOW
                                            </Card.Text>
                                        
                                        </Card.ImgOverlay>
                                    </Card>
                                </Link>


                                <Link to='/category/Pants'>
                                    <Card className="bg-white text-dark p-2" style={{height:'270px'}} data-aos='fade-up'>
                                        <Card.Img style={{objectFit:"cover"}}
                                        src="https://res.cloudinary.com/djtpiagbk/image/upload/v1618873404/Women/Straight%20Jean%20Trousers/Screenshot_647_gqwewr.png" alt="Card image"/>
                                        <Card.ImgOverlay>
                                            <Card.Title>PANTS</Card.Title>
                                            <Card.Text style={{textDecoration:"underline"}}>
                                            SHOP NOW
                                            </Card.Text>
                                        
                                        </Card.ImgOverlay>
                                    </Card>
                                </Link>
                            </Col>



                            <Col md="6" className="ml-n3">
                                <Link to='/category/Shirt'>
                                    <Card className="bg-white text-dark p-2" style={{height:'270px'}} data-aos='fade-left'>
                                        <Card.Img  style={{objectFit:"cover"}}
                                        src="https://res.cloudinary.com/djtpiagbk/image/upload/v1624209420/Men/Summer/23/4470513401_2_1_8_owrmmi.webp" alt="Card image"/>
                                        <Card.ImgOverlay>
                                            <Card.Title>SHIRTS</Card.Title>
                                            <Card.Text style={{textDecoration:"underline"}} >
                                            SHOP NOW
                                            </Card.Text>
                                        
                                        </Card.ImgOverlay>
                                    </Card>
                                </Link>


                                <Link to='/category/Jeans'>
                                    <Card className="bg-white text-dark p-2" style={{height:'320px'}} data-aos='fade-up'>
                                        <Card.Img  style={{objectFit:"cover"}}
                                        src="https://res.cloudinary.com/djtpiagbk/image/upload/v1624209179/Men/Summer/24/4685511407_2_3_8_od7lsp.webp" alt="Card image"/>
                                        <Card.ImgOverlay>
                                            <Card.Title>JEANS</Card.Title>
                                            <Card.Text style={{textDecoration:"underline"}} >
                                            SHOP NOW
                                            </Card.Text>
                                        
                                        </Card.ImgOverlay>
                                    </Card>
                                    {/* <div style={{height:"45%"}}>
                                        <Image src="https://res.cloudinary.com/trunk-club/image/upload/f_auto,q_auto,w_1280/v1560201871/Blog/19034_JuneTrendReport_Blog_Header_TCM_01.jpg" className="w-100 p-1 pl-2 h-100" style={{zIndex:'1'}}   />
                                        <div style={{color:"black", position:'relative', zIndex:'2', display:'flex', alignItems:'flex-start' }}>
                                            <h1>Men</h1>
                                        </div>
                                    </div> */}
                                </Link>
                            </Col>
                        </Row>
                    </Container>

                    <br />
                    <br />
                    <br />
                    <br />

                    <Container fluid data-aos="flip-down">
                        <h4 className="text-center">RECOMMENDED FOR YOU</h4>
                        <br />
                        <br />
                        <div>
                            <Row className="ml-2 mr-2">
                                {menItems.map((item) => {
                                    return (
                                        <Col key={item._id} className="ml-3"> 
                                            <Link to={`/item/${item._id}`} style={{color:"inherit", textDecoration:"none", cursor:"pointer"}}>
                                                <Item itemName={item.itemName} price={item.Price} image={item.images[0]} style={{width:'200px', height:'300px', objectFit:'cover'}} />
                                            </Link>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </div>
                    </Container>

                    <br />
                    <br />
                    <br />

                    <Container fluid data-aos="flip-up">
                        <h4 className="text-center">ALSO RECOMMENDED</h4>
                        <br />
                        <br />
                        <div>
                            <Row className="ml-2 mr-2">
                                {womenItems.map((item) => {
                                    return (
                                        <Col key={item._id} className="ml-3"> 
                                            <Link to={`/item/${item._id}`} style={{color:"inherit", textDecoration:"none", cursor:"pointer"}}>
                                                <Item itemName={item.itemName} price={item.Price} image={item.images[0]} style={{width:'200px', height:'300px', objectFit:'cover'}} />
                                            </Link>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </div>
                    </Container>
                    
                    <br />
                    <br />

                    {/* <Container className="text-center h-75">
                        <Row className="text-left">
                            <Col md="6" className="mr-n3">
                                <Link>
                                    <div style={{height:"100%"}} >
                                        <Image src='https://res.cloudinary.com/djtpiagbk/image/upload/v1618873404/Women/Straight%20Jean%20Trousers/Screenshot_647_gqwewr.png' className="w-100 p-2 h-100" style={{zIndex:'1', objectFit:'cover'}}/>
                                    </div>
                                </Link>
                                        
                                </Col>
                                <Col md="6" className="ml-n3">
                                <Link>
                                    <div style={{height:"100%"}}>
                                        <Image src='https://res.cloudinary.com/djtpiagbk/image/upload/v1618873404/Women/Straight%20Jean%20Trousers/Screenshot_647_gqwewr.png' className="w-100 p-2 h-100" style={{zIndex:'1', objectFit:'cover'}}/>
                                    </div>
                                </Link>
                                        
                            </Col>
                        </Row>
                    </Container>   */}

                    <br />
                    <br />

                    <Container className="text-center">
                        <Row className="text-left">
                            <Col md="7" className="mr-n3">
                                <Link to='/category/Tie-Dye'>
                                   <Card className="bg-white text-dark p-2" style={{height:'320px'}} data-aos="fade-right">
                                    <Card.Img  style={{objectFit:"cover"}}
                                    
                                    src="https://res.cloudinary.com/djtpiagbk/image/upload/v1624209091/Men/Summer/13/8240526400_2_3_8_bnd5rc.webp" alt="Card image"/>
                                    <Card.ImgOverlay>
                                        <Card.Title >
                                            TERNDS <br/>

                                              
                                             <h3 className="mt-2"> TIE DYE  </h3>
                                        </Card.Title>
                                        <Card.Text style={{textDecoration:"underline", fontSize:'18px'}}>
                                         SEE NOW
                                        </Card.Text>
                                    
                                    </Card.ImgOverlay>
                                    </Card>
                                </Link>
                                        
                                </Col>
                                <Col md="5" className="ml-n3">
                                <Link to='/category/Tops'>
                                  <Card className="bg-white text-dark p-2" style={{height:'280px'}} data-aos="fade-left">
                                    <Card.Img  style={{objectFit:"cover"}}
                                    
                                    src="https://res.cloudinary.com/djtpiagbk/image/upload/v1618873501/Women/WOMAN%20LONG%20SLEEVE%20SHIRT/Screenshot_619_cjnqie.png" alt="Card image"/>
                                    <Card.ImgOverlay>
                                        <Card.Title>
                                             NEW COLLECTION <br>
                                              </br>
                                           <h3 className="mt-2">TEES AND TOPS </h3> 
                                            </Card.Title>
                                        <Card.Text style={{textDecoration:"underline", fontSize:'18px'}}>
                                         SEE NOW
                                        </Card.Text>
                                    
                                    </Card.ImgOverlay>
                                    </Card>
                                </Link>
                                        
                            </Col>
                        </Row>
                    </Container> 
                    <br />
                    <br />
                    <br />
                    <br />
                    <span 
                        className="up"
                        onClick={() => {
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth"
                            })
                        }}
                    >
                        <IoIosArrowUp size="25" color="white" />
                    </span>
                    <Footer />
                </div>
            ) : (
                <Spinner animation="border" style={{marginTop:"400px"}} />
            )}
        </div>
    )
}

// function mapStateToProps ({items}) {

//     return {
//         items
//     }
// }

export default withRouter(connect(null, {handleInitialData})(MainPage))
