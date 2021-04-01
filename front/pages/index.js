import React from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

function Home() {
	const { me } = useSelector((state) => state.user);
	const { mainPosts } = useSelector((state) => state.post);

	return (
		<>
			<Head>
				<meta charSet="uft-8"/>
				<title>Home : Node Bird</title>
			</Head>
			<AppLayout>
				{me && <PostForm/>}
				{/* index는 절대 변경되지 않을 경우에만 사용하고 아래는 게시글의 고유 ID를 사용한다.  */}
				{mainPosts.map((post) => (
					<PostCard key={post.id} post={post}/>
				))}
			</AppLayout>
		</>
	);
}

export default Home;
