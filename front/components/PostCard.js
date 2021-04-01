import { Button, Card, Popover, Avatar, List, Comment } from 'antd';
import {
	RetweetOutlined,
	HeartOutlined,
	HeartTwoTone,
	MessageOutlined,
	EllipsisOutlined,
} from '@ant-design/icons';
import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import { removePostRequestAction } from '../reducers/post';

function PostCard({ post }) {
	const dispatch = useDispatch();
	const { me } = useSelector((state) => state.user);
	const { removePostLoding } = useSelector((state) => state.post);
	const id = me && me.id;
	// const id = me?.id; // 옵셔널 체이닝을 사용해도 된다.

	const onRemovePost = useCallback(() => {
		dispatch(removePostRequestAction({ post }));
	}, [post]);

	const [like, setLike] = useState(false);
	const onToggleLike = useCallback(() => {
		setLike((prev) => !prev);
	}, []);

	const [commentFormOpen, setCommentFormOpen] = useState(false);
	const onToggleComment = useCallback(() => {
		setCommentFormOpen((prev) => !prev);
	}, []);

	return (
		<div style={{ marginBottom: 20 }}>
			<Card
				cover={post.Images[0] && <PostImages images={post.Images}/>}
				// 배열에 컴포넌트를 추가할 때 key 속성을 추가해야 한다.
				actions={[
					<RetweetOutlined key="retweet"/>,
					// 좋아요 버튼 분기
					like ? (
						<HeartTwoTone key="like" twoToneColor="#eb2f96" onClick={onToggleLike}/>
					) : (
						<HeartOutlined key="like" onClick={onToggleLike}/>
					),
					<MessageOutlined key="comment" onClick={onToggleComment}/>,
					// 더보기
					<Popover
						key="more"
						content={
							<Button.Group>
								{id && post.User.id === id && (
									<>
										<Button>수정</Button>
										<Button type="danger" loading={removePostLoding} onClick={onRemovePost}>
											삭제
										</Button>
									</>
								)}
								<Button>신고</Button>
							</Button.Group>
						}
					>
						<EllipsisOutlined/>
					</Popover>,
				]}
			>
				<Card.Meta
					avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
					title={post.User.nickname}
					description={<PostCardContent postContent={post.content}/>}
				/>
			</Card>
			{commentFormOpen && (
				<div>
					<CommentForm post={post}/>
					<List
						header={`${post.Comments.length}개의 댓글`}
						itemLayout="horizontal"
						dataSource={post.Comments}
						renderItem={(item) => (
							<li>
								<Comment
									author={item.User.nickname}
									avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
									content={item.content}
								/>
							</li>
						)}
					/>
				</div>
			)}
		</div>
	);
}

PostCard.propTypes = {
	post: PropTypes.shape({
		id: PropTypes.number,
		User: PropTypes.object,
		content: PropTypes.string,
		createdAt: PropTypes.object,
		Comments: PropTypes.arrayOf(PropTypes.object),
		Images: PropTypes.arrayOf(PropTypes.object),
	}).isRequired,
};

export default PostCard;
