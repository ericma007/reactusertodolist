import { Link } from "react-router-dom";

function ProjToDoComp(props) {
    

    
    return (
        <div style={{width:"90%", margin:"auto",borderStyle:"solid",borderWidth:"2px",borderColor:"purple"}}> 
           Title: {props.todo.title} <br/>
           Completed : {props.todo.completed?"true":"false"}
           {!props.todo.completed && 
            <>
                <br/>
                 <input type="button" value="Mark as Completed" onClick={props.fnComplete}/>
                
            </>
           } 


        </div>
    )    
    
}
export default ProjToDoComp;