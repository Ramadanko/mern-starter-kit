import React from 'react'
import { Switch, Route } from 'react-router-dom'
import loadable from '@loadable/component';
import BackdropLoader from '../../common/BackdropLoader/BackdropLoader'

const fallback = <BackdropLoader/>
const Task = loadable(() => import('../Task/Task'), { fallback });
const TaskDetail = loadable(() => import('../Task/TaskDetail'), { fallback });

const TaskRoute = () => {
  return (
    <Switch>
      <Route path="/task/:id" component={TaskDetail} />
      <Route path="/task" component={Task} />
    </Switch>
  )
}

export default TaskRoute;
