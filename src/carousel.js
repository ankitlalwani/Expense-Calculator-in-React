import React,{Component} from "react";
import Carousel from 'react-bootstrap/Carousel'
import "react-image-gallery/styles/css/image-gallery.css"
import ImageGallery from 'react-image-gallery';
import image1 from './assets/Expenses-01.jpg'
import image2 from './assets/expenses-02.jpg'
import image3 from './assets/expense-03.png'
import image4 from './assets/expenses-04.jpg'


const images = [
    {
      original: image4
    },
    {
      original: image2
    },
    {
      original: image3
    },
  ];

class CarouselDemo extends Component {
    

    state = {  }
    render() {
        return (
            <ImageGallery items={images} />
        );
    }
}

 
export default CarouselDemo;