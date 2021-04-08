import React, { useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
// import { PropTypes } from 'prop-types';
import useInput from '../hooks/useInput';
// import { loginAction } from './../reducers/index';
import { loginRequestAction } from '../reducers/user';

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
	const { loginLoading } = useSelector((state) => state.user);
	const [email, onChangeEmail] = useInput('');
	const [password, onChangePassword] = useInput('');

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
		dispatch(loginRequestAction({ email, password }));
	}, [email, password]);

	return (
		<FormWrapper onFinish={onSubmitForm}>
			<div>
				<label htmlFor="user-email" style={LabelStyle}>
					이메일
				</label>
				<Input name="user-email" type="email" value={email} onChange={onChangeEmail} required/>
			</div>
			<div>
				<label htmlFor="user-password" style={LabelStyle}>
					비밀번호
				</label>
				<Input
					name="user-password"
					type="password"
					value={password}
					onChange={onChangePassword}
					required
				/>
			</div>
			{/* style을 직접 명시할 경우(인라인 스타일), 객체가 다르므로 리렌더링한다. (객체 === 객체는 항상 false이므로) */}
			{/* 이러한 경우에 styled-components를 사용한다. (또는 useMemo 훅) */}
			{/* 리렌더링은 return 부분에서 변경된 영역만 새로 그린다. */}
			{/* <div style={{ marginTop: 10 }}> */}
			<ButtonWrapper>
				<Button type="primary" htmlType="submit" loading={loginLoading}>
					로그인
				</Button>
				<Link href="/register">
					<Button>계정 등록</Button>
				</Link>
			</ButtonWrapper>
		</FormWrapper>
	);
}

export default LoginForm;
