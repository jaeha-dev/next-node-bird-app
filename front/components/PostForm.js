import React, { useCallback, useRef, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addPostRequestAction } from '../reducers/post';
import useInput from '../hooks/useInput';

function PostForm() {
	const dispatch = useDispatch();
	const { imagePaths, addPostLoading, addPostDone } = useSelector((state) => state.post);
	const [text, onChangeText, setText] = useInput('');

	useEffect(() => {
		// addPostDone 상태가 true일 때만 값을 초기화한다.
		if (addPostDone) {
			setText('');
		}
	}, [addPostDone]);

	const imageInput = useRef(); // DOM에 접근하기 위해 useRef 훅을 사용한다.
	const onClickImageUpload = useCallback(() => {
		imageInput.current.click();
	}, [imageInput.current]);

	const onSubmit = useCallback(() => {
		dispatch(addPostRequestAction(text));
		// 백엔드에서 오류가 발생할 때 게시글을 초기화하면 안되므로 삭제한다.
		// setText('');
	}, [text]);

	return (
		<Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
			<Input.TextArea
				value={text}
				onChange={onChangeText}
				maxLength={100}
				placeholder="게시글 등록"
			/>
			<div>
				<input type="file" multiple hidden ref={imageInput}/>
				<Button onClick={onClickImageUpload}>이미지</Button>
				<Button
					type="primary"
					style={{ float: 'right' }}
					htmlType="submit"
					loading={addPostLoading}
				>
					등록
				</Button>
			</div>
			<div>
				{imagePaths.map((path) => (
					<div key={path} style={{ display: 'inline-block' }}>
						<img src={path} style={{ width: '200px' }} alt={path}/>
						<div>
							<Button>삭제</Button>
						</div>
					</div>
				))}
			</div>
		</Form>
	);
}

export default PostForm;
