export const initialState = {
	isLogin: false,
	me: null,
	registerData: {},
	loginData: {},
};

const LOGIN = 'LOGIN';
export const loginAction = (data) => {
	return {
		type: LOGIN,
		data,
	};
};

const LOGOUT = 'LOGOUT';
export const logoutAction = () => {
	return {
		type: LOGOUT,
	};
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				isLogin: true,
				me: action.data,
			};
		case LOGOUT:
			return {
				...state,
				isLogin: false,
				me: null,
			};
		default:
			return state;
	}
};

export default reducer;
