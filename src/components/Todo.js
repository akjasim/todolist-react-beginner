import React from "react";

const Todo = (props) => {
    return (
        <div className="todo">
          <div>
            {props.completed ? <span style={{textDecoration: 'line-through'}} onClick={props.strike}>{props.title}</span> : <span onClick={props.strike}>{props.title}</span>}
          </div>
          <div>
            <button className="update-btn todo-btn" onClick={props.update}>Update</button>
            <button className="delete-btn todo-btn" onClick={props.delete}>Delete</button>
          </div>
        </div>
    )
}

export default Todo;