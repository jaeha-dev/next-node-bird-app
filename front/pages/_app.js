/**
 * _app.js: 모든 웹 페이지의 공통 부분을 처리한다.
 * (Component는 index.js, profile.js, register.js, ...)
 */
import React from 'react';
import Head from 'next/head';
import { PropTypes } from 'prop-types';
import 'antd/dist/antd.css';
import wrapper from './../store/configureStore';

function App({ Component }) {
	return (
		<>
			{/* 참고로 react-redux를 사용할 때 프로바이더를 사용한다. */}
			{/* next-redux-wrapper 6 버전에서 기본적으로 지원하므로 프로바이더로 감싸지 않는다. */}
			{/* <Provider store={store} */}
			<Head>
				<meta charSet="uft-8"/>
				<title>Node Bird</title>
			</Head>
			<div>공통 메뉴</div>
			<Component/>
		</>
	);
}

App.propTypes = {
	Component: PropTypes.elementType.isRequired,
};

// export default App;
// hoc로 감싼다.
export default wrapper.withRedux(App);
