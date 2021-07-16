import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Aos from 'aos'
import { withRouter, Link } from 'react-router-dom';
import { Form, Button, Row, Col, Spinner, Card, Container } from 'react-bootstrap'
import { IoMdArrowRoundBack, IoIosArrowUp } from 'react-icons/io'
import Footer from './Footer'


function SearchBar(props) {

    const [query, setquery] = useState('')
    const [allItems, setallItems] = useState()
    const [searchItems, setsearchItems] = useState([])

    useEffect(() => {

        Aos.init({
            offset: 100,
            duration: 1500,
            easing: 'ease'
        })

        const ScrollToUpButton = () => {
            let span = document.querySelector(".up")
            console.log("🚀 ~ file: MainPage.js ~ line 59 ~ MainPage ~ span", span)
            if (window.scrollY >= 900 && span) {
                span.classList.add("show")
            } else if (window.scrollY < 1700 && span) {
                span.classList.remove("show")
            }
        }

        window.addEventListener('scroll', ScrollToUpButton);

        const getAllItems = async () => {
            try {
                const response = Axios.get("api/v1/items")
                console.log("🚀 ~ file: SearchBar.js ~ line 14 ~ useEffect ~ response", response)
                const data = await response.then(res => res)
                console.log("🚀 ~ file: SearchBar.js ~ line 17 ~ getAllItems ~ data", data)
                setallItems(data.data.data.allItems)
                // setsearchItems(data.data.data.allItems)
            }
            catch(e) {
                console.error(e.message)
            }
        }

        getAllItems()

        return () => {
            window.removeEventListener('scroll', ScrollToUpButton)
        }

    }, [])

    const getSearchItems = (query) => {
        // const searchQuery = e.target.value
        setquery(query)
        console.log('search-query', query)
        const mySearch = allItems.filter((item) => item.itemName.toLowerCase().includes(query.toLowerCase()))
        console.log("🚀 ~ file: SearchBar.js ~ line 35 ~ getSearchItems ~ mySearch", mySearch)
        setsearchItems(mySearch)
    }

    return (
        <div id="form-block">
            <Row>
                <Col sm='2' xs='2' md='1' >
                    <Button variant='dark' id='back-btn' onClick={() => props.history.goBack()}>
                        <IoMdArrowRoundBack size='35px' />
                    </Button>
                </Col>
                <Col sm='10' xs='10' md='11' >
                    <Form>
                        <Form.Control 
                            type="text" 
                            id="search-bar" 
                            value={query}
                            placeholder="What are you looking for ?" 
                            className="text-left" 
                            onChange={(e) => getSearchItems(e.target.value)}
                        />
                    </Form>
                </Col>
            </Row>
            <br />
            <br />
            
            {(searchItems.length > 0 && query !== '') &&
                <div>
                    <Container data-aos="zoom-in">
                        <h4 className="text-left text-muted"> 
                            {`${searchItems.length} Results for`} &nbsp; <strong className="text-dark">"Search"</strong> 
                        </h4>
                        <br />
                        <br />
                        {searchItems.map((item) => (
                            // <div key={item._id} id="filtered-item" >
                            //     <Image alt="item-pic" src={item.images[0]} style={{objectFit:'cover', height:'200px', verticalAlign:'text-top'}} />
                            //     <br />
                            //     <br />
                            //     <h5> {item.itemName} </h5>
                            //     <h4> {item.Price} </h4>
                            // </div>
                            <Link to={`/item/${item._id}`}>
                                <Card key={item._id} id="filtered-item" data-aos="zoom-in">
                                    <Card.Img src={item.images[0]} style={{objectFit:"cover", height:'350px', verticalAlign:'top', position:'relative'}} />
                                    <Card.Body>
                                        <Card.Text style={{height:'25px'}}>
                                            {item.itemName}
                                        </Card.Text>
                                        <br />
                                        <Card.Title className="mt-n3"> {`$${item.Price}`} </Card.Title>
                                    </Card.Body>
                                </Card>
                            </Link>
                        ))}
                    </Container>
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
                </div>
                }

        </div>
    )
}

export default withRouter(SearchBar);


// export default React.memo(withRouter(SearchBar), (props, nextProps)=> {
//     console.log('prevState', props.query)
//     if(props.query === nextProps.query) {
//         // don't re-render/update
//         return true
//     }
// });