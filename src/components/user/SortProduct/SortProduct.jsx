import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'

export default function SortProduct({dataNum}) {
    const sortingCriteria = ["popularity", "average rating", "latest", "price: low to high", "price: high to low"];
  return (
    <>
    <div className='d-flex justify-content-between w-100 align-items-center'>
        <div>
            <p>Showing all {dataNum} results</p>
        </div>
        <div>

            <Form.Select>
                    <option>Default select</option>
                {sortingCriteria.map((value, index) =><option key={index} value={value}>sort by {value}</option>)}
        
                </Form.Select>
        </div>
    </div>
    <hr />
    </>
  )
}
