import { useState } from 'react'
import { Link} from "react-router-dom";
import ProjUserButtonComp from './ProjUserButton';
import ProjUserOtherComp from './ProjUserOther';
 
function ProjUserComp(props) {
  const [user,setUser]=useState(props.user)
  const [showOther,setShowOther]=useState(false)
  

  const updateLocalUser=(address1) => {
    setUser({...user,address:address1})
  }
  
  const displayOther =(x) =>{ 
    setShowOther(x)
  }

  //users with uncompleted todos will have a red border
  let colorHasTodo=props.hasTodo?"red":"green"
  let UserBackgroundColor=props.isIdSelected?"orange":"initial"
  
  return (
    <div style={{borderWidth:"2px",borderStyle:"solid",backgroundColor:UserBackgroundColor,borderColor:colorHasTodo}}>
      <Link to={'/todopostlist/'+props.user.id} style={{ textDecoration: 'none' }}> 
             <span title="Click to display To Dos and Posts" onClick={()=>props.fnMarkSelectedUser(props.user.id)}>ID: {props.user.id} </span>
       </Link><br/>
      Name: <input type="text" value={user.name} onChange={(e)=>setUser({...user,name:e.target.value})}/><br/>    
      Email: <input type="text" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})}/><br/> <br/>
      
            
      <ProjUserButtonComp  key="1" updateUser={props.fnUpdateUser} deleteUser={props.fnDeleteUser}
                          isFirstButtonRow={true} showOther={showOther} fnDisplayOther={displayOther} user={user}/>
      {/* displayed only when other data section is displayed */}
      {showOther && <ProjUserOtherComp  updateLocalUser={updateLocalUser} user={user}/> }
      {showOther && <ProjUserButtonComp  key="2" updateUser={props.fnUpdateUser} deleteUser={props.fnDeleteUser}
                          isFirstButtonRow={false} showOther={showOther} fnDisplayOther={displayOther} user={user}/>}
    </div> 
  );
}
export default ProjUserComp;