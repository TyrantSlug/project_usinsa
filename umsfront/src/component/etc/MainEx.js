import React from 'react'
import { Carousel } from 'react-bootstrap';

function MainEx() {
  return (
    <Carousel>
    <Carousel.Item>
    <div className="text-center">

      <img
        className="d-block"
        style={{ width: '1920px', height: '900px', objectFit: 'cover'}}
        src="https://img3.goodfon.com/original/1920x1080/f/eb/adidas-adidas-logotip-polosy.jpg"
        alt="First slide"
      />
      <Carousel.Caption>
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption>
      </div>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block "
        style={{ width: '1920px', height: '900px' , objectFit: 'cover'}}
        src="https://rare-gallery.com/uploads/posts/558885-nike-free-backgrounds.jpg"
        alt="Nike x spider-man"
      />

      <Carousel.Caption >
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption>
      
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block"
        style={{ width: '1920px', height: '900px' , objectFit: 'cover'}}
        src="https://images.hdqwalls.com/download/spiderman-miles-morales-nike-air-jordan-ap-1920x1080.jpg"
        alt="Nike x spider-man"
      />

      <Carousel.Caption>
        <h3>Nike x spider-man</h3>
        <p>
          한정판매
        </p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
);
  
}

export default MainEx