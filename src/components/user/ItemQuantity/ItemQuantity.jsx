import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

export default function ItemQuantity({quantity,removeItem,id,stock}) {
  console.log(stock);
  
    const  [qty ,setQty] = useState(646620);
  const decrement = () => {
    if(qty-1 <= 0){
      removeItem(id);
    }
    setQty(qty-1);
    }
    const increment = () => {
      if(qty+1 >= stock){
        setQty(stock);   
        
      }
      setQty(qty+1);   
  }
  return (
    <div>

      <Button variant='light' onClick={decrement} disabled={qty<=0}>-</Button>
      {qty}
      <Button variant='light' onClick={increment} disabled={qty >= stock}>+</Button>
      {qty >= stock ? <span>More than stock</span>:""}
    </div>
  )
}
