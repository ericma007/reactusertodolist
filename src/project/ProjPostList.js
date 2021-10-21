import ProjPostComp from "./ProjPost";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";


function ProjPostListComp(props) {
    const {userId}=useParams()
    return (
     <div>
       <table style={{width:"75%"}}> 
          <tbody> 
            <tr> 
            <td> Posts: user Id {userId}</td>
              <td style={{textAlign:"right"}}>
                <Link to={`/addpost/${userId}`}><button>Add</button></Link>
              </td>
            </tr>
          </tbody>
       </table>
       <div style={{width:"75%", borderStyle:"solid",borderWidth:"2px",borderColor:"black"}}>
      
      <br/>
      {props.posts.map((post)=>
        {
          return (<Fragment key={post.id}> 
                  <ProjPostComp key={post.id}  post={post} />
                  <br/>
                  </Fragment>)
        })
      }
    </div>
  
        </div>
    )    
}
export default ProjPostListComp;