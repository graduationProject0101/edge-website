import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Axios from 'axios'
import Aos from 'aos'
import { useSelector, useDispatch } from 'react-redux'
import jwt_decode from "jwt-decode";
import { Container, Carousel, Image, Row, Col, Table, Form, Button, Spinner, Modal } from 'react-bootstrap'
import AdminNavber from './AdminNavbar'
import { FaEdit, FiEdit } from 'react-icons/fa'
import { MdClear } from 'react-icons/md'


function AdminUsers () {

    const colors = {
        'lilac': "#C8A2C8",
        'iceblue': "#f0f8ff",
        'antiquewhite': "#faebd7",
        'aqua': "#00ffff",
        'aquamarine': "#7fffd4",
        'azure': "#f0ffff",
        'beige': "#f5f5dc",
        'lightbiege': "#f5f5dc",
        'bisque': "#ffe4c4",
        'black': "#000000",
        'blanchedalmond': "#ffebcd",
        'blue': "#0000ff",
        'blueviolet': "#8a2be2",
        'brown': "#a52a2a",
        'burlywood': "#deb887",
        'cadetblue': "#5f9ea0",
        'chartreuse': "#7fff00",
        'chocolate': "#d2691e",
        'coral': "#ff7f50",
        'cornsilk': "#fff8dc",
        'crimson': "#dc143c",
        'cyan': "#00ffff",
        'darkblue': "#00008b",
        'dark blue': "#00008b",
        'darkcyan': "#008b8b",
        'darkgoldenrod': "#b8860b",
        'darkgray': "#a9a9a9",
        'darkgreen': "#006400",
        'bluechill': '#098297',
        'darkkhaki': "#bdb76b",
        'darkmagenta': "#8b008b",
        'darkolivegreen': "#556b2f",
        'darkorange': "#ff8c00",
        'orabge': "#ff8c00",
        'darkorchid': "#9932cc",
        'darkred': "#8b0000",
        'darksalmon': "#e9967a",
        'darkseagreen': "#8fbc8f",
        "sage green": "#9dc183",
        'darkslateblue': "#483d8b",
        'darkslategray': "#2f4f4f",
        'darkturquoise': "#00ced1",
        'darkviolet': "#9400d3",
        'deeppink': "#ff1493",
        'deepskyblue': "#00bfff",
        'dimgray': "#696969",
        'dodgerblue': "#1e90ff",
        'firebrick': "#b22222",
        'floralwhite': "#fffaf0",
        'forestgreen': "#228b22",
        'fuchsia': "#ff00ff",
        'gainsboro': "#dcdcdc",
        'stone': "#dcdcdc",
        'ghostwhite': "#f8f8ff",
        'gold': "#ffd700",
        'goldenrod': "#daa520",
        'gray': "#D3D3D3",
        'green': "#008000",
        'greenyellow': "#adff2f",
        'honeydew': "#f0fff0",
        'hotpink': "#ff69b4",
        "indianred ": "#cd5c5c",
        'indigo': "#4b0082",
        'ivory': "#fffff0",
        'khaki': "#f0e68c",
        'lavender': "#e6e6fa",
        "galegreen": "#71bc68",
        "chrome blue": "#b0c4de",
        "northern blue": "#afc9e8",
        'lavenderblush': "#fff0f5",
        'lawngreen': "#7cfc00",
        'lemonchiffon': "#fffacd",
        'lightblue': "#add8e6",
        "deepblue": "#00008b",
        'lightcoral': "#f08080",
        'lightcyan': "#e0ffff",
        'lightgoldenrodyellow': "#fafad2",
        'lightgrey': "#d3d3d3",
        'lightgreen': "#90ee90",
        'lightpink': "#ffb6c1",
        'lightsalmon': "#ffa07a",
        'lightseagreen': "#20b2aa",
        'lightskyblue': "#87cefa",
        'lightslategray': "#778899",
        'lightsteelblue': "#b0c4de",
        'lightyellow': "#ffffe0",
        'lime': '#98FB98',
        'limegreen': "#32cd32",
        'linen': "#faf0e6",
        'magenta': "#ff00ff",
        'maroon': "#800000",
        'mediumaquamarine': "#66cdaa",
        'mediumblue': "#0000cd",
        'mediumorchid': "#ba55d3",
        'mediumpurple': "#9370d8",
        'mediumseagreen': "#3cb371",
        'mediumslateblue': "#7b68ee",
        'mediumspringgreen': "#00fa9a",
        'mediumturquoise': "#48d1cc",
        'mediumvioletred': "#c71585",
        'midnightblue': "#191970",
        'mintcream': "#f5fffa",
        'mistyrose': "#ffe4e1",
        'moccasin': "#ffe4b5",
        'navajowhite': "#ffdead",
        'navy': "#000080",
        "navy blue": "#1c305c",
        'oldlace': "#fdf5e6",
        'olive': "#808000",
        'olivedrab': "#6b8e23",
        'orange': "#ffa500",
        'orangered': "#ff4500",
        'orchid': "#da70d6",
        'palegoldenrod': "#eee8aa",
        'palegreen': "#98fb98",
        'paleturquoise': "#afeeee",
        'palevioletred': "#d87093",
        'papayawhip': "#ffefd5",
        'peachpuff': "#ffdab9",
        'peru': "#cd853f",
        'pink': "#ffc0cb",
        'light pink': "#ffc0cb",
        'plum': "#dda0dd",
        'powderblue': "#b0e0e6",
        'purple': "#800080",
        'purble': "#800080",
        'rebeccapurple': "#663399",
        'red': "#ff0000",
        'rosybrown': "#bc8f8f",
        'royalblue': "#4169e1",
        'saddlebrown': "#8b4513",
        'salmon': "#fa8072",
        'sand': "#C2B280",
        'sandybrown': "#f4a460",
        'seagreen': "#2e8b57",
        'seashell': "#fff5ee",
        'sienna': "#a0522d",
        'silver': "#c0c0c0",
        'skyblue': "#87ceeb",
        "copper": "#b87333",
        'slateblue': "#6a5acd",
        'slategray': "#708090",
        "cornflowerblue": "#93CCEA",
        'snow': "#fffafa",
        'springgreen': "#00ff7f",
        'steelblue': "#4682b4",
        'tan': "#d2b48c",
        'teal': "#008080",
        'thistle': "#d8bfd8",
        'tomato': "#ff6347",
        'turquoise': "#40e0d0",
        'violet': "#ee82ee",
        'camel': "#DC7633",
        'wheat': "#f5deb3",
        'white': "#ffffff",
        'whitesmoke': "#f5f5f5",
        'yellow': "#ffff00",
        'yellowgreen': "#9acd32",
        'griege': "#FBEEE6",
        'off white': "#f8f8ff",
        'anthracite': "#383e42",
        "ecru": '#F3EFE0',
    };

    const history = useHistory()

    const [items, setItems] = useState()
    const [itemFormData, setItemFormData] = useState({
        itemName: '',
        description: '',
        price: '',
        seller: '',
        category: '',
        subcategory: '',
        colors: [],
        images: []
    })
    const [show, setShow] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseConfirmation = () => {
        setShowConfirmation(false)
        history.push('/admin')
    };
    const handleShowConfirmation = () => setShowConfirmation(true);

    useEffect(() => {

        Aos.init({
            duration: 1500,
            easing: 'ease'
        })

        const getAllItems = async () => {
            const response = await Axios.get("api/v1/items")
            console.log("🚀 ~ file: AdminProducts.js ~ line 18 ~ getAllItems ~ response", response)
            setItems(response.data.data.allItems)
        }

        getAllItems()
    }, [])

    const handleItemFormDataChange = (e) => {
        setItemFormData({...itemFormData, [e.target.name]: e.target.value})
        console.log('item-form-data', itemFormData)
    }

    const handleMultiSelectChange = (e) => {
        let options = e.target.selectedOptions
        console.log("🚀 ~ file: AdminProducts.js ~ line 213 ~ handleMultiSelectChange ~ options", options)
        let values = Array.from(options).map(({ value }) => value);
        console.log("🚀 ~ file: AdminProducts.js ~ line 215 ~ handleMultiSelectChange ~ values", values)
        setItemFormData({...itemFormData, colors: values})
    }

    const handleMultiFileInputChange = (e) => {
        let files = e.target.files;
        console.log("🚀 ~ file: AdminProducts.js ~ line 221 ~ handleMultiFileInputChange ~ files", Array.from(files).map(URL.createObjectURL))

        let imagesURLs = Array.from(files).map(URL.createObjectURL)

        setItemFormData({...itemFormData, images: imagesURLs})

    //     for (let i = 0; i < files.length; i++)
    //     {
    //         if (!files[i].type.match('image.*')) {
    //             continue;
    //         }

    //         let reader = new FileReader();

    //         // Closure to capture the file information.
    //         reader.onload = (function(theFile) {
    //             return function(e) {
    //                 //show url image
    //             var dataURL = reader.result;
    //             alert(dataURL);
    //             };
    //         })(files[i]);

    //         // Read in the image file as a data URL.
    //         reader.readAsDataURL(files[i]);
    // }

            // alert(files[i].name);
        }
    

    const removeItem = async (itemId) => {
        const response = await Axios.delete(`api/v1/items/${itemId}`)
        console.log("🚀 ~ file: AdminProducts.js ~ line 231 ~ removeItem ~ response", response)
    }

    const handleItemFormSubmit = (e) => {
        e.preventDefault()
        handleClose()
        handleShowConfirmation()
    }

    // function previewImages () {

    //     var preview = document.querySelector('#preview');
        
    //     if (this.files) {
    //       [].forEach.call(this.files, readAndPreview);
    //     }
      
    //     function readAndPreview(file) {
      
    //       // Make sure `file.name` matches our extensions criteria
    //       if (!/\.(jpe?g|png|gif)$/i.test(file.name)) {
    //         return alert(file.name + " is not an image");
    //       } // else...
          
    //       var reader = new FileReader();
          
    //       reader.addEventListener("load", function() {
    //         var image = new Image();
    //         image.height = 100;
    //         image.title  = file.name;
    //         image.src    = this.result;
    //         preview.appendChild(image);
    //       });
          
    //       reader.readAsDataURL(file);
          
    //     }
      
    // }

    // function previewFile(e) {
    //     var preview = e.target.nextElementSibling;
    //     var file = e.target.files[0];
    //     var reader = new FileReader();
      
    //     reader.onloadend = function() {
    //       preview.src = reader.result;
    //     }
      
    //     if (file) {
    //       reader.readAsDataURL(file);
    //     } else {
    //       preview.src = "";
    //     }
    // }
      

    return (
        <div>
            {items ? (
                <div style={{backgroundColor:'#f4f4f4'}}>
                    <AdminNavber />
                    <br />
                    <br />
                    <Container data-aos="fade">
                        <Button
                            id="add-item-btn"
                            onClick={handleShow}
                        >
                            ADD ITEM
                        </Button>
                        <br />
                        <br />
                        <Table bordered hover className="adminTable">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Item image</th>
                                    <th>Item Name</th>
                                    <th>Price</th>
                                    <th>Seller</th>
                                    <th>Control</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={item._id} className="tableRow">
                                        <td>{index + 1}</td>
                                        <td>
                                            <Image src={item.images[0]} id="table-image" />
                                        </td>
                                        <td>{item.itemName}</td>
                                        <td>{item.Price}</td>
                                        <td>{item.Seller}</td>
                                        <td>
                                            <FaEdit 
                                                size="20"  
                                                className="mr-2" 
                                                style={{cursor:'pointer'}}
                                                onClick={handleShow}
                                            />
                                            <MdClear 
                                                size="25" 
                                                style={{cursor:'pointer'}} 
                                                onClick={(itemId) => removeItem(item._id)} 
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Container>

                    <Modal show={show} size="lg" onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Item Form</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleItemFormSubmit}>
                                <Form.Group>
                                    <Form.Label>Item Name</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="itemName"
                                        value={itemFormData.itemName}
                                        placeholder="Item Name" 
                                        className="formInput" 
                                        onChange={handleItemFormDataChange}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="description"
                                        value={itemFormData.description}
                                        placeholder="Description" 
                                        className="formInput" 
                                        onChange={handleItemFormDataChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="price"
                                        value={itemFormData.price}
                                        placeholder="Price" 
                                        className="formInput" 
                                        onChange={handleItemFormDataChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Seller</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="seller"
                                        value={itemFormData.seller}
                                        placeholder="Seller" 
                                        className="formInput" 
                                        onChange={handleItemFormDataChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Add Item Image</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="images"
                                        value={itemFormData.images}
                                        placeholder="Image URL" 
                                        className="formInput" 
                                        onChange={handleItemFormDataChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control 
                                        as="select" 
                                        name="category"
                                        value={itemFormData.category}
                                        className="formInputSelect"
                                        onChange={handleItemFormDataChange}
                                    >
                                        <option className="selectOption">Men</option>
                                        <option className="selectOption">Women</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>SubCategory</Form.Label>
                                    <Form.Control 
                                        as="select" 
                                        name="subcategory"
                                        value={itemFormData.subcategory}
                                        className="formInputSelect"
                                        onChange={handleItemFormDataChange}
                                    >
                                        <option className="selectOption">T-Shirt</option>
                                        <option className="selectOption">Shirts</option>
                                        <option className="selectOption">Tops</option>
                                        <option className="selectOption">Tie-Die</option>
                                        <option className="selectOption">Pants</option>
                                        <option className="selectOption">Jeans</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Colors</Form.Label>
                                    <Form.Control 
                                        as="select" 
                                        name="colors"
                                        // value={itemFormData.colors}
                                        className="formInputSelect" 
                                        onChange={handleMultiSelectChange}
                                        multiple
                                    >
                                        {Object.keys(colors).map((color) => (
                                            <option 
                                                key={color} 
                                                value={color} 
                                                className="selectOption"
                                            >
                                                {color}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                {/* <Form.Group>
                                    <Form.File 
                                        label="Add Item Images" 
                                        name="images"
                                        // onChange={handleItemFormDataChange}
                                        onChange={handleMultiFileInputChange}
                                        multiple 
                                    />
                                    <div id="preview"></div>
                                </Form.Group> */}
                                <Button type="submit" className="itemFormSubmitBtn">
                                    Submit
                                </Button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={showConfirmation} size="lg" onHide={handleCloseConfirmation}>
                        <Modal.Body>
                            <div className="text-center">
                                <br />
                                <h3>Hurray!</h3>
                                <br />
                                <h5>Your Item will be published as soon as possible</h5>
                                <br />
                                <Image 
                                    src= {itemFormData.images}
                                    style={{height: '400px', marginBottom: '20px'}}
                                />
                                <h4>{itemFormData.itemName}</h4>
                                <h4>${itemFormData.price}</h4>
                                <br />
                                <section>
                                    <p>AVAILABLE COLORS</p>
                                    <br />
                                    <div style={{ textAlign: 'center' }}>
                                        {itemFormData.colors.map((color) => (
                                            <Button 
                                                key={color} 
                                                value={color}
                                                style={{width:"40px", height:"40px", backgroundColor:`${color}`, marginTop:"-35px", marginLeft: '10px', borderRadius:"3rem", cursor:"pointer", border:'none'}}
                                            />
                                        ))}
                                    </div>
                                </section>
                                <br />
                                <section>
                                    <p>AVAILABLE SIZES</p>
                                    {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                                        <Button 
                                            key={size}
                                            id="size-btn"
                                            name={size}
                                            value={size}
                                        >
                                            {size}
                                        </Button>
                                    ))}
                                </section>
                                <br />
                                <br />
                                <Button 
                                    onClick={handleCloseConfirmation}
                                    style={{
                                        backgroundColor: 'white',
                                        color: 'black',
                                        border: '2px solid black',
                                        borderRadius: '0px',
                                        width: '100px',
                                    }}
                                >
                                    Okay
                                </Button>
                                <br />
                                <br />
                            </div>
                        </Modal.Body>
                    </Modal>
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