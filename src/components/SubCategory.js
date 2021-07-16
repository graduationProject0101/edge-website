import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Aos from 'aos'
import { Container, Carousel, Image, Row, Col, Card, Spinner } from 'react-bootstrap'
import { IoIosArrowUp } from 'react-icons/io'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'


function SubCategory (props) {

    const [filteredItems, setfilteredItems] = useState()

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

        const getItemsBySubCategory = async () => {
            try {
                const SubCategory = await props.match.params.subcategory
                console.log("🚀 ~ file: SubCategory.js ~ line 12 ~ getItemsBySubCategory ~ SubCategory", SubCategory)

                const subCategoryResponse = await Axios.post(`api/v1/items/filter?SubCategory=${SubCategory}`)
                console.log("🚀 ~ file: SubCategory.js ~ line 13 ~ getItemsBySubCategory ~ subCategoryResponse", subCategoryResponse)

                setfilteredItems(subCategoryResponse.data.data.filteredItems)
                console.log('FilteredItems', filteredItems)
            }
            catch(e) {
                console.error(e.message)
            }
        }

        getItemsBySubCategory()

        return () => {
            window.removeEventListener('scroll', ScrollToUpButton)
        }

    }, [props.match.params.subcategory])

    return (
        <div>
            {filteredItems ? (
                <div>
                    <NavBar wish={false} />
                    <br />
                    <br />
                    <Container data-aos="zoom-in">
                        <h4 className="text-left text-muted"> 
                            {`${filteredItems.length} Results for`} &nbsp; <strong className="text-dark">{`"${props.match.params.subcategory}"`}</strong> 
                        </h4>
                        <br />
                        <br />
                        {filteredItems.map((item) => (
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
                    <Footer />
                </div>
            ) : (
                <Spinner animation="border" style={{marginTop:"400px"}} />
            )}
        </div>
    )
}

export default SubCategory;