import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from 'antd';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import AppLayout from '../components/AppLayout';
import { registerRequestAction } from '../reducers/user';

// Style
const ErrorMessage = styled.div`
  color: red;
`;

function Register() {
	const dispatch = useDispatch();
	const { registerLoading } = useSelector((state) => state.user);
	const [email, onChangeEmail] = useInput('');
	const [nickname, onChangeNickname] = useInput('');
	const [password, onChangePassword] = useInput('');

	// 비밀번호 일치 여부를 확인한다.
	const [passwordCheck, setPasswordCheck] = useState('');
	const [passwordError, setPasswordError] = useState(false);
	const onChangePasswordCheck = useCallback(
		(e) => {
			setPasswordCheck(e.target.value);
			setPasswordError(e.target.value !== password);
		},
		[password],
	);

	// 약관 동의 여부를 확인한다.
	const [term, setTerm] = useState('');
	const [termError, setTermError] = useState(false);
	const onChangeTerm = useCallback((e) => {
		setTerm(e.target.checked);
		// setTermError(!termError);
	});

	// 계정 등록 시, 비밀번호 일치 여부와 약관 동의 여부를 확인한다.
	const onSubmit = useCallback(() => {
		if (password !== passwordCheck) {
			return setPasswordError(true);
		}
		if (!term) {
			return setTermError(true);
		}
		console.log(email, nickname, password);
		dispatch(registerRequestAction({ email, nickname, password }));
	}, [email, password, passwordCheck, term]);

	return (
		<AppLayout>
			<Head>
				<meta charSet="uft-8"/>
				<title>Register : Node Bird</title>
			</Head>
			<Form onFinish={onSubmit}>
				<div>
					<label htmlFor="user-email">User Email</label>
					<br/>
					<Input
						name="user-email"
						type="email"
						value={email}
						required
						onChange={onChangeEmail}
					/>
				</div>
				<div>
					<label htmlFor="user-nickname">Nickname</label>
					<br/>
					<Input
						name="user-nickname"
						value={nickname}
						required
						onChange={onChangeNickname}
					/>
				</div>
				<div>
					<label htmlFor="user-password">Password</label>
					<br/>
					<Input
						name="user-password"
						type="password"
						value={password}
						required
						onChange={onChangePassword}
					/>
				</div>
				<div>
					<label htmlFor="user-password-check">Password Check</label>
					<br/>
					<Input
						name="user-password-check"
						type="password"
						value={passwordCheck}
						required
						onChange={onChangePasswordCheck}
					/>
					{passwordError && <ErrorMessage>Check password!</ErrorMessage>}
				</div>
				<div>
					<Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
						Check term
					</Checkbox>
					{termError && <ErrorMessage>Check term!</ErrorMessage>}
				</div>
				<div style={{ marginTop: 10 }}>
					{/* submit 타입의 버튼은 onFinish 이벤트를 호출한다. */}
					<Button type="primary" htmlType="submit" loading={registerLoading}>
						Register
					</Button>
				</div>
			</Form>
		</AppLayout>
	);
}

export default Register;
