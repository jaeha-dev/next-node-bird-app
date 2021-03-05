import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from './../components/NicknameEditForm';
import FollowList from '../components/FollowList';

function Profile() {
	const followingList = [
		{ nickname: 'test1' },
		{ nickname: 'test2' },
		{ nickname: 'test3' },
	];
	const followerList = [
		{ nickname: 'test1' },
		{ nickname: 'test2' },
		{ nickname: 'test3' },
	];

	return (
		<>
			<Head>
				<meta charSet="uft-8"/>
				<title>Profile : Node Bird</title>
			</Head>
			<AppLayout>
				<NicknameEditForm/>
				<FollowList header="Following List" data={followingList}/>
				<FollowList header="Follower List" data={followerList}/>
			</AppLayout>
		</>
	);
}

export default Profile;
