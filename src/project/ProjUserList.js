import ProjUserComp from "./ProjUser"
import { Link} from "react-router-dom";
import { Fragment } from "react";
import { useState,useEffect } from 'react' 
import {useLocation} from "react-router";

function ProjUserListComp(props) {

const [searchStr,setSearchStr]=useState("")
const [userList,setUserList]=useState(props.users)
const [selectedUserId,setSelectedUserId]=useState("")

const location=useLocation()


useEffect(()=> {


  //empty search string - display all list 
  if (!searchStr) {
    setUserList(props.users)
  }
  else {
   setUserList(props.users.filter((user) =>{return(   
        user.name.toLowerCase().includes(searchStr.toLowerCase())
        || user.email.toLowerCase().includes(searchStr.toLowerCase()))
      }))
  }

},[props.users,searchStr]) 

const fnDeleteUser =(id)=>{
  setSelectedUserId("")
  props.fnDeleteUser(id)
}

  return (
    <div style={{width:"75%", borderStyle:"solid",borderWidth:"2px",borderColor:"grey"}}>
      {console.log(location)}
      {/* Search Button */}
      Search:<input type="text" onChange={(e)=>setSearchStr(e.target.value)}/> 
      {/* Add Button */}
      <Link to="/addUser"><button>Add New User</button></Link><br/>
      <br/> 
      {userList.map((user)=>
        {
          //identify whether the user has still todos not completed
          let hasTodo=props.realTodos?.some(todo => (todo.userId===user.id))?true:false
          return (<Fragment key={user.id}> 
                  <ProjUserComp key={user.id} hasTodo={hasTodo} 
                  fnDeleteUser={fnDeleteUser} fnUpdateUser={props.fnUpdateUser} 
                    user={user} fnMarkSelectedUser={setSelectedUserId} isIdSelected={user.id==selectedUserId?true:false}/>
                  <br/>
                  </Fragment>)
        })
      }
    </div>
  );
}

export default ProjUserListComp;