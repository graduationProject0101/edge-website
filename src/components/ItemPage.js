import React, { useState, useEffect } from 'react'
import { Container, Image, Row, Col, Button, InputGroup, FormControl, Form, Accordion, Card, Spinner } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import Axios from "axios"
import Aos from 'aos'
import ReactStars from "react-rating-stars-component"
import NavBar from './NavBar'
import ItemPic1 from '../img/item_pic1.jpg'
import ItemPic2 from '../img/item_pic2.jpg'
import ItemPic3 from '../img/item_pic3.jpg'
import ItemPic4 from '../img/item_pic4.jpg'
import Item from './Item'
import Footer from './Footer'
import Cart from '../img/cart.svg'
import { AiOutlinePlusCircle, AiOutlineMinusCircle, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { connect, useSelector, useDispatch } from 'react-redux'
import { colourNameToHex } from '../color-transfer'
import { increaseCartQty } from '../actions/cart'


function ItemPage(props) {

    const authedUser = useSelector(state => state.authedUser)
    let sizeValue
    let colorValue
    // let cartQty = 0

    let dispatch = useDispatch()
    
    const [item, setitem] = useState()
    const [items, setitems] = useState()
    const [pic, setPic] = useState()

    // useEffect(() => {
    //     setitem(props.myItem)
    //     console.log('itemmm', item)
    //     setPic(props.myItem.images[0])
    //     console.log('itemImage', item.images[0])
    // },[props.myItem])

    useEffect(() => {

        Aos.init({
            duration: 1500,
            easing: 'ease'
        })

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

        setCount(1)

        const getItem = async () => {
            const user = await jwt_decode(localStorage.getItem('token')).id
            try {
                const response = await Axios.post(`api/v1/items/filter?_id=${props.match.params.id}`, {
                    owner: user
                })
                console.log("🚀 ~ file: ItemPage.js ~ line 37 ~ getItem ~ response", response)
                const Item = await response.data.data.filteredItems[0]
                console.log("🚀 ~ file: ItemPage.js ~ line 40 ~ getItem ~ Item", Item)
                setWish(response.data.favorite)
                
                return Item
            }
            catch(e) {
                console.error(e.message)
            }
        }

        const setItem = async () => {
            const myItem = await getItem()
            console.log("🚀 ~ file: ItemPage.js ~ line 50 ~ useEffect ~ myItem", myItem)
            await setitem(myItem)
            console.log('item-state', item)
            await setPic(myItem.images[0])
        }

        const getRecommendedItems = async () => {
            try {
                const user = await jwt_decode(localStorage.getItem('token')).id
                const response = await Axios.post("api/v1/akin", {
                    owner: user,
                    samples: "4"
                })
                console.log("🚀 ~ file: ItemPage.js ~ line 90 ~ getRecommendedItems ~ response", response)
                const recommendations = await response.data.recommendations
                setitems(recommendations)

                // if (recommendations.length) {
                //     setitems(recommendations)
                // } else {
                //     const response = await Axios.get(`api/v1/items/paginate?page=${Math.floor(Math.random() * (12 - 1 + 1)) + 1}&limit=4`)
                //     console.log("🚀 ~ file: ItemPage.js ~ line 97 ~ getRecommendedItems ~ response", response)
                //     setitems(response.data.data.paginatedItems)
                //     console.log("🚀 ~ file: ItemPage.js ~ line 99 ~ getRecommendedItems ~ items", items)
                // }
            }
            catch(e) {
                console.error(e.message)
            }

            // const response = await Axios.get(`api/v1/items/paginate?page=${Math.floor(Math.random() * (12 - 1 + 1)) + 1}&limit=4`)
            // console.log("🚀 ~ file: ItemPage.js ~ line 62 ~ getRecommendedItems ~ response", response)
            // setitems(response.data.data.paginatedItems)
            // console.log("🚀 ~ file: ItemPage.js ~ line 64 ~ getRecommendedItems ~ items", items)
        }

        setItem()
        getRecommendedItems()
        
    },[props.match.params.id])

    // useEffect(() => {
    //     const getMyItem = async () => {
    //         const myItem = await props.item
    //         console.log("🚀 ~ file: ItemPage.js ~ line 21 ~ ItemPage ~ myItem", myItem)
    //         const items = await props.myItems
    //         console.log("🚀 ~ file: ItemPage.js ~ line 22 ~ ItemPage ~ items", items)
    //         setitem(myItem)
    //         console.log("🚀 ~ file: ItemPage.js ~ line 21 ~ ItemPage ~ item", item)
    //         setPic(myItem.images[0])
    //     }

    //     getMyItem()
    // },[item])


    // useEffect(() => {
    //     setitem(myItem)
    // },[])


    // useEffect(() => {
    //     const getMyItems = async () => {
    //         const items = await Object.values(props.items)
    //         console.log('items Item Page', items)
    //         const itemId = await props.match.params.id
    //         console.log('itemId', itemId)
    //         const myItem = await items.filter(item => item._id === itemId)[0]
    //         console.log('item', myItem)
    //         setitem(myItem)
    //     }

    //     getMyItems()
    // },[])



    // const [index, setIndex] = useState(0);
    // const [text, setText] = useState('')
    // const [rate, setRate] = useState(0)
    // const [review, setReview] = useState([])
    const [toggle_1, setToggle_1] = useState(false)
    const [toggle_2, setToggle_2] = useState(false)
    // const [toggle_3, setToggle_3] = useState(false)
    const [count, setCount] = useState(1)
    const [wish, setWish] = useState(false)
    const [cartArr, setcartArr] = useState([])


    // const handleSelect = (selectedIndex, e) => {
    //   setIndex(selectedIndex);

    // };

    // const handleReview = (e) => {
    //     setText(e.target.value)
    // }

    // const addReview = (e) => {
    //     e.preventDefault()
    //     const today = new Date()
    //     setReview([...review, {
    //         id: review.length + 1,
    //         user: 'user',
    //         time: today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear(),
    //         textReview: text,
    //         rate: rate
    //     }])
    //     setText('')
    //     console.log("review", review)
    //     console.log("text", text)
    // }

    // const ratingChanged = (newRating) => {
    //     setRate(newRating)
    //     console.log(newRating);
    // };

    const picSelector = (e) => {
        setPic(e.target.src)
    }

    const toggle_1Click = () => {
        setToggle_1(!toggle_1)
    }

    const toggle_2Click = () => {
        setToggle_2(!toggle_2)
    }
    
    const countPlus = () => {
        setCount(count + 1)
    }
    
    const countMinus = () => {
        if (count !== 1) {
            setCount(count - 1)
        }
    }

    const handleWish = async () => {
        if (wish === false) {
            try {
                const response = await Axios.post("api/v1/favorite", {
                    owner: authedUser,
                    items: [
                        {
                            itemId: item._id,
                            itemName: item.itemName,
                            price: item.Price,
                            images: item.images,
                            color: item.availableColors,
                            size: item.AvailableSizes,
                            seller: item.Seller,
                            SubCategory: item.SubCategory
                        }
                    ]
                })
                console.log("🚀 ~ file: ItemPage.js ~ line 188 ~ handleWish ~ response", response)
                setWish(true)
            }
            catch(e) {
                console.error(e.message)
            }
        }
        else {
            try {
                const response = await Axios.delete("api/v1/favorite", {
                    data: {
                        owner: authedUser,
                        itemId: item._id
                    }
                })
                console.log("🚀 ~ file: ItemPage.js ~ line 202 ~ handleWish ~ response", response)
                setWish(false)
            }
            catch(e) {
                console.error(e.message)
            }
        }
    }

    const getSizeValue = (e) => {
        e.preventDefault()
        sizeValue = e.target.value
        console.log("🚀 ~ file: ItemPage.js ~ line 170 ~ getSizeValue ~ sizeValue", sizeValue)
        return sizeValue
    }

    const getColorValue = (e) => {
        e.preventDefault()
        colorValue = e.target.value
        console.log("🚀 ~ file: ItemPage.js ~ line 177 ~ getColorValue ~ colorValue", colorValue)
        return colorValue
    }

    // let Items = [1, 2, 3, 4]
    // let itemColors = ['blue', 'orange', '#D5D9D9', 'pink']

    // const items = useSelector(state => state.items)
    // console.log('items Item Page', items)
    // const itemId = props.match.params.id
    // console.log('itemId', itemId)
    // const item = Object.values(items).filter(item => item._id === itemId)[0]
    // console.log('item', item)

    // let item = {
    //     name: "B3 Project oversize sweatshirt",
    //     factory: "Bersheka",
    //     price: 59.9,
    //     detail: "Care for fiber & Care for water. Garment made of 100% ecologically grown cotton = cultivated using practices that protect biodiversity and technologies that reduce water consumption in dyeing.",
    //     size: "M",
    //     colors: ['blue', 'orange', '#D5D9D9', 'pink'],
    //     pics: [ItemPic1, ItemPic2, ItemPic3, ItemPic4]
    // }


    const pushItemToCart = async (item) => {
        // setcartArr([...cartArr, item])
        // console.log('cartArr', cartArr)
        try {
            const addToCartResponse = await Axios.post("api/v1/cart", {
                owner: authedUser,
                items: [{
                    itemId: props.match.params.id,
                    itemName: item.itemName,
                    qty: count,
                    price: item.Price,
                    images: item.images[0],
                    color: colorValue,
                    size: sizeValue,
                    seller: item.Seller,
                    SubCategory: item.SubCategory
                }]
            })
            console.log("🚀 ~ file: ItemPage.js ~ line 215 ~ pushItemToCart ~ addToCartResponse", addToCartResponse)
            document.querySelector("#added-to-cart").style.display= "block"
            setTimeout(() => {
                document.querySelector("#added-to-cart").style.display= "none"
            }, 3000)
        }
        catch(e) {
            console.error(e.message)
        }
        // props.increaseCartQty()
        // cartQty = await cartQty + 1
    }


    return (
        <div>
            {(item && items) ? (
                <div>
                    <NavBar wish={wish} />
                    <br />
                    <Container data-aos="fade-right">
                        <Row>
                            <Col sm='12' xs='12' md="12" lg='7' >
                                <br />
                                <br />
                                <br />
                                <Row className="mr-5 ml-n5">
                                    <Col sm='4' xs='4' md="4" className="mr-n4" >
                                        {item.images.map((img) => (
                                            <Image
                                                key={img}
                                                className="d-block"
                                                src={img}
                                                alt="First slide"
                                                style={{height:"130px", marginBottom:"26px", cursor:"pointer"}}
                                                onClick={picSelector}
                                            />
                                        ))}
                                        {/* <Image
                                            className="d-block"
                                            src={item.images[1]}
                                            alt="First slide"
                                            style={{height:"130px", marginBottom:"26px", cursor:"pointer"}}
                                            onClick={picSelector}
                                        />
                                        <Image
                                            className="d-block"
                                            src={item.images[2]}
                                            alt="First slide"
                                            style={{height:"130px", marginBottom:"26px", cursor:"pointer"}}
                                            onClick={picSelector}
                                        />
                                        <Image
                                            className="d-block"
                                            src={item.images[3]}
                                            alt="First slide"
                                            style={{height:"130px", cursor:"pointer"}}
                                            onClick={picSelector}
                                        /> */}
                                    </Col>
                                    <Col sm='8' xs='8' md="8" className="ml-n3">
                                        <Image 
                                            src={pic}
                                            alt="First slide"
                                            style={{height:"600px"}}
                                        />
                                    </Col>
                                </Row>
                                <br />
                            </Col>
                            <Col sm='12' xs='12' md="12" lg='5' >
                                <br />
                                <br />
                                <br />
                                <h5 className="font-weight-bold text-left">{item.itemName}</h5>
                                <p className="text-muted text-left">{`By: ${item.Seller}`}</p>
                                    
                                <h5 className="text-dark font-weight-bold mr-5 text-left">{`$${item.Price}`}</h5>
                                <br />
                                {/* <h5 className="font-weight-bold text-left">Description:</h5> */}
                                {/* <ul className="text-dark text-left ml-3">
                                    <li>V-neck T-shirt made of the best fabrics and sewn to international standards to give you the most comfortable wear</li>
                                    <li>Brand: Ravin</li>
                                    <li>Material:95% Cotton & 5% Lycra</li>
                                </ul> */}
                                <p className="text-dark text-left">
                                    {item.detail}
                                </p>
                                <h6 className="mr-5 text-left text-muted">
                                    Size: {item.AvailableSizes.map((size) => (
                                        <Button 
                                            id="size-btn"
                                            name={size}
                                            value={size}
                                            onClick={getSizeValue}
                                        >
                                            {size}
                                        </Button>
                                    ))}
                                </h6>
                                <br />
                                <h6 className="mr-5 text-left">Color: 
                                    <Row>
                                        {item.availableColors.map((color) => {
                                            color = colourNameToHex(color)
                                            return (
                                                <Col sm={1} xs={1} md={1} key={color}>
                                                    <Button 
                                                        key={color} 
                                                        value={color}
                                                        style={{width:"30px", height:"30px", backgroundColor:`${color}`, marginLeft:"55px", marginTop:"-35px", borderRadius:"1rem", cursor:"pointer", border:'none'}}
                                                        onClick={getColorValue}
                                                    />
                                                </Col>
                                            )
                                        })}
                                    </Row>
                                </h6>
                            

                                <Row className="ml-1">
                                    <Col sm='3' xs='3' md="3">
                                        <Row className="mt-5">
                                            <Col sm='6' xs='6' md="6" id="counter" className="count "> {count} </Col>
                                            <Col sm='6' xs='6' md="6" className="ml-n4">
                                                <button className="counter-button" onClick={countPlus}>
                                                    <AiOutlinePlus size="20px" />
                                                </button>
                                                <button className="counter-button" onClick={countMinus}>
                                                    <AiOutlineMinus size="20px" />
                                                </button>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col sm='8' xs='8' md="8" className="ml-n4">
                                        <Button 
                                            variant="dark" 
                                            style={{width:"300px", height:"50px", fontWeight:"bold", fontSize:"20px", marginTop:"50px", backgroundColor:"black"}}
                                            onClick={() => pushItemToCart(item)}
                                        >ADD TO CART</Button>
                                        <p 
                                            id="added-to-cart"
                                            style={{
                                                color:'green',
                                                fontSize:'20px', 
                                                letterSpacing:'3px',
                                                marginTop:'10px',
                                                marginLeft:'40px',
                                                marginBottom:'-10px',
                                                display: 'none'
                                            }}
                                        >ADDED TO CART!</p>
                                    </Col>
                                </Row>
                                <br />
                                <button id="wish-button" className="text-left float-left ml-1" onClick={handleWish}>
                                    {wish === false ? (<BsHeart size="20px"/>) : (<BsHeartFill size="20px" color="red"/>)}
                                    &nbsp;&nbsp;&nbsp;
                                    ADD TO WISHLIST
                                </button>
                            
                                <br />
                                <br />
                                <hr />
                                <Accordion defaultActiveKey="none">
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} eventKey="0" onClick={toggle_1Click} style={{height:"50px", backgroundColor:"white", cursor:"pointer"}}>
                                            <p className="text-left">ADDITIONAL INFORMATION
                                                {toggle_1 === false ? 
                                                (<AiOutlinePlusCircle size="22px" style={{marginLeft:'185px'}} />)
                                                : (<AiOutlineMinusCircle size="22px" style={{marginLeft:'185px'}} />)    
                                            }
                                            </p>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                                {/* <h4 className="text-left mb-3">SPECIFICATIONS</h4> */}
                                                <Row className="ml-1">
                                                    <Col id="specifications-1">
                                                        <h6 className="text-left mb-3">Brand</h6>
                                                        <h6 className="text-left mb-3">Release Date</h6>
                                                        <h6 className="text-left mb-3">Package weight in KGs</h6>
                                                        <h6 className="text-left mb-3">Fabric Type</h6>
                                                    </Col>
                                                    <Col id="specifications-2">
                                                        <h6 className="text-left text-muted mb-3">{item.Seller}</h6>
                                                        <h6 className="text-left text-muted mb-3">2021-02-10</h6>
                                                        <h6 className="text-left text-muted mb-3">182 grams</h6>
                                                        <h6 className="text-left text-muted mb-3">Cotton</h6>
                                                    </Col>
                                                </Row>
                                                <br />
                                                <h6 
                                                    className="text-left ml-1" 
                                                    style={{lineHeight:'25px'}}
                                                >{item.Description}</h6>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} eventKey="1" onClick={toggle_2Click} style={{height:"50px", backgroundColor:"white", cursor:"pointer"}}>
                                            <p className="text-left">ASSEMBLY & DELIVERY
                                                {toggle_2 === false ? 
                                                (<AiOutlinePlusCircle size="22px" style={{marginLeft:'215px'}} />)
                                                : (<AiOutlineMinusCircle size="22px" style={{marginLeft:'215px'}} />)    
                                            }
                                            </p>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="1">
                                            <Card.Body>Hello! I'm another body</Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    {/* <Card>
                                        <Accordion.Toggle as={Card.Header} eventKey="1">
                                        Click me!
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="1">
                                            <Card.Body>Hello! I'm another body</Card.Body>
                                        </Accordion.Collapse>
                                    </Card> */}
                                </Accordion>
                            </Col>
                        </Row>
                    </Container>
                    <br />
                    <br />
                    <hr />
                    <br />
                    <br />
                    <br />

                    {/* <Container id="customer-reviews">
                        <h4 className="text-left">Customer Reviews</h4>
                        <hr />
                        <Row>
                            <Col md="4" className="mt-3">
                                <h5 className="text-left ml-1 mb-5">Product Ratings</h5>
                                <div className="bg-dark w-50 p-2 mb-5">
                                    <h5 className="text-left ml-5 mt-2 text-bold" style={{color: "#ffd700"}}>4.2 / 5</h5>
                                    <ReactStars
                                        count={5}
                                        onChange={ratingChanged}
                                        size={35}
                                        activeColor="#ffd700"
                                    />
                                    <h6 className="text-light mt-2">20 Ratings</h6>
                                </div>
                            </Col>
                            <Col md="8" className="mt-3">
                                <h5 className="text-left mb-5">Product Reviews</h5>
                                <Form onSubmit={addReview}>
                                    <Row>
                                        <Col md="8">
                                            <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text className="bg-dark text-light">Your Review</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl 
                                                as="textarea" 
                                                aria-label="With textarea" 
                                                placeholder="Enter Your Review" 
                                                value={text} 
                                                onChange={handleReview}
                                            />
                                            </InputGroup>
                                        </Col>
                                        <Col md="3">
                                            <Button
                                                variant="dark"
                                                type="submit"
                                                className="h-100 text-bold mr-3"
                                                style={{borderRadius:"0.3rem", fontSize:"18px"}}
                                            >
                                                ADD Review
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                                <br />
                                {review.map((r) => (
                                    <div>
                                        <div key={r.id} className="text-left" id="review-block">
                                            <ReactStars
                                                count={5}
                                                value={r.rate}
                                                size={25}
                                                activeColor="#ffd700"
                                                edit={false}
                                            />
                                            <h6>{r.textReview}</h6>
                                            <p className="text-muted">{`${r.time} by ${r.user}`}</p>
                                        </div>
                                        <hr />
                                    </div>
                                ))}
                            </Col>
                        </Row>
                    </Container>
                    <br />
                    <br />
                    <br />
                    <br /> */}

                    <Container fluid data-aos="flip-down">
                        <h4 className="text-center">YOU MAY ALSO LIKE</h4>
                        <br />
                        <br />
                        {item &&
                            <div>
                                <Row className="ml-2 mr-2">
                                    {items.map((item) => {
                                        return (
                                            <Col key={item._id} className="ml-3"> 
                                                <Link to={`/item/${item._id}`} style={{color:"inherit", textDecoration:"none", cursor:"pointer"}}>
                                                    <Item itemName={item.itemName} price={item.Price} image={item.images[0]} />
                                                </Link>
                                            </Col>
                                        )
                                    })}
                                </Row>
                            </div>
                        }
                    </Container>
                    <br />
                    <br />
                    <br />

                    <Footer />
                </div> ) : (
                    <Spinner animation="border" style={{marginTop:"400px"}} />
                )
            }
        </div>
    )
}

// function mapDispatchToProps (dispatch) {
//     return {
//         increaseCartQty: () => dispatch(increaseCartQty())
//     }
// }

export default ItemPage;







// import React, { useState } from 'react'
// import { Container, Image, Carousel, Row, Col, Button, InputGroup, FormControl, Form } from 'react-bootstrap'
// import ReactStars from "react-rating-stars-component"
// import NavBar from './NavBar'
// import BlackT1 from '../img/blackt1.jpg'
// import BlackT2 from '../img/blackt2.jpg'
// import BlackT3 from '../img/blackt3.jpg'
// import Item from './Item'
// import Footer from './Footer'
// import Cart from '../img/cart.svg'


// let items = [1, 2, 3, 4]

// function ItemPage() {
//     const [index, setIndex] = useState(0);
//     const [text, setText] = useState('')
//     const [rate, setRate] = useState(0)
//     const [review, setReview] = useState([])

//     const handleSelect = (selectedIndex, e) => {
//       setIndex(selectedIndex);

//     };

//     const handleReview = (e) => {
//         setText(e.target.value)
//     }

//     const addReview = (e) => {
//         e.preventDefault()
//         const today = new Date()
//         setReview([...review, {
//             id: review.length + 1,
//             user: 'user',
//             time: today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear(),
//             textReview: text,
//             rate: rate
//         }])
//         setText('')
//         console.log("review", review)
//         console.log("text", text)
//     }

//     const ratingChanged = (newRating) => {
//         setRate(newRating)
//         console.log(newRating);
//     };
    
//     return (
//         <div fluid>
//             <NavBar />
//             <br />
//             <Container>
//                 <Row>
//                     <Col md="5">
//                         <Container>
//                             <Carousel activeIndex={index} onSelect={handleSelect} className="mt-5 ml-n5" style={{width:"400px"}}>
//                                 <Carousel.Item>
//                                     <Image
//                                         className="d-block w-100"
//                                         src={BlackT1}
//                                         alt="First slide"
//                                     />

//                                 </Carousel.Item>
//                                 <Carousel.Item>
//                                     <Image
//                                         className="d-block w-100"
//                                         src={BlackT2}
//                                         alt="Second slide"
//                                     />

//                                 </Carousel.Item>
//                                 <Carousel.Item>
//                                     <Image
//                                         className="d-block w-100"
//                                         src={BlackT3}
//                                         alt="Third slide"
//                                     />

//                                 </Carousel.Item>
//                             </Carousel>
//                         </Container>
//                         <br />
//                         <Container className="ml-n4">
//                             <Row>
//                                 <Col>
//                                     <Image
//                                             className="d-block w-50"
//                                             src={BlackT1}
//                                             alt="First slide"
//                                     />
//                                 </Col>
//                                 <Col>
//                                     <Image
//                                             className="d-block w-50"
//                                             src={BlackT2}
//                                             alt="First slide"
//                                     />
//                                 </Col>
//                                 <Col>
//                                     <Image
//                                             className="d-block w-50"
//                                             src={BlackT3}
//                                             alt="First slide"
//                                     />
//                                 </Col>
//                             </Row>
//                         </Container>
//                     </Col>
//                     <Col md="7" >
//                         <br />
//                         <br />
//                         <br />
//                         <br />
//                         <br />
//                         <h5 className="font-weight-bold text-left">Hero Black Mixed V Neck T-Shirt For Men</h5>
//                         <p className="text-muted text-left">By: Ravin</p>
                            
//                         <h5 className="text-dark font-weight-bold mr-5 text-left">$150</h5>
//                         <br />
//                         <h6 className="mr-5 text-left text-muted">Size: M</h6>
//                         <br />
//                         <h6 className="mr-5 text-left">Color: 
//                             <div style={{width:"30px", height:"30px", backgroundColor:"black", marginLeft:"55px", marginTop:"-22px", borderRadius:"1rem"}} />
//                         </h6>
                    
                    
//                         <Button 
//                             variant="outline-dark" 
//                             style={{width:"300px", height:"50px", fontWeight:"bold", fontSize:"20px", marginTop:"30px", marginRight:"350px"}}
//                         >ADD TO CART</Button>
                    
//                         <br />
//                         <hr />
//                         <h5 className="font-weight-bold text-left">Description:</h5>
//                         <ul className="text-dark text-left">
//                             <li>V-neck T-shirt made of the best fabrics and sewn to international standards to give you the most comfortable wear</li>
//                             <li>Brand: Ravin</li>
//                             <li>Material:95% Cotton & 5% Lycra</li>
//                         </ul>
                        
//                     </Col>
//                 </Row>
//             </Container>
//             <br />
//             <br />
//             <hr />
//             <br />

//             <Container>
//                 <h4 className="text-left mb-3">SPECIFICATIONS</h4>
//                 <Row className="ml-1">
//                     <Col id="specifications-1">
//                         <h6 className="text-left mb-3">Brand</h6>
//                         <h6 className="text-left mb-3">Release Date</h6>
//                         <h6 className="text-left mb-3">Package weight in KGs</h6>
//                         <h6 className="text-left mb-3">Fabric Type</h6>
//                     </Col>
//                     <Col id="specifications-2">
//                         <h6 className="text-left text-muted mb-3">Ravin</h6>
//                         <h6 className="text-left text-muted mb-3">2018-02-10</h6>
//                         <h6 className="text-left text-muted mb-3">182 grams</h6>
//                         <h6 className="text-left text-muted mb-3">Cotton</h6>
//                     </Col>
//                 </Row>
//             </Container>

//             <br />
//             <br />

//             <Container id="customer-reviews">
//                 <h4 className="text-left">Customer Reviews</h4>
//                 <hr />
//                 <Row>
//                     <Col md="4" className="mt-3">
//                         <h5 className="text-left ml-1 mb-5">Product Ratings</h5>
//                         <div className="bg-dark w-50 p-2 mb-5">
//                             <h5 className="text-left ml-5 mt-2 text-bold" style={{color: "#ffd700"}}>4.2 / 5</h5>
//                             <ReactStars
//                                 count={5}
//                                 onChange={ratingChanged}
//                                 size={35}
//                                 activeColor="#ffd700"
//                             />
//                             <h6 className="text-light mt-2">20 Ratings</h6>
//                         </div>
//                     </Col>
//                     <Col md="8" className="mt-3">
//                         <h5 className="text-left mb-5">Product Reviews</h5>
//                         <Form onSubmit={addReview}>
//                             <Row>
//                                 <Col md="8">
//                                     <InputGroup>
//                                     <InputGroup.Prepend>
//                                         <InputGroup.Text className="bg-dark text-light">Your Review</InputGroup.Text>
//                                     </InputGroup.Prepend>
//                                     <FormControl 
//                                         as="textarea" 
//                                         aria-label="With textarea" 
//                                         placeholder="Enter Your Review" 
//                                         value={text} 
//                                         onChange={handleReview}
//                                     />
//                                     </InputGroup>
//                                 </Col>
//                                 <Col md="3">
//                                     <Button
//                                         variant="dark"
//                                         type="submit"
//                                         className="h-100 text-bold mr-3"
//                                         style={{borderRadius:"0.3rem", fontSize:"18px"}}
//                                     >
//                                         ADD Review
//                                     </Button>
//                                 </Col>
//                             </Row>
//                         </Form>
//                         <br />
//                         {review.map((r) => (
//                             <div>
//                                 <div key={r.id} className="text-left" id="review-block">
//                                     <ReactStars
//                                         count={5}
//                                         value={r.rate}
//                                         size={25}
//                                         activeColor="#ffd700"
//                                         edit={false}
//                                     />
//                                     <h6>{r.textReview}</h6>
//                                     <p className="text-muted">{`${r.time} by ${r.user}`}</p>
//                                 </div>
//                                 <hr />
//                             </div>
//                         ))}
//                     </Col>
//                 </Row>
//             </Container>
//             <br />
//             <br />
//             <br />

//             <Container>
//                 <h4 className="text-left">Related Items</h4>
//                 <br />
//                 <div className="border">
//                     <Row>
//                         {items.map((item) => (
//                             <Col md="3" key={item}>
//                                 <Item />
//                             </Col>
//                         ))}
//                     </Row>
//                 </div>
//             </Container>
//             <br />
//             <br />
//             <br />

//             <Footer />
//         </div>
//     )
// }

// export default ItemPage;
