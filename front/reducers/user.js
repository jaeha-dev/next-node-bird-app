export const initialState = {
	loginLoading: false, // 로그인 시도 중
	loginDone: false,
	loginError: null,
	logoutLoading: false, // 로그아웃 시도 중
	logoutDone: false,
	logoutError: null,
	registerLoading: false, // 계정 등록 시도 중
	registerDone: false,
	registerError: null,
	me: null,
	registerData: {},
	loginData: {},
};

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';
export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

const dummyUser = (data) => ({
	...data,
	nickname: 'test',
	id: 1,
	Posts: [],
	Followings: [],
	Followers: [],
});

// 동적 액션 생성 함수
export const loginRequestAction = (data) => ({
	type: LOGIN_REQUEST,
	data,
});
// Saga에서 put() 함수로 호출하므로(login 제너레이터 함수) 제외한다.
// export const loginSuccessAction = (data) => {
// 	return {
// 		type: LOGIN_SUCCESS,
// 		data,
// 	};
// };
// export const loginFailureAction = (data) => {
// 	return {
// 		type: LOGIN_FAILURE,
// 		data,
// 	};
// };

export const logoutRequestAction = () => ({
	type: LOGOUT_REQUEST,
});
// Saga에서 put() 함수로 호출하므로(logout 제너레이터 함수) 제외한다.
// export const logoutSuccessAction = () => {
// 	return {
// 		type: LOGOUT_SUCCESS,
// 	};
// };
// export const logoutFailureAction = () => {
// 	return {
// 		type: LOGOUT_FAILURE,
// 	};
// };

export const registerRequestAction = (data) => ({
	type: REGISTER_REQUEST,
	data,
});

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_REQUEST:
			return {
				...state,
				loginLoading: true,
				loginDone: false,
				loginError: null, // 이전에 로그인 실패한 경우, 에러를 초기화한다.
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				loginLoading: false,
				loginDone: true,
				me: dummyUser[action.data],
			};
		case LOGIN_FAILURE:
			return {
				...state,
				loginLoading: false,
				loginError: action.error,
			};
		case LOGOUT_REQUEST:
			return {
				...state,
				logoutLoading: true,
				logoutDone: false,
				logoutError: null,
			};
		case LOGOUT_SUCCESS:
			return {
				...state,
				logoutLoading: false,
				logoutDone: true,
				me: null,
			};
		case LOGOUT_FAILURE:
			return {
				...state,
				logoutLoading: false,
				logoutError: action.error,
			};
		case REGISTER_REQUEST:
			return {
				...state,
				registerLoading: true,
				registerDone: false,
				registerError: null,
			};
		case REGISTER_SUCCESS:
			return {
				...state,
				registerLoading: false,
				registerDone: true,
			};
		case REGISTER_FAILURE:
			return {
				...state,
				registerLoading: false,
				registerError: action.error,
			};
		default:
			return state;
	}
};

export default reducer;

// export const initialState = {
// 	isLogin: false,
// 	me: null,
// 	registerData: {},
// 	loginData: {},
// };

// const LOGIN = 'LOGIN';
// export const loginAction = (data) => {
// 	return {
// 		type: LOGIN,
// 		data,
// 	};
// };

// const LOGOUT = 'LOGOUT';
// export const logoutAction = () => {
// 	return {
// 		type: LOGOUT,
// 	};
// };

// const reducer = (state = initialState, action) => {
// 	switch (action.type) {
// 		case LOGIN:
// 			return {
// 				...state,
// 				isLogin: true,
// 				me: action.data,
// 			};
// 		case LOGOUT:
// 			return {
// 				...state,
// 				isLogin: false,
// 				me: null,
// 			};
// 		default:
// 			return state;
// 	}
// };

// export default reducer;
