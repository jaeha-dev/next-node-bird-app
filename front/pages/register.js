import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from 'antd';
import useInput from './../hooks/useInput';
import styled from 'styled-components';
import AppLayout from './../components/AppLayout';

// Style
const ErrorMessage = styled.div`
	color: red;
`;

function Register() {
	const [id, onChangeId] = useInput('');
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
		console.log(id, nickname, password);
	}, [password, passwordCheck, term]);

	return (
		<AppLayout>
			<Head>
				<meta charSet="uft-8"/>
				<title>Register : Node Bird</title>
			</Head>
			<Form onFinish={onSubmit}>
				<div>
					<label htmlFor="user-id">User ID</label>
					<br/>
					<Input
						name="user-id"
						value={id}
						required={true}
						onChange={onChangeId}
					/>
				</div>
				<div>
					<label htmlFor="user-nickname">Nickname</label>
					<br/>
					<Input
						name="user-nickname"
						value={nickname}
						required={true}
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
						required={true}
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
						required={true}
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
					<Button type="primary" htmlType="submit">
						Register
					</Button>
				</div>
			</Form>
		</AppLayout>
	);
}

export default Register;
