import { useParams } from "react-router";
import { useState } from "react";
import { Link } from "react-router-dom";

function ProjAddToDoComp({fnAddTodo}) {
    const {userId}=useParams()
    
    const [todo,setTodo]=useState({userId:0,completed:false})


    const addTodo = ()=> {
        fnAddTodo(todo)
    }

    return (
        <div>
        New To Do: user {userId}
        <div style={{width:"75%", borderStyle:"solid",borderWidth:"2px",borderColor:"black"}}>     
            <table style={{width:"100%"}}>
                <tbody>
                    <tr>
                        <td>Title : <input type="text" size="30" onChange={(e)=>{setTodo({...todo,userId:parseInt(userId),title:e.target.value})}}/></td>
                    </tr>
                    <tr>
                        <td style={{textAlign:"right"}}>
                        <Link to={"/todopostlist/"+userId}><button>Cancel</button></Link> 
                        <Link to={"/todopostlist/"+userId} onClick={addTodo}><button>Add</button></Link></td>
                    </tr>
                </tbody>
            </table> 
        </div>
        </div>
    )     
    
}
export default ProjAddToDoComp;