import React from 'react'
import { Button } from 'react-bootstrap'

export default function ItemQuantity({qty}) {
  return (
    <div>

      <Button variant='light'>-</Button>
      {qty}
      <Button variant='light'>+</Button>
    </div>
  )
}
