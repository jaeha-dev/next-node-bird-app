import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POSTS_REQUEST } from '../reducers/post';

function Home() {
	const dispatch = useDispatch();
	const { me } = useSelector((state) => state.user);
	const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);

	useEffect(() => {
		dispatch({
			type: LOAD_POSTS_REQUEST,
		});
	}, []);

	useEffect(() => {
		function onScroll() {
			if (
				// scrollY: 얼마나 스크롤을 내렸는지
				// clientHeight: 웹 브라우저에서 화면 높이
				// scrollHeight: 전체 높이
				// 아래에서 300 픽셀보다 스크롤을 더 넘겼을 때 게시글을 더 불러온다.
				window.scrollY + document.documentElement.clientHeight >
				document.documentElement.scrollHeight - 300
			) {
				// 불러오는 중일 때 게시글을 더 불러오지 않도록 한다. (스로틀을 사용해도 게시글 요청을 보내기 때문이다.)
				// react-virtualized을 사용해서 미리 수백 개의 게시글을 메모리에 담아두고
				// 몇 개의 게시글만 화면에 보여주고 화면에 보이지 않는 게시글은 HTML 요소를 지우고 다시 메모리에 담아둘 수도 있다.
				// (인스타그램 방식)
				if (hasMorePosts && !loadPostsLoading) {
					dispatch({
						type: LOAD_POSTS_REQUEST,
						data: mainPosts[mainPosts.length - 1].id,
					});
				}
			}
		}

		window.addEventListener('scroll', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, [mainPosts, hasMorePosts, loadPostsLoading]);

	return (
		<AppLayout>
			{me && <PostForm/>}
			{/* index는 절대 변경되지 않을 경우에만 사용하고 아래는 게시글의 고유 ID를 사용한다.  */}
			{mainPosts.map((c) => (
				<PostCard key={c.id} post={c}/>
			))}
		</AppLayout>
	);
}

export default Home;
