import { Link } from "react-router-dom";
function ProjUserButtonComp(props) {
  //Same component is ti used to display buttnos before and after other Data seaction in User 
  //buttnos are visible or hidden bdepending on if the other section data is displayed

 
  return (       
    <div style={{display:"table"}}>
          <div style={{display:"table-row"}}>
            {/* buttons are displayed depending upon other user data section expanded or collapsed */}
            <div style={{display:"table-cell",visibility:props.isFirstButtonRow?"visible":"hidden"}}> 
            <input type="button" value="Other Data" onClick={()=>{props.fnDisplayOther(false)}} 
                                  onMouseOver={()=>{props.fnDisplayOther(true)}} />
            </div> 
            <div style={{display:"table-cell",visibility:"hidden"}}>xxxxxxx</div>     
            <div style={{display:"table-cell",
                        visibility:((props.isFirstButtonRow && !props.showOther)||(!props.isFirstButtonRow))?"visible":"hidden"}}>
                        <input type="button" value="Update" onClick={()=>{props.updateUser(props.user)}}/>
                        <Link to="/" onClick={()=>{props.deleteUser(props.user)}}>
                          <button>Delete</button>
                        </Link>
            </div>
          </div>
    </div>
                
  );
}

export default ProjUserButtonComp;
