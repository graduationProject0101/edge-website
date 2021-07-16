import React, { useState, useEffect } from 'react'
import {useSpring, animated} from 'react-spring'
import { Switch, Route, Link, Redirect, useHistory } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown, Form, Button, Image, Dropdown, Spinner } from 'react-bootstrap'
import Aos from 'aos'
import Axios from 'axios'
import Cart from '../img/cart.svg'
import UserAvatar from '../img/user_avatar.svg'
import { connect, useSelector } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { BsSearch, BsHeart, BsHeartFill } from 'react-icons/bs'
import { FaUser, FaRegUser } from 'react-icons/fa'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { getCartQty } from '../actions/cart'


function NavBar(props) {

    // const [searchBar, setSearchBar] = useState(false)

    // const showSearchBar = () => {
    //     document.getElementById('search-bar').style.display = 'inline-block'
    //     document.getElementById('search-bar').style.width = '80%'
    //     window.addEventListener('mouseup', function(event){
    //         var searchbar = document.getElementById('search-bar');
    //         if (event.target !== searchbar && event.target.parentNode !== searchbar){
    //             searchbar.style.display = 'none';
    //         }
    //     });
    //     setSearchBar(!searchBar)
    // }

    const [showDropdown, setShowDropdown] = useState(false);
    const [cartQuantity, setcartQuantity] = useState(0)

    let history = useHistory()

    const authedUser = useSelector(state => state.authedUser)

    useEffect(() => {

        Aos.init({
            duration: 1500,
            easing: 'ease'
        })

        const getCartQuantity = async (dispatch) => {
            const response = await Axios.get(`api/v1/cart/qty?owner=${authedUser}`)
            console.log("🚀 ~ file: NavBar.js ~ line 47 ~ getCartQuantity ~ response", response)
            props.getCartQty(response.data.quantity)
            setcartQuantity(response.data.quantity)
            console.log('cart-quantity', cartQuantity)
        }

        getCartQuantity()


        console.log('props.cartArr', props.cartArr)
    }, [])

    const logout = () => {
        props.setAuthedUser(null)
        localStorage.clear()
        history.push('/signup')
    }

    return (
        <div>
            <Navbar bg="light" expand="lg" id="navbar" data-aos="fade-down">
                <Navbar.Brand as={Link} to="/" className="ml-4 text-bold" style={{fontSize:"30px"}} data-aos="zoom-in" data-aos-delay="900">edge.</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/" className="navText"> HOME</Nav.Link>
                        <NavDropdown title="CATEGORIES" id="basic-nav-dropdown" className="navText">
                            <NavDropdown.Item as={Link} to="/category/T-Shirt">T-SHIRT</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/category/Shirt">SHIRTS</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/category/Tops">TOPS</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/category/Tie-Dye">TIE-DYE</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/category/Pants">PANTS</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/category/Jeans">JEANS</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#link" className="navText">ِABOUT US</Nav.Link>
                        <Nav.Link href="#link" className="navText">CONTACTS</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to='/search' className="mr-n1">
                            <BsSearch size="25px" color="black" id="seach-icon" />  
                        </Nav.Link>
                        <Nav.Link className="mr-1">
                            {/* <FaUser size="25px" color="black" /> */}
                            <Dropdown
                                onMouseLeave={() => setShowDropdown(false)}
                                onMouseOver={() => setShowDropdown(true)}
                            >
                                <Dropdown.Toggle
                                    className="main-style mt-n3"
                                    id="dropdown-basic"
                                    style={{backgroundColor:'white', border:'none', boxShadow:'none'}}
                                >
                                    <Nav.Link as={Link} to='/signup' className="d-inline-block">
                                        <FaRegUser size="25px" color="black" />
                                    </Nav.Link>
                                </Dropdown.Toggle>

                                <Dropdown.Menu show={showDropdown}>
                                    <Dropdown.Item onClick={() => history.push('/profile')}>
                                        Profile
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => history.push('/orders')}>
                                        Orders
                                    </Dropdown.Item>
                                    {/* <Dropdown.Item onClick={() => history.push('/admin')}>
                                        Admin
                                    </Dropdown.Item> */}
                                    <Dropdown.Item onClick={logout}>
                                        Logout
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            </Nav.Link>
                            <Link to='/wishlist' className="mt-2 mr-1">
                                <span>{props.wish === false ? (<BsHeart size="23px" color="black"/>) : (<BsHeartFill size="23px" color="red"/>)}</span>
                            </Link>
                        <Nav.Link as={Link} to="/cart" className="mr-1" >
                            <HiOutlineShoppingBag size="30px" color="black" />
                            { cartQuantity && cartQuantity > 0 ? 
                                (<div id="cart-items-number">
                                    <span className="mt-n1"> {cartQuantity} </span>
                                </div>)
                                :
                                (<div style={{display:'none'}}></div>)
                            }
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

function mapDispatchToProps (dispatch) {
    return {
      setAuthedUser: (data) => dispatch(setAuthedUser(data)),
      getCartQty: (data) => dispatch(getCartQty(data))
    }
}

export default connect(null, mapDispatchToProps)(NavBar)
