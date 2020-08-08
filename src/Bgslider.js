import React,{Component} from "react";
import AppNav from "./AppNav";
import { Container} from "reactstrap";
import BackgroundSlider from 'react-background-slider'
import image1 from './assets/Expenses-01.jpg'
import image2 from './assets/expenses-02.jpg'
import image3 from './assets/expense-03.png'
import image4 from './assets/expenses-04.jpg'
import CarouselDemo from "./carousel";

class Bgslider extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
            <Container>
            <section>
                <div>
            <BackgroundSlider
                images={[image4]}
                duration={5} transition={2} />
            </div>
            </section>
            </Container>
        </div>
         );
    }
}
 
export default Bgslider;