import { useState } from "react"
import { useEffect } from "react/cjs/react.development";

function ProjUserOtherComp(props) {
  

 const [address1,setAddress1]=useState(props.user.address)
 
 //update user upon change address 1 
 useEffect(()=>{
  props.updateLocalUser(address1)
 },[address1])


 return(
       <div style={{width:"75%",backgroundColor:"lightgrey",borderWidth:"2px",borderStyle:"solid",borderColor:"black"}}>
                    Street:<input type="text" value={address1?.street} 
                    onChange={(e)=> {setAddress1({...address1,street:e.target.value})}}/><br/>
                    City:<input type="text" value={address1?.city} 
                    onChange={(e)=> {setAddress1({...address1,city:e.target.value})}}/><br/>
                    Zip Code:<input type="text" value={address1?.zipcode} 
                    onChange={(e)=> {setAddress1({...address1,zipcode:e.target.value})}}/><br/>
      </div>
          
  
    
  
  );
}

export default ProjUserOtherComp;
