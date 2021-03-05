import React, { useCallback, useState, useMemo } from 'react';
import Link from 'next/link';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
// import { PropTypes } from 'prop-types';
import useInput from './../hooks/useInput';
import { useDispatch } from 'react-redux';
import { loginAction } from './../reducers/index';

// Style
const ButtonWrapper = styled.div`
	margin-top: 10px;
`;

const FormWrapper = styled(Form)`
	padding: 10px;
`;

// function LoginForm({ setIsLogin }) {
function LoginForm() {
	const dispatch = useDispatch();
	const [id, onChangeId] = useInput('');
	const [password, onChangePassword] = useInput('');

	// const [id, setId] = useState('');
	// const [password, setPassword] = useState('');

	// // 함수를 캐싱하기 위해 useCallback 훅을 사용한다.
	// const onChangeId = useCallback(
	// 	(e) => {
	// 		setId(e.target.value);
	// 	},
	// 	[id],
	// );

	// const onChangePassword = useCallback(
	// 	(e) => {
	// 		setPassword(e.target.value);
	// 	},
	// 	[password],
	// );

	// 값을 캐싱하기 위해 useMemo 훅을 사용한다.
	const LabelStyle = useMemo(
		() => ({
			color: 'blue',
		}),
		[],
	);

	const onSubmitForm = useCallback(() => {
		// antd에서는 사용하지 않는다.
		// e.preventDefault();
		console.log(id, password);

		// setIsLogin(true);
		dispatch(loginAction({ id, password }));
	}, [id, password]);

	return (
		<FormWrapper onFinish={onSubmitForm}>
			<div>
				<label htmlFor="user-id" style={LabelStyle}>
					User ID
				</label>
				<Input
					name="user-id"
					value={id}
					onChange={onChangeId}
					required={true}
				/>
			</div>
			<div>
				<label htmlFor="user-password" style={LabelStyle}>
					Password
				</label>
				<Input
					name="user-password"
					type="password"
					value={password}
					onChange={onChangePassword}
					required={true}
				/>
			</div>
			{/* style을 직접 명시할 경우(인라인 스타일), 객체가 다르므로 리렌더링한다. (객체 === 객체는 항상 false이므로) */}
			{/* 이러한 경우에 styled-components를 사용한다. (또는 useMemo 훅) */}
			{/* 리렌더링은 return 부분에서 변경된 영역만 새로 그린다. */}
			{/* <div style={{ marginTop: 10 }}> */}
			<ButtonWrapper>
				<Button type="primary" htmlType="submit" loading={false}>
					Login
				</Button>
				<Link href="/register">
					<Button>Register</Button>
				</Link>
			</ButtonWrapper>
		</FormWrapper>
	);
}

// LoginForm.propTypes = {
// 	setIsLogin: PropTypes.func.isRequired,
// };

export default LoginForm;
