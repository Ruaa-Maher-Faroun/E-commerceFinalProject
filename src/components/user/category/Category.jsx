import React from 'react'
import { Col } from 'react-bootstrap'
import style from './category.module.css'

export default function Category({img}) {
  return (
    <Col>
       <img src={img} alt="" className={style.colImg} />
    </Col>
  )
}
