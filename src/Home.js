import React,{Component} from "react";
import AppNav from "./AppNav";
import CarouselDemo from "./carousel";
import Bgslider from "./Bgslider"


class Home extends Component {
    state = {  }
    render() { 
        return (  
            <div>
                <AppNav />
                <CarouselDemo />
                <Bgslider />
            </div>
        );
    }
}
 
export default Home;