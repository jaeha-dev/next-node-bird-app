import React from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

function Profile() {
	const { me } = useSelector((state) => state.user);

	return (
		<>
			<Head>
				<meta charSet="uft-8"/>
				<title>Profile : Node Bird</title>
			</Head>
			<AppLayout>
				<NicknameEditForm/>
				<FollowList header="Following List" data={me.Followings}/>
				<FollowList header="Follower List" data={me.Followers}/>
			</AppLayout>
		</>
	);
}

export default Profile;
