import { Link } from "react-router-dom";

function ProjPostComp(props) {
    

    
    return (
        <div style={{width:"90%", margin:"auto",borderStyle:"solid",borderWidth:"2px",borderColor:"purple"}}> 
           <u>Title:</u> {props.post.title} <br/>
           <u>Body :</u> {props.post.body}
        </div>
    )    
    
}
export default ProjPostComp;