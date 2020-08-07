import React from 'react';
import { Link } from 'react-router-dom'

const TaskList = ({ items, remove }) => {

  return (
    <div>
      {items.map((item, index) => (
        <div key={index} className="task-item">
          <h3>{item.title}</h3>
          <p>{item.status}</p>
          <Link to={`/task/${item._id}`}>Details</Link> |
          <Link to={`/task/edit/${item._id}`}>Edit</Link>
          <button onClick={() => remove(item._id)}>remove</button>
        </div>
      ))}
    </div>
  )
}

export default TaskList;
