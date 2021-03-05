import { createWrapper } from 'next-redux-wrapper';
import { createStore } from 'redux';
import rootReducer from './../reducers';

const configureStore = () => {
	const store = createStore(rootReducer);

	return store;
};

const wrapper = createWrapper(configureStore, {
	// 옵션을 지정한다. (development 모드일 때 debug를 활성화(true)한다.)
	// Redux에 관한 상세한 설명을 제공해준다.
	debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
