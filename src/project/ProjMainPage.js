
import axios from 'axios';
import {useEffect, useRef, useState } from 'react';
import {Route,Switch } from 'react-router-dom';
import ProjAddUserComp from './ProjAddUser';
import ProjUserListComp from './ProjUserList';
import ProjToDoPostListComp from './ProjToDoPostList';

function ProjMainPageComp() {
  const [users,setUsers]=useState([])  //maintained list of users
  
  const [maxId,setMaxId]=useState(0)  //will be maintained and used to define the id of a new user
  const [maxTodoId,setMaxTodoId]=useState(0)
  const [maxPostId,setMaxPostId]=useState(0)


  const [todos,setTodos]=useState([])
  const [posts,setPosts]=useState([])
  
  const origUserlist=useRef([]) //original list of users retrieved from DB



  //initial user initialization from web sources and set local db
  useEffect(() => {
    async function downloadUsers ()
    {
      try {
        let resp= await axios.get("https://jsonplaceholder.typicode.com/users")
        console.log(resp.data)   
        setUsers(resp.data)
        return new Promise (resolve => resolve(resp.data)) //list of original users 
      } catch (error) {
        console.log("Download Initial Users failed")
      }      
    }

    async function downloadTodos (users1)
    {
      try {
        let resp= await axios.get("https://jsonplaceholder.typicode.com/todos")
        console.log(resp.data)
        let allToDos=resp.data
        let smallToDoList=[]
        console.log("users length "+users.length)
        users1.forEach(user=>{
          //get first 3 todos for each user
          console.log(allToDos.filter(todo=>todo.userId===user.id).slice(0,3))
          smallToDoList=smallToDoList.concat(allToDos.filter(todo=>todo.userId===user.id).slice(0,3))
        })
        console.log(smallToDoList)
        setTodos(smallToDoList)
        
      } catch (error) {
        console.log("Download Initial todos failed")
      }
        
    }

    async function downloadPosts (users1)
    {
      try {
        let resp= await axios.get("https://jsonplaceholder.typicode.com/posts")
        console.log(resp.data)
        let allPosts=resp.data
        let smallPostList=[]
        users1.forEach(user=>{
          //get first 3 todos for each user
          console.log(allPosts.filter(post=>post.userId===user.id).slice(0,3))
          smallPostList=smallPostList.concat(allPosts.filter(post=>post.userId===user.id).slice(0,3))
        })
        console.log(smallPostList)
        setPosts(smallPostList)
      } catch (error) {
        console.log("Download Initial posts failed")
      } 
    }


   downloadUsers().then(users1 => {
     downloadTodos(users1)
     downloadPosts(users1)
    })
   
   
 
    
   console.log("first useeffect")
  }
  ,[]);

 
 


  //Update User Properties Name/Email/etc..
const updateUser=(user)=>{
    let indexToUpdate=users.findIndex((item)=>item.id===user.id)
    let updatedUsers=[...users]
    updatedUsers.splice(indexToUpdate,1,user)
    setUsers(updatedUsers)
}  

  //mark to do as completed
  const completeToDo= (id) => {
    let indexToUpdate=todos.findIndex((todo)=> todo.id==id)
    let completedTodo={...todos[indexToUpdate],completed:true}
    console.log(completedTodo)
    let updatedTodos=[...todos]
    updatedTodos.splice(indexToUpdate,1,completedTodo)
    console.log(updatedTodos)
    setTodos(updatedTodos)
  }


  //Delete User 
  const deleteUser=(user) =>{

    let arrPosts=posts.filter((item)=>item.userId !==user.id)
    setPosts([...arrPosts])
    let arrTodos=todos.filter((item)=>item.userId !==user.id)
    setTodos([...arrTodos])
    let indexToDelete=users.findIndex((item)=>item.id===user.id )

    //a user was already deleted before a first user was added
    if (maxId==0) setMaxId(getMaxId())

    setUsers(users=> {
        let newUsers=[...users]
        newUsers.splice(indexToDelete,1)
        return newUsers})
    }
  
const addTodo= (newTodo) => {
      
   newTodo.id=getMaxTodoId()+1

   setMaxTodoId(newTodo.id)
   setTodos(todos => {return[...todos,newTodo]})
}

const addPost= (newPost) => {
      
  newPost.id=getMaxPostId()+1

  setMaxTodoId(newPost.id)
  setPosts(posts => {return[...posts,newPost]})
}

  //Add new user 
  const addUser=(user) => {
      let newUser=user
      //Create ID for user
      
      newUser.id=getMaxId()+1
      setMaxId(newUser.id)
      setUsers(users => {return[...users,newUser]})
  }

  
  //Generic Max Function
  const getMaxGenId=(maxGenId,listGen,setMaxFn)=> {
    if (maxGenId==0) {
      let max=Math.max(...listGen.map((x) =>(x.id)))
      setMaxFn(max)
      return max
    }
    else return maxGenId
  }

//get maxID and return the max user id if not initailized previously
const getMaxId=()=> {
  return getMaxGenId(maxId,users,setMaxId) 
}

const getMaxTodoId=() => {
  return getMaxGenId(maxTodoId,todos,setMaxTodoId)
}

const getMaxPostId=() => {
  return getMaxGenId(maxPostId,posts,setMaxPostId)
}





  return ( 
        <div>    
          <div style={{width:"50%",float:"left"}}>
              <ProjUserListComp users={users} realTodos={todos.filter(todo=>todo.completed===false)} fnUpdateUser={updateUser} fnDeleteUser={deleteUser}/>
          </div>
          <div style={{width:"50%",float:"right"}}>
          <Switch>
              <Route exact path="/" component={()=> {return null}}/>
              <Route path="/addUser">
                      <ProjAddUserComp fnAddUser={addUser} /> 
              </Route>
              <Route path="/addtodo/:userId">
                      <ProjToDoPostListComp  todos={todos} posts={posts} fnAddTodo={addTodo} />
              </Route>
              <Route path="/addpost/:userId">
                      <ProjToDoPostListComp  todos={todos} posts={posts} fnAddPost={addPost} />
              </Route>
              <Route path="/todopostlist/:userId"> 
                      <ProjToDoPostListComp  todos={todos} posts={posts} fnComplete={completeToDo} />
              </Route>

          </Switch>
          </div>
          
        </div>
  );
}

export default ProjMainPageComp;