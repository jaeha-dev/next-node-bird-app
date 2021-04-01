import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import user from './user';
import post from './post';

// reducer: 이전 상태와 액션으로 다음 상태를 만드는 함수이다.
// combineReducers: reducer 함수를 합친다.
const rootReducer = combineReducers({
	// index reducer 함수를 추가한다.
	// SSR을 위해서 추가한다.
	index: (state = {}, action) => {
		switch (action.type) {
			case HYDRATE:
				console.log('HYDRATE', action);
				return {
					...state,
					...action.payload,
				};
			// TypeError: Cannot read property 'user' of undefined 에러가 나올 경우,
			default:
				return state;
		}
	},
	user,
	post,
});

export default rootReducer;
