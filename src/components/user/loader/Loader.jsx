import Spinner from 'react-bootstrap/Spinner';
import React from 'react'

export default function Loader() {
  return (
    <section className="loader d-flex align-items-center justify-content-center">
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </section>
  );
}

