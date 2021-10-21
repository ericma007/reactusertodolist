import { Link } from "react-router-dom"
import { useParams } from "react-router"
import { useState } from "react"

function ProjAddPostComp({fnAddPost}) {
    const {userId}=useParams()
    
    const [post,setPost]=useState({userId:0})


    const addPost = ()=> {
        fnAddPost(post)
    }

    return (
        <div>
        New Post: user {userId}
        <div style={{width:"75%", borderStyle:"solid",borderWidth:"2px",borderColor:"black"}}>     
            <table style={{width:"100%"}}>
                <tbody>
                    <tr>
                        <td><u>Title</u> :</td>
                        <td> <input type="text" size="30" onChange={(e)=>{setPost({...post,userId:parseInt(userId),title:e.target.value})}}/></td>
                    </tr>
                    <tr>
                        <td><u>Body</u> :</td> 
                        <td><textarea  rows="4" onChange={(e)=>{setPost({...post,userId:parseInt(userId),body:e.target.value})}}/></td>
                    </tr>
                    <tr>
                        <td/>
                        <td style={{textAlign:"right"}}>
                        <Link to={"/todopostlist/"+userId}><button>Cancel</button></Link> 
                        <Link to={"/todopostlist/"+userId} onClick={addPost}><button>Add</button></Link></td>
                    </tr>
                </tbody>
            </table> 
        </div>
        </div>
    )     
    
}
export default ProjAddPostComp;