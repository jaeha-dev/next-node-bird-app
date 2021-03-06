import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';

function UserProfile() {
	const dispatch = useDispatch();
	const { me, logoutLoading } = useSelector((state) => state.user);
	const onClickLogout = useCallback(() => {
		dispatch(logoutRequestAction());
	}, []);

	return (
		<Card
			// JSX에서 배열을 사용할 때, key 속성을 반드시 사용한다.)
			actions={[
				<div key="tweet">
					게시글:
					<br/>
					{me.Posts.length}
				</div>,
				<div key="followings">
					팔로잉:
					<br/>
					{me.Followings.length}
				</div>,
				<div key="followers">
					팔로워:
					<br/>
					{me.Followers.length}
				</div>,
			]}
		>
			<Card.Meta avatar={<Avatar>{me.nickname[0]}</Avatar>} title={me.nickname}/>
			<Button onClick={onClickLogout} loading={logoutLoading}>
				로그아웃
			</Button>
		</Card>
	);
}

export default UserProfile;
