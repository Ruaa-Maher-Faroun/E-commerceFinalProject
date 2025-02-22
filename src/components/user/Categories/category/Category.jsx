import React from 'react'
import { Col } from 'react-bootstrap'
import style from './category.module.css'
import { Link } from 'react-router-dom'

export default function Category({img,id}) {

  return (
    <Col>
    <Link to={`/categories/${id}`}>
       <img src={img} alt="" className={style.colImg} />
    </Link>
    </Col>
  )
}
