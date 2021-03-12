import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './../reducers';

const configureStore = () => {
	// 배열에는 saga, thunk 등을 추가해야 한다.
	const middlewares = [];
	// Redux의 기능을 확장한다는 의미에서 enhancer라 명명하였다.
	const enhancer =
		process.env.NODE_ENV === 'production'
			? compose(applyMiddleware(...middlewares))
			: // Redux DevTools와 연동한다.
				// 개발 모드일 때 상태들의 History가 기록된다. (보안상 취약하므로 개발 모드일 때만 사용한다.)
			composeWithDevTools(applyMiddleware(...middlewares));
	const store = createStore(rootReducer, enhancer);

	return store;
};

const wrapper = createWrapper(configureStore, {
	// 옵션을 지정한다. (development 모드일 때 debug를 활성화(true)한다.)
	// Redux에 관한 상세한 설명을 제공해준다.
	debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
