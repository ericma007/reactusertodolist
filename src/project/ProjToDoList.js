import ProjToDoComp from "./ProjToDo";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

function ProjToDoListComp(props) {    
    const {userId}=useParams()
    return (
     <div>
       <table style={{width:"75%"}}> 
          <tbody> 
            <tr> 
            <td> Todos: user Id {userId}</td>
              <td style={{textAlign:"right"}}>
                <Link to={`/addtodo/${userId}`}><button>Add</button></Link>
              </td>
            </tr>
          </tbody>
       </table>
       <div style={{width:"75%", borderStyle:"solid",borderWidth:"2px",borderColor:"black"}}>
      
      <br/>
      {props.todos.map((todo)=>
        {
          return (<Fragment key={todo.id}> 
                  <ProjToDoComp key={todo.id}  todo={todo} fnComplete={()=>props.fnComplete(todo.id)}/>
                  <br/>
                  </Fragment>)
        })
      }
    </div>
  
        </div>
    )    
    
}
export default ProjToDoListComp;