import React from 'react'
import { Switch, Route } from 'react-router-dom'
import loadable from '@loadable/component';
import BackdropLoader from '../../common/BackdropLoader/BackdropLoader'
import taskInterface, { taskStatusOptions } from './TaskInterface'
import './Task.scss'

const fallback = <BackdropLoader />
const Task = loadable(() => import('../Task/Task'), { fallback })
const TaskDetail = loadable(() => import('../Task/TaskDetail'), { fallback })
const ManageTask = loadable(() => import('../Task/ManageTask'), { fallback })

const TaskRoute = () => {
  return (
    <Switch>
      <Route path="/task/create"
        render={(routeProps) =>
          <ManageTask taskInterface={taskInterface} taskStatusOptions={taskStatusOptions} {...routeProps} />} />
      <Route path="/task/edit/:id" render={(routeProps) =>
        <ManageTask taskInterface={taskInterface} taskStatusOptions={taskStatusOptions} {...routeProps} />} />
      <Route path="/task/:id" component={TaskDetail} />
      <Route path="/task" component={Task} />
    </Switch>
  )
}

export default TaskRoute
