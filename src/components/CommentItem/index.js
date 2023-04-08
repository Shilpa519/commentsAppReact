import './index.css'

const CommentItem = props => {
  const {commentDetails, toggleIsLiked, deleteComment} = props
  const {id, name, comment, date, isLiked, initialClassName} = commentDetails

  console.log(isLiked)

  const likeImageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const onClickOfLike = () => {
    toggleIsLiked(id)
  }

  const onDelete = () => {
    deleteComment(id)
  }

  return (
    <li className="comment-container">
      <div className="names-date">
        <p className={initialClassName}>{name[0]}</p>
        <p className="name">{name}</p>
        <p className="date-details">{date}</p>
      </div>
      <div>
        <p className="comment">{comment}</p>
      </div>
      <div className="like">
        <button type="button" onClick={onClickOfLike}>
          <img src={likeImageUrl} alt="like" className="like-image" />
        </button>
        <button type="button" onClick={onDelete} data-testid="delete">
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete-image"
          />
        </button>
      </div>
    </li>
  )
}
export default CommentItem
