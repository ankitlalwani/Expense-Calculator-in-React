import React,{Component} from "react";
import { Container} from "reactstrap";
import BackgroundSlider from 'react-background-slider'
import image4 from './assets/expenses-04.jpg'


class BgImage extends Component {
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
 
export default BgImage;