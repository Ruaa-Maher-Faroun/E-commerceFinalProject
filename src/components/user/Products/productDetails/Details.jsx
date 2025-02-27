import React, { useEffect, useState } from 'react'
import HandleImages from '../../HandleImages/HandleImages';
import ProductCategoryInModal from '../../ProductCategoryInModal/ProductCategoryInModal';
import AddToCartBtnModal from '../../AddToCartBtn/AddToCartBtnModal';
import ItemQuantityModal from '../../ItemQuantityModal/ItemQuantityModal';
import pp from "../../../../assets/pp.svg";
import master from "../../../../assets/master.svg";
import visa from "../../../../assets/visa.svg";
import { Button, Col, Container, Row } from 'react-bootstrap';



export default function Details({product})  {
    const [count, setCount] = useState(1);
    const [desc, setDesc] = useState("");
  
    useEffect(() =>{
        let i = 0;
        let des = "";
        if(product){
            while(product.description[i] != "."){
                des += product.description[i];
                i++;
            }

            setDesc(des+product.description[i] );
        }
    },[]);
    return (
    <section>
    <Container className='content my-5 flex-md-wrap'>
        <h2 className='my-5'>Home / Cosmetics</h2>

 <Row className='d-flex  justify-content-center'>
    <Col className='w-50 '>
    <HandleImages
    isSale={product.price !== product.finalPrice} main={product.mainImage} sub={product.subImages} />
    </Col>
    <Col className=''>
      <div className="product-content d-flex flex-column border-bottom pb-4">

        <h3 className='mb-4'>{product.name}</h3>
        <p className='fnt-bigger'>
          {product.price !== product.finalPrice ?
          <>
          <span className='text-gray'>
          <del>
            ${product.price}
          </del>
          </span>
          <span>
          &nbsp;	${product.finalPrice}
          </span>
          </>
          :
          `$${product.price}` 

        }
        </p>
        <p className='mb-4'>{desc}</p>
        <div className="btns d-flex align-items-center flex-column flex-md-row ">
        <ItemQuantityModal product={product} count={count} setCount={setCount}/>
        <AddToCartBtnModal productId={product._id}/>
        
        </div>
      </div>
      <div className="product-category mt-2">
        <span>
          Category: &nbsp;	
          <ProductCategoryInModal categoryId={product.categoryId}/>
          </span>
      </div>
      <div className="paymentMethod mt-2">
        
        <p>
        🔒 Safe & Secure Checkout
          </p>
          <div>
            <img src={visa} style={{width:"80px"}} />
            <img src={master} style={{width:"80px"}} />
            <img src={pp} style={{width:"80px"}} />
          </div>
          <ProductCategoryInModal categoryId={product.categoryId}/>
      </div>
    
    </Col>
   
  </Row>
 

    {/* <Card>
    <Card.Img variant="top" src={product.mainImage.secure_url} className='w-25' />
    <Card.Body>
      <Card.Title>{product.name}</Card.Title>
      <Card.Text>{product.price}</Card.Text>
      <Card.Text>{product.description}</Card.Text>
      <Button variant='dark' onClick={addProductToCart}>Add to Cart</Button>
     
    </Card.Body>
  </Card> */}
    </Container>

  </section>

  )
}
