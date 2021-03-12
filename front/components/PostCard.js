import { Button, Card, Popover, Avatar } from 'antd';
import {
	RetweetOutlined,
	HeartOutlined,
	HeartTwoTone,
	MessageOutlined,
	EllipsisOutlined,
} from '@ant-design/icons';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import PostImages from './PostImages';

function PostCard({ post }) {
	const { me } = useSelector((state) => state.user);
	const id = me && me.id;
	// const id = me?.id; // 옵셔널 체이닝을 사용해도 된다.

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
				cover={post.Images[0] && <PostImages imapge={post.Images}/>}
				// 배열에 컴포넌트를 추가할 때 key 속성을 추가해야 한다.
				actions={[
					<RetweetOutlined key="retweet"/>,
					// 좋아요 버튼 분기
					like ? (
						<HeartTwoTone
							key="like"
							twoToneColor="#eb2f96"
							onClick={onToggleLike}
						/>
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
										<Button>Edit</Button>
										<Button type="danger">Remove</Button>
									</>
								)}
								<Button>Report</Button>
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
					description={post.content}
				/>
			</Card>
			{commentFormOpen && <div>댓글 폼</div>}
			{/* <CommentForm /> */}
			{/* <Comments /> */}
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
