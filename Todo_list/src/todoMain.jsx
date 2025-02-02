import { useEffect, useState } from "react";
import { List } from "./displayList";

function Main(){
    
    const [item,setItem] = useState("");
    const [data,setData] = useState([]);

    useEffect(
        () => { // json-server --watch ./Server/ToDoList.json --port 5777
            fetch("http://localhost:5777/todolist")
            .then(response => response.json())
            .then(content => {
             setData(content)})
        }
    , []);

     async function addItem(name){
        const newData = {id:crypto.randomUUID(),name,completed:false}
        await fetch("http://localhost:5777/todolist",
        {method:'POST','Content-Type':'application/json','body':JSON.stringify(newData)}
        )
        .then(response => response.json())
        .catch(console.error)

        setData((previousState) => [...previousState,newData])
    }
    return (
        <>
        <form  method="post" onSubmit={(ev) => {ev.preventDefault();addItem(item);setItem("");}}>
        Enter the item
        <input type="text" id="itemip" value={item} onChange={(event) => setItem(event.target.value)}/>
        <button >Add</button>
        </form>
        {data.length !== 0 && <List data={data} dataHandler = {setData}></List>}
        </>
    );
}


export default Main;