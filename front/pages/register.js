import React, { useCallback, useState, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
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
	const { registerLoading, me } = useSelector((state) => state.user);
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
		setTermError(false);
	}, []);

	// 로그인 상태일 때 메인 페이지로 이동한다.
	useEffect(() => {
		if (me) {
			Router.push('/');
		}
	}, [me && me.id]);

	// 계정 등록 시, 비밀번호 일치 여부와 약관 동의 여부를 확인한다.
	const onSubmit = useCallback(() => {
		if (password !== passwordCheck) {
			return setPasswordError(true);
		}
		if (!term) {
			return setTermError(true);
		}

		return dispatch(registerRequestAction({ email, nickname, password }));
	}, [email, password, passwordCheck, term]);

	return (
		<AppLayout>
			<Head>
				<meta charSet="uft-8"/>
				<title>계정 등록 : Node Bird</title>
			</Head>
			<Form onFinish={onSubmit}>
				<div>
					<label htmlFor="user-email">이메일</label>
					<br/>
					<Input name="user-email" type="email" value={email} required onChange={onChangeEmail}/>
				</div>
				<div>
					<label htmlFor="user-nickname">닉네임</label>
					<br/>
					<Input name="user-nickname" value={nickname} required onChange={onChangeNickname}/>
				</div>
				<div>
					<label htmlFor="user-password">비밀번호</label>
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
					<label htmlFor="user-password-check">비밀번호 확인</label>
					<br/>
					<Input
						name="user-password-check"
						type="password"
						value={passwordCheck}
						required
						onChange={onChangePasswordCheck}
					/>
					{passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
				</div>
				<div>
					<Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
						이용 약관
					</Checkbox>
					{termError && <ErrorMessage>이용 약관을 동의해야 합니다.</ErrorMessage>}
				</div>
				<div style={{ marginTop: 10 }}>
					{/* submit 타입의 버튼은 onFinish 이벤트를 호출한다. */}
					<Button type="primary" htmlType="submit" loading={registerLoading}>
						계정 등록
					</Button>
				</div>
			</Form>
		</AppLayout>
	);
}

export default Register;
