import React, { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from 'antd';
import useInput from '../hooks/useInput';
import { changeNicknameRequestAction } from '../reducers/user';

function NicknameEditForm() {
	const dispatch = useDispatch();
	const { me } = useSelector((state) => state.user);
	const [nickname, onChangeNickname] = useInput(me?.nickname || '');

	const onSubmit = useCallback(() => {
		dispatch(changeNicknameRequestAction(nickname));
	}, [nickname]);

	const style = useMemo(
		() => ({
			marginButton: '20px',
			border: '1px solid #d9d9d9',
			padding: '20px',
		}),
		[],
	);

	return (
		<Form style={style} onFinish={onSubmit}>
			<Input.Search
				value={nickname}
				onChange={onChangeNickname}
				addonBefore="닉네임"
				enterButton="수정"
			/>
		</Form>
	);
}

export default NicknameEditForm;
