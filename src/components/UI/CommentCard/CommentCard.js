import React from 'react';
import { Popover } from 'antd';
import moment from 'moment';
import LikeDislike from './LikeDislike';
import Rating from '../Rating/Rating';

const CommendCard = (props) => {
  const { authorRating } = props;
  const reviewAuthorFirstName = props
    ? props.reviewAuthorFirstName
    : '';
  const reviewAuthorLastName = props
    ? props.reviewAuthorLastName
    : '';
  const authorName = reviewAuthorFirstName + ' ' + reviewAuthorLastName;
  const content = props ? props.singleReview.reviewContent : '';
  const reviewTitle = props ? props.singleReview.reviewTitle : '';
  const commentDate = props ? props.singleReview.regDate : '';
  const postTime = new Date(commentDate).getTime();
  // const authorAvatar = props ? props.reviewAuthorPic.url : '';
  const reviewRating = props ? props.singleReview.score : '';

  return (
    <div className="comment-area">
      <div className="comment-wrapper">
        <div className="comment-header">
          <div className="avatar-area">
            <div className="author-avatar">
              
            </div>
            <div className="author-info">
              <h3 className="author-name">{authorName}</h3>
              {authorRating && (
                <div className="author-rating">{authorRating}</div>
              )}
              <div className="comment-date">
                <Popover
                  placement="bottom"
                  content={moment(commentDate).format(
                    'dddd, MMMM Do YYYY, h:mm:ss a'
                  )}
                >
                  <span>작성일 - {moment(postTime).fromNow()}</span>
                </Popover>
              </div>
            </div>
          </div>
          <div className="rating-area">
            <LikeDislike />
          </div>
        </div>
        <div className="comment-body">
          <h4>{reviewTitle}</h4>
          <p>{content}</p>
        </div>
        <div className="comment-rating">
          {reviewRating && reviewRating.length !== 0
            ? reviewRating.map((propsRating, i) => {
                return (
                  <div className="rating-widget" key={i}>
                    <Rating
                      key={i}
                      rating={propsRating.rating}
                      ratingFieldName={propsRating.ratingFieldName}
                      type="individual"
                    />
                  </div>
                );
              })
            : ''}
        </div>
      </div>
    </div>
  );
}

export default CommendCard;