import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TaskList from '../TaskList'
import TagItem from '../TagItem'
import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class TasksContainer extends Component {
  state = {
    taskInput: '',
    tagId: tagsList[0].optionId,
    tasksList: [],
    activeTag: 'no-active-tag',
  }

  onEnterTask = event => {
    this.setState({taskInput: event.target.value})
  }

  changeTag = event => {
    this.setState({tagId: event.target.value})
  }

  submitTask = event => {
    event.preventDefault()
    const {taskInput, tagId, tasksList} = this.state
    // console.log(tagId)
    const index = tagsList.findIndex(eachList => eachList.optionId === tagId)
    const text = tagsList[index].displayText
    const taskDetails = {
      id: uuidv4(),
      taskInput,
      tagId,
      tagText: text,
    }
    this.setState({
      tasksList: [...tasksList, taskDetails],
      taskInput: '',
      tagId: tagsList[0].optionId,
    })
  }

  onClickTagData = id => {
    this.setState(prevState => ({
      activeTag: prevState.activeTag === id ? 'no-active-tag' : id,
    }))
  }

  renderNoTaskView = () => (
    <div className="empty-container">
      <p className="no-task-text">No Tasks Added Yet</p>
    </div>
  )

  renderTagsTasksView = filteredTasks => (
    <ul className="tasks-list-container">
      {filteredTasks.map(eachTask => (
        <TaskList key={eachTask.id} taskDetails={eachTask} />
      ))}
    </ul>
  )

  renderFilterTasks = (activeTag, tasksList) => {
    const filtered =
      activeTag === 'no-active-tag'
        ? tasksList
        : tasksList.filter(eachTask => eachTask.tagId === activeTag)
    return filtered
  }

  render() {
    const {taskInput, tagId, tasksList, activeTag} = this.state
    const filteredTasks = this.renderFilterTasks(activeTag, tasksList)

    return (
      <div className="task-container">
        <form className="create-container" onSubmit={this.submitTask}>
          <h1 className="heading">Create a task</h1>
          <div className="task-input-container">
            <label className="task-header" htmlFor="task">
              Task
            </label>
            <input
              type="text"
              id="task"
              className="task-input"
              onChange={this.onEnterTask}
              placeholder="Enter the task here"
              value={taskInput}
            />
          </div>
          <div className="task-input-container">
            <label className="task-header" htmlFor="select">
              Tags
            </label>
            <select
              id="select"
              className="task-input tag-input"
              value={tagId}
              onChange={this.changeTag}
            >
              {tagsList.map(eachData => (
                <option key={eachData.optionId} value={eachData.optionId}>
                  {eachData.displayText}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="add-task-Button">
            Add Task
          </button>
        </form>
        <div className="tags-list-container">
          <h1 className="title">Tags</h1>
          <ul className="tags-container">
            {tagsList.map(eachTag => (
              <TagItem
                key={eachTag.optionId}
                tagDetails={eachTag}
                onClickTagData={this.onClickTagData}
                isActive={activeTag === eachTag.optionId}
              />
            ))}
          </ul>
          <h1 className="title">Tasks</h1>
          {tasksList.length === 0
            ? this.renderNoTaskView()
            : this.renderTagsTasksView(filteredTasks)}
        </div>
      </div>
    )
  }
}
export default TasksContainer
