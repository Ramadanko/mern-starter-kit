import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Card, CardContent, Typography, CardActions } from '@material-ui/core'

const TaskList = ({ items, remove }) => {

  let history = useHistory()

  return (
    <div className="TaskList">
      {items.map((item, index) => (
        <Card key={index} className="card-item" variant="outlined">
          <CardContent>
            <Typography variant="h4">
              {item.title}
              <Typography variant="caption">
                <span className={`custom-badge ${item.status}`}>{item.status}</span>
              </Typography>
            </Typography>
            <Typography dangerouslySetInnerHTML={{ __html: item.description }}/>
            <CardActions>
              <Button size="small" color="primary" onClick={() => history.push(`/task/${item._id}`)}>
                Details
              </Button>
              <Button size="small" color="primary" onClick={() => history.push(`/task/edit/${item._id}`)}>
                Edit
              </Button>
              <Button size="small" variant="contained" color="secondary"
                      onClick={() => remove(item._id)}>remove</Button>
            </CardActions>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default TaskList
