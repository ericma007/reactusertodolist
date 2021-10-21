import ProjToDoListComp from "./ProjToDoList";
import ProjPostListComp from "./ProjPostList";
import {useLocation, useParams} from "react-router";
import { useState } from "react";
import { useEffect } from "react"
import ProjAddToDoComp from "./ProjAddToDo";
import ProjAddPostComp from "./ProjAddPost";

function ProjToDoPostListComp(props) {
    const [userTodos,setUserTodos]=useState([])
    const [userPosts,setUserPosts]=useState([])
    
    console.table(props)
    const {userId}=useParams()
    const location =useLocation()
    console.log("user: "+ userId)
    
    useEffect(()=>{
    setUserTodos(props.todos.filter(todo=>todo.userId ==userId)) 
    },[props.todos,location.pathname])

    useEffect (()=>{
    setUserPosts(props.posts.filter(post=>post.userId ==userId)) 
    },[props.posts,location.pathname])

    

    return (
         
             
    <div style={{display:"flex",flexDirection:"column"}}>
        <div style={{flexGrow:1}}>
            {/* check whether to display list of To Dos or Add To Do Screen */}
            {!location.pathname.toLowerCase().includes("addtodo") 
                ?<ProjToDoListComp todos={userTodos} fnComplete={props.fnComplete}/>
                :<ProjAddToDoComp fnAddTodo={props.fnAddTodo}/>
            }
        </div>
        <div style={{flexGrow:1}}>
        {!location.pathname.toLowerCase().includes("addpost")
            ?<ProjPostListComp posts={userPosts}/>
            :<ProjAddPostComp fnAddPost={props.fnAddPost}/>
        }
        </div>
    </div>
        
    )
        
    
}
export default ProjToDoPostListComp;