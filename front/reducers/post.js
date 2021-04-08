import shortId from 'shortid';
import faker from 'faker';
import produce from '../utils/produce';

export const initialState = {
	mainPosts: [],
	// 이미지 업로드 시, 이미지 경로를 저장할 배열
	imagePaths: [],
	hasMorePosts: true,
	loadPostsLoading: false, // 게시글 목록 조회 시도 중
	loadPostsDone: false,
	loadPostsError: null,
	addPostLoading: false, // 게시글 등록 시도 중
	addPostDone: false,
	addPostError: null,
	removePostLoading: false, // 게시글 삭제 시도 중
	removePostDone: false,
	removePostError: null,
	addCommentLoading: false, // 댓글 등록 시도 중
	addCommentDone: false,
	addCommentError: null,
	removeCommentLoading: false, // 댓글 삭제 시도 중
	removeCommentDone: false,
	removeCommentError: null,
};

export const generateDummyPost = (number) =>
	Array(number)
		.fill()
		.map(() => ({
			id: shortId.generate(),
			User: {
				id: shortId.generate(),
				nickname: faker.name.findName(),
			},
			content: faker.lorem.paragraph(),
			Images: [
				{
					src: faker.image.image(),
				},
			],
			Comments: [
				{
					User: {
						id: shortId.generate(),
						nickname: faker.name.findName(),
					},
					content: faker.lorem.sentence(),
				},
			],
		}));

const dummyPost = (data) => ({
	id: data.id,
	content: data.content,
	User: {
		id: 1,
		nickname: '제로초',
	},
	Images: [],
	Comments: [],
});

const dummyComment = (data) => ({
	id: shortId.generate(),
	content: data,
	User: {
		id: 1,
		nickname: '제로초',
	},
});

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';
export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';
export const REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAILURE = 'REMOVE_COMMENT_FAILURE';

export const addPostRequestAction = (data) => ({
	type: ADD_POST_REQUEST,
	data,
});

export const removePostRequestAction = (data) => ({
	type: REMOVE_POST_REQUEST,
	data,
});

export const addCommentRequestAction = (data) => ({
	type: ADD_COMMENT_REQUEST,
	data,
});

export const removeCommentRequestAction = (data) => ({
	type: REMOVE_COMMENT_REQUEST,
	data: data.id,
});

// reducer: 이전 상태를 액션을 통해 다음 상태로 만드는 것 (불변성을 지키면서)
// immer는 불변성을 지원한다. (immer를 사용하면 불변성을 아래에서 지키지 않아도 된다.)
// immer가 다음 상태를 불변성 있게 만든다.
// => 뒤는 return 키워드가 생략된 것.
const reducer = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case LOAD_POSTS_REQUEST:
				draft.loadPostsLoading = true;
				draft.loadPostsDone = false;
				draft.loadPostsError = null;
				break;
			case LOAD_POSTS_SUCCESS:
				draft.loadPostsLoading = false;
				draft.loadPostsDone = true;
				draft.mainPosts = action.data.concat(draft.mainPosts);
				draft.hasMorePosts = draft.mainPosts.length < 50;
				break;
			case LOAD_POSTS_FAILURE:
				draft.loadPostsLoading = false;
				draft.loadPostsError = action.error;
				break;
			case ADD_POST_REQUEST:
				draft.addPostLoading = true;
				draft.addPostDone = false;
				draft.addPostError = null;
				break;
			case ADD_POST_SUCCESS:
				// 새롭게 등록한 게시글이 위로 가도록 한다.
				draft.addPostLoading = false;
				draft.addPostDone = true;
				draft.mainPosts.unshift(dummyPost(action.data));
				break;
			case ADD_POST_FAILURE:
				draft.addPostLoading = false;
				draft.addPostError = action.error;
				break;
			case REMOVE_POST_REQUEST:
				draft.removePostLoading = true;
				draft.removePostDone = false;
				draft.removePostError = null;
				break;
			case REMOVE_POST_SUCCESS:
				draft.removePostLoading = false;
				draft.removePostDone = true;
				draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
				// const index = draft.mainPosts.findIndex((v) => v.id === action.data);
				// draft.users.splice(index, 1);
				break;
			case REMOVE_POST_FAILURE:
				draft.removePostLoading = false;
				draft.removePostError = action.error;
				break;
			case ADD_COMMENT_REQUEST:
				draft.addCommentLoading = true;
				draft.addCommentDone = false;
				draft.addCommentError = null;
				break;
			case ADD_COMMENT_SUCCESS: {
				const post = draft.mainPosts.find((v) => v.id === action.data.postId);
				post.Comments.unshift(dummyComment(action.data.content));
				draft.addCommentLoading = false;
				draft.addCommentDone = true;
				break;
			}
			case ADD_COMMENT_FAILURE:
				draft.addCommentLoading = false;
				draft.addCommentError = action.error;
				break;
			default:
				break;
		}
	});

export default reducer;
