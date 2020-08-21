import React,{Component} from "react";
import video01 from "./assets/ExpenseTracker_Demo.mov"

class DemoVideo extends Component {
    state = {  }
    render() { 
        return ( 
            <div style={{alignItems: "center", paddingTop: "5%", width: "100%", paddingLeft: "20%"}}>
                <video src={video01} width="60%" height="60%" controls="controls" autoplay="true" />
            </div>
         );
    }
}
 
export default DemoVideo;
