import React,{Component} from "react";
import { Container} from "reactstrap";
import BackgroundSlider from 'react-background-slider'
import image4 from './assets/expenses-04.jpg'


class BgImage extends Component {
    render() { 
        return ( 
            <div>
            <Container>
            
            <BackgroundSlider
                images={[image4]}
                duration={10} transition={2} />
            </Container>
        </div>
         );
    }
}
 
export default BgImage;