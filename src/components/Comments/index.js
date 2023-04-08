import {Component} from 'react'
import {v4} from 'uuid'
import {formatDistanceToNow} from 'date-fns'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    count: 0,
    name: '',
    comment: '',
    commentsList: [],
  }

  onClickOfLikeButton = id => {
    this.setState(prevSate => ({
      commentsList: prevSate.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onAddComment = event => {
    event.preventDefault()
    const {name, comment} = this.state
    const initialBackgroundColorClassName = `initial ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: v4(),
      name,
      comment,
      date: formatDistanceToNow(new Date(), 'D:H:mm:ss'),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevSate => ({
      commentsList: [...prevSate.commentsList, newComment],
      name: '',
      comment: '',
      count: prevSate.count + 1,
    }))
  }

  onNameChange = event => {
    this.setState({name: event.target.value})
  }

  onCommentChange = event => {
    this.setState({comment: event.target.value})
  }

  deleteComment = id => {
    const {commentsList} = this.state
    const filteredDetails = commentsList.filter(
      eachComment => eachComment.id !== id,
    )
    this.setState({commentsList: filteredDetails})
    this.setState(prevSate => ({count: prevSate.count - 1}))
  }

  render() {
    const {count, name, comment, commentsList} = this.state
    console.log(commentsList.isLiked)
    return (
      <div className="app-container">
        <h1 className="title">Comments</h1>
        <div className="responsive-container">
          <form
            className="comments-form-container"
            onSubmit={this.onAddComment}
          >
            <p className="description">Say something about 4.0 Technologies</p>
            <input
              placeholder="Your Name"
              value={name}
              className="name-input"
              onChange={this.onNameChange}
            />
            <textarea
              placeholder="Your Comment"
              value={comment}
              className="comment-input"
              onChange={this.onCommentChange}
            />
            <button type="submit" className="button">
              Add Comment
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
          />
        </div>

        <ul className="comment-display-container">
          <hr className="separator " />
          <p className="count-value">
            <span className="count">{count}</span>Comments
          </p>
          <div className="comment-container">
            {commentsList.map(eachItem => (
              <CommentItem
                key={eachItem.id}
                commentDetails={eachItem}
                toggleIsLiked={this.onClickOfLikeButton}
                deleteComment={this.deleteComment}
              />
            ))}
          </div>
        </ul>
      </div>
    )
  }
}

export default Comments
