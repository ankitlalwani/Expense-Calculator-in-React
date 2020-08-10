import React,{Component} from "react";
import AppNav from "./AppNav";
import CarouselDemo from "./carousel";
import Bgslider from "./Bgslider"
import ControlledCarousel from "./ControllerCarousel"
import BgImage from "./BgImage";
import PieChart from "./PieChart"

class Home extends Component {
    state = {  }
    render() { 
        return (  
            <div>
                <AppNav />
                <BgImage />
                <PieChart />
            </div>
        );
    }
}
 
export default Home;