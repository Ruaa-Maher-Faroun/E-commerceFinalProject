import Spinner from 'react-bootstrap/Spinner';
import React from 'react'

const Loader = () => {
  return (
    <section className="loader d-flex align-items-center justify-content-center">
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </section>
  );
}

export default Loader;