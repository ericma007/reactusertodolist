import { useState } from 'react'
import { Link} from 'react-router-dom'

function ProjAddUserComp(props) {
 const [user,setUser]=useState({})
 
function saveUser() {
    props.fnAddUser(user)
}
  

  return (
    <div>
      
      Name: <input type="text"  onChange={(e)=>{setUser({...user,name:e.target.value})}}/><br/>    
      Email: <input type="text" onChange={(e)=>{setUser({...user,email:e.target.value})}}/><br/> <br/>
      <table style={{tableLayout:"fixed",width:"100%"}}>
        <tbody> 
        <tr >
         <td style={{visibility:"hidden"}}>xxxxx</td>
         <td> 
        <Link to="/"><button>Cancel</button></Link>
        <Link to="/" onClick={saveUser}><button>Add</button></Link>
        </td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ProjAddUserComp;