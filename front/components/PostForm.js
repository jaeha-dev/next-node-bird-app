import React, { useState, useCallback, useRef } from 'react';
import { Button, Form, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addPostAction } from '../reducers/post';

function PostForm() {
	const dispatch = useDispatch();
	const imageInput = useRef(); // DOM에 접근하기 위해 useRef 훅을 사용한다.
	const { imagePaths } = useSelector((state) => state.post);
	const [text, setText] = useState('');

	const onChangeText = useCallback((e) => {
		setText(e.target.value);
	}, []);

	const onClickImageUpload = useCallback(() => {
		imageInput.current.click();
	}, [imageInput.current]);

	const onSubmit = useCallback(() => {
		dispatch(addPostAction);
		setText('');
	}, []);

	return (
		<Form
			style={{ margin: '10px 0 20px' }}
			encType="multipart/form-data"
			onFinish={onSubmit}
		>
			<Input.TextArea
				value={text}
				onChange={onChangeText}
				maxLength={100}
				placeholder="?"
			/>
			<div>
				<input type="file" multiple hidden ref={imageInput}/>
				<Button onClick={onClickImageUpload}>Upload image</Button>
				<Button type="primary" style={{ float: 'right' }} htmlType="submit">
					Tweet
				</Button>
			</div>
			<div>
				{imagePaths.map((path) => (
					<div key={path} style={{ display: 'inline-block' }}>
						<img src={path} style={{ width: '200px' }} alt={path}/>
						<div>
							<Button>Remove</Button>
						</div>
					</div>
				))}
			</div>
		</Form>
	);
}

export default PostForm;
