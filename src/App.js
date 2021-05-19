import './App.css'
import {useState,useEffect} from 'react'

// get data from ls
const getLocalItems = ()=>{
  let list = localStorage.getItem('lists')
  console.log(list)
  if(list){
    return JSON.parse(localStorage.getItem('lists'))
  }else{
    return []
  }
}

function App() {
  const [toDos,setToDos]= useState(getLocalItems())
  const [toDo,setToDo]= useState('')
  // add data to local storage
  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(toDos))
  }, [toDos])
  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Let's plan someThing 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input value={toDo} onChange={(e)=>setToDo(e.target.value)} type="text" placeholder="🖊️ Add item..." />
        <i onClick={()=>{
          if(toDo.length>0){
            setToDos([...toDos,{id:Date.now(),text:toDo,status:false}])
        setToDo('')
          }
        }} 
        className="fas fa-plus"></i>
      </div>
      <div className="todos">
        {
          toDos.map((obj)=>{
            return(
              <div className="todo">
                <div className="left">
                  <input onChange={(e)=>{
                    console.log(e.target.checked)
                    console.log(obj)
                    setToDos(toDos.filter(obj2=>{
                      if(obj2.id===obj.id){
                        obj2.status=e.target.checked
                      }
                      return obj2
                    }))
                  }} value={obj.status} type="checkbox" name="" id="" />
                  <p style={{textDecoration : obj.status ? "line-through" : "",color : obj.status ? 'gray' : ""}}>{obj.text}</p>
                </div>
                <div className="right">
                  <i onClick={()=>{
                    setToDos(toDos.filter(obj2=>{
                      if(obj2.id===obj.id){
                        obj2=''
                      }
                      return obj2
                    }))
                  }} className="fas fa-times"></i>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
