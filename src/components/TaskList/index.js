import './index.css'

const TaskList = props => {
  const {taskDetails} = props
  const {taskInput, tagText} = taskDetails
  return (
    <li className="task-list">
      <p className="task">{taskInput}</p>
      <p className="task-type">{tagText}</p>
    </li>
  )
}
export default TaskList
