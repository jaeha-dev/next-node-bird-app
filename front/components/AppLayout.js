import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import styled from 'styled-components';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';

// Style
const SearchInput = styled(Input.Search)`
	vertical-align: middle;
`;

function AppLayout({ children }) {
	// Redux를 사용하므로 삭제한다.
	// const [isLogin, setIsLogin] = useState(false);
	// const isLogin = useSelector((state) => state.user.isLogin);
	const { isLogin } = useSelector((state) => state.user);

	return (
		<div>
			<Menu mode="horizontal">
				<Menu.Item>
					<Link href="/">
						<a>노드버드</a>
					</Link>
				</Menu.Item>
				<Menu.Item>
					<Link href="/profile">
						<a>계정 프로필</a>
					</Link>
				</Menu.Item>
				<Menu.Item>
					{/* style을 직접 명시할 경우(인라인 스타일), 객체가 다르므로 리렌더링한다. (객체 === 객체는 항상 false이므로) */}
					{/* 이러한 경우에 styled-components를 사용한다. */}
					{/* <Input.Search enterButton style={{ verticalAlign: 'middle' }} /> */}
					<SearchInput enterButton/>
				</Menu.Item>
				<Menu.Item>
					<Link href="/register">
						<a>계정 등록</a>
					</Link>
				</Menu.Item>
			</Menu>
			{/* gutter: 컬럼 사이에 간격을 준다. */}
			<Row gutter={8}>
				{/* 데스크톱 화면에서 1개의 가로 줄에 3개의 세로 줄을 생성한다. */}
				{/* 모바일에서 24칸을 모두 차지하고, 그 이상에서는 6칸을 차지한다. */}
				{/* 모바일(xs), 태블릿(sm), 데스크톱(md) */}
				<Col xs={24} md={6}>
					{isLogin ? (
						// <UserProfile setIsLogin={setIsLogin} />
						<UserProfile/>
					) : (
						// <LoginForm setIsLogin={setIsLogin} />
						<LoginForm/>
					)}
				</Col>
				{/* 모바일에서 24칸을 모두 차지하고, 그 이상에서는 12칸을 차지한다. */}
				<Col xs={24} md={12}>
					{children}
				</Col>
				{/* 모바일에서 24칸을 모두 차지하고, 그 이상에서는 6칸을 차지한다. */}
				<Col xs={24} md={6}>
					{/* 새 창에서 열기는 보안 위협 문제로 noreferrer noopnener를 추가한다. */}
					<a
						href="https://inflearn.com"
						target="_blank"
						rel="noreferrer noopener"
					>
						Go to Inflearn
					</a>
				</Col>
			</Row>
		</div>
	);
}

// props로 전달 받는 children 데이터를 검사한다.
AppLayout.propTypes = {
	children: PropTypes.node.isRequired, // React의 node는 화면에 그릴 수 있는 것을 의미한다.
};

export default AppLayout;
