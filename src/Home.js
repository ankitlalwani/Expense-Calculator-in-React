import React,{Component} from "react";
import AppNav from "./AppNav";
import CarouselDemo from "./carousel";
import Bgslider from "./Bgslider"
import ControlledCarousel from "./ControllerCarousel"
import BgImage from "./BgImage";
import PieChart from "./PieChart"
import { Container } from "reactstrap";
import DemoVideo from "./DemoVideo";
import PieChart1 from "./PieChart1";

class Home extends Component {
    
    constructor(props){
        super(props);
   
        this.state = {
            user: {username:sessionStorage.getItem('username'),password:''},
            errors: {}
        }
    }

    render() { 
        const username = this.state.user.username;

        if(!username){
            return(
                <div>
                <AppNav />
                <BgImage />
            </div>
            )
        }
        return (  
            <div>
                <AppNav />
                <BgImage />
                <Container style={{height: "60%"}}>
                <PieChart1 />
                </Container>
            </div>
        );
    }
}
 
export default Home;