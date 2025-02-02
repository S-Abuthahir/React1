import { useState,useEffect } from "react";
//import Item from "./Item";


function List({ data,dataHandler:setData }){
    
    function deleteHandler(id){
        const newData = data.filter((obj) => obj.id !== id)
        fetch("http://localhost:5777/todolist/"+id,
        {method:'DELETE','Content-Type':'application/json'})
        .catch(console.error);
        setData(newData)
    }
    return (
        <table border={1}>
            <tr>
                <th>Completed</th><th>Task</th><th>Delete</th></tr>
                { 
                data.map((todos) => (
                <tr key={todos.id}>
                <td><input  type="checkbox" defaultChecked={todos.completed} onChange={
                   (event) => {
                    
                    const newData = data.map((obj) => (obj.id === todos.id)?{...obj, completed:!obj.completed}:obj)
                    const thatData = data.filter((obj) => obj.id === todos.id)
                    fetch("http://localhost:5777/todolist/"+todos.id,
                        {method:'PUT','Content-Type':'application/json','body':JSON.stringify({...thatData[0],'completed':event.target.checked})}
                    )
                    setData(newData);
                }
                }/></td>
                <td>{todos.name}</td>
                <td><button onClick={() => deleteHandler(todos.id)}>Delete</button></td>
                </tr>
            ))
            }
        </table>
    );
}

export {List,};