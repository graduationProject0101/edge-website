import React from 'react'
import { Image } from 'react-bootstrap'
// import ItemPic1 from '../img/item_pic1.jpg'
// import ItemPic2 from '../img/item_pic2.jpg'
// import ItemPic3 from '../img/item_pic3.jpg'
// import ItemPic4 from '../img/item_pic4.jpg'
// import blackTshirt from '../img/item1.jpg'

function Item(props) {

    // let itemPics = [ItemPic1, ItemPic2, ItemPic3, ItemPic4]

    const {itemName, price, image, style} = props

    return (
        <div>
            <Image
                src={image}
                alt="Item1"
                id="item-pic"
                style={style}
            />
            <br />
            <br />
            <h5>{itemName}</h5>
            <h6>{`$${price}`}</h6>
        </div>
    )
}

export default Item
