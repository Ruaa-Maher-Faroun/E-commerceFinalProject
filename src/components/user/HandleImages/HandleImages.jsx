import React from 'react'
import { Col, Row } from 'react-bootstrap'
import "./saleStyle.css"
export default function HandleImages({isSale,main,sub}) {
    const [shownImg, setShownImg] = React.useState(main.secure_url);
    const images = [main, ...sub]
    const handleChangeImage = (img) => {
        setShownImg(img);
        
    }
    
  return (
    <Row>
        <Col md={2} className='allImages'>
            <div className="imges d-flex flex-column">
                 {images.map(img => <img src={img.secure_url}
                 key={img.secure_url}
                 onClick={()=>handleChangeImage(img.secure_url)}
                  className={`${shownImg===img.secure_url ? "border border-dark":""}  mb-2`} 
                 style={{cursor: "pointer"}}
/>)
                 }
            </div>
        </Col>
        <Col md={9} className='shownImg'>
                 {isSale? <span className='saleBadge px-3 py-1'>Sale!</span>:""}
            <img src={shownImg} alt="product image" className='w-100'/>
        </Col>

    </Row>
  )
}
