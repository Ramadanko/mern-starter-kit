import React, { useState, useEffect } from 'react'
import { ResponsivePie } from '@nivo/pie'
import { getTasksStatus } from './TaskApi'

const TaskStatus = () => {

  let [count, setCount] = useState(null)
  let [data, setData] = useState([])

  useEffect(() => {

    getTasksStatus()
      .then(res => {
        let { items } = res.data
        let chartData = [
          { id: 'open', label: 'Open', value: items.open},
          { id: 'inProgress', label: 'In Progress', value: items.inProgress},
          { id: 'done', label: 'Done', value: items.done}
        ]
        setData(chartData)
        setCount(items.count)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div style={{height:'300px'}}>
      {
        !data.length ?
          'Loading...' :
          <>
            <h3>{count} Tasks</h3>
            <ResponsivePie data={data}/>
          </>
      }
    </div>
  )
}
export default TaskStatus
