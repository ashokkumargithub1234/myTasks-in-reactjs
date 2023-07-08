import './index.css'

const TagItem = props => {
  const {tagDetails, onClickTagData, isActive} = props
  const tagButtonClassName = isActive ? 'button active' : 'button not-active'
  const onClickedTag = () => {
    onClickTagData(tagDetails.optionId, tagDetails.displayText)
  }
  return (
    <li className="tag-list">
      <button
        type="button"
        onClick={onClickedTag}
        className={tagButtonClassName}
      >
        {tagDetails.displayText}
      </button>
    </li>
  )
}
export default TagItem
