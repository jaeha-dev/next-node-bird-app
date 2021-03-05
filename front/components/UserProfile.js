import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../reducers';

// function UserProfile({ setIsLogin }) {
function UserProfile() {
	const dispatch = useDispatch();
	const onClickLogout = useCallback(() => {
		// setIsLogin(false);
		dispatch(logoutAction());
	}, []);

	return (
		<Card
			// JSX에서 배열을 사용할 때, key 속성을 반드시 사용한다.)
			actions={[
				<div key="tweet">
					Tweets:
					<br/>0
				</div>,
				<div key="followings">
					Followings:
					<br/>0
				</div>,
				<div key="followers">
					Followers:
					<br/>0
				</div>,
			]}
		>
			<Card.Meta avatar={<Avatar>Tweet</Avatar>} title="tweet"/>
			<Button onClick={onClickLogout}>Logout</Button>
		</Card>
	);
}

export default UserProfile;
