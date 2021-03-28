import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { addCommentRequestAction } from '../reducers/post';

function CommentForm({ post }) {
	const dispatch = useDispatch();
	const id = useSelector((state) => state.user.me?.id);
	const { addCommentLoading, addCommentDone } = useSelector(
		(state) => state.post,
	);
	const [commentText, onChangeCommentText, setCommentText] = useInput('');

	useEffect(() => {
		if (addCommentDone) {
			setCommentText('');
		}
	}, [addCommentDone]);

	const onSubmitComment = useCallback(() => {
		console.log(post.id, commentText);
		dispatch(
			addCommentRequestAction({
				content: commentText,
				postId: post.id,
				userId: id,
			}),
		);
	}, [commentText, id]);

	return (
		<Form onFinish={onSubmitComment}>
			<Form.Item style={{ position: 'relative', margin: 0 }}>
				<Input.TextArea
					value={commentText}
					onChange={onChangeCommentText}
					rows={4}
				/>
				<Button
					type="primary"
					htmlType="submit"
					style={{ position: 'absolute', right: 0, bottom: -40 }}
					loading={addCommentLoading}
				>
					등록
				</Button>
			</Form.Item>
		</Form>
	);
}

CommentForm.propTypes = {
	post: PropTypes.object.isRequired,
};

export default CommentForm;
