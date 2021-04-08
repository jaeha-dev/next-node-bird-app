import React from 'react';
import Head from 'next/head';
import { PropTypes } from 'prop-types';
import withReduxSaga from 'next-redux-saga';
import 'antd/dist/antd.css';
import wrapper from '../store/configureStore';

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
			<Component/>
		</>
	);
}

App.propTypes = {
	Component: PropTypes.elementType.isRequired,
};

export function reportWebVitals(metric) {
	console.log(metric);
}

// hoc로 감싼다.
// export default App;
// export default wrapper.withRedux(App);
export default wrapper.withRedux(withReduxSaga(App));
