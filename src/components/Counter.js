import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"

function Counter ({idx,value,handleIncreaseCounter,handleDecreaseCounter}) {

    const [count, setCount] = useState(value)
    
    const countPlus = () => {
        setCount(count + 1)
        handleIncreaseCounter({idx,count:count+1})
    }
    
    const countMinus = () => {
        if (count !== 1) {
            setCount(count - 1)
            handleDecreaseCounter({idx,count:count-1})

        }
    }

    return (
        <div>
            <Row className="ml-3">
                <Col sm='8' xs='8' md="6" id="counter" className="count">
                    <span style={{marginLeft:"-5px"}}> {count} </span>
                </Col>
                <Col sm='4' xs='4' md="6" className="ml-n4">
                    <button className="counter-button" onClick={countPlus}>
                        <AiOutlinePlus size="20px" />
                    </button>
                    <button className="counter-button" onClick={countMinus}>
                        <AiOutlineMinus size="20px" />
                    </button>
                </Col>
            </Row>
        </div>
    )
}

export default Counter;