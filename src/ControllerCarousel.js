import React from "react";
import {Component} from "react";
import Carousel from 'react-bootstrap/Carousel'
import image1 from './assets/Expenses-01.jpg'
import image2 from './assets/expenses-02.jpg'
import image3 from './assets/expense-03.png'
import image4 from './assets/expenses-04.jpg'


//this component is not being used currently
class ControlledCarousel extends Component {
    state = {  }
    render() { 
        return ( 
            <Carousel>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="expenses-04.jpg/800x400?text=First slide&bg=373940"
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="holder.js/800x400?text=Second slide&bg=282c34"
                    alt="Second slide"
                    />

                    <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="holder.js/800x400?text=Third slide&bg=20232a"
                    alt="Third slide"
                    />

                    <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
         );
    }
}
 
export default ControlledCarousel;