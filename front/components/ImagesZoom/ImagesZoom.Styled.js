import styled, { createGlobalStyle } from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

// styled.div 함수를 백틱으로 호출한다. (함수 호출은 괄호, 백틱으로 가능하다.)
// (Tagged Template Literal)
export const Overlay = styled.div`
	position: fixed;
	z-index: 5000;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
`;

export const Header = styled.header`
	height: 44px;
	background: white;
	position: relative;
	padding: 0;
	text-align: center;

	& h1 {
		margin: 0;
		font-size: 17px;
		color: #333;
		line-height: 44px;
	}

	& button {
		position: absolute;
		right: 0;
		top: 0;
		padding: 15px;
		line-height: 14px;
		cursor: pointer;
	}
`;

export const SlickWrapper = styled.div`
	height: calc(100% - 44px);
	background: #090909;
`;

export const ImageWrapper = styled.div`
	padding: 32px;
	text-align: center;

	& img {
		margin: 0 auto;
		max-height: 750px;
	}
`;

// 1 / 3번째 이미지 등을 표시한다.
export const Indicator = styled.div`
	text-align: center;

	& > div {
		width: 75px;
		height: 30px;
		line-height: 30px;
		border-radius: 15px;
		background: #313131;
		display: inline-block;
		text-align: center;
		color: white;
		font-size: 15px;
	}
`;

export const CloseButton = styled(CloseOutlined)`
	position: absolute;
	right: 0;
	top: 0;
	padding: 15px;
	line-height: 14px;
	cursor: pointer;
`;

// react-slick의 기본 CSS를 수정한다.
export const Global = createGlobalStyle`
  .slick-slide {
    display: inline-block;
  }
  .ant-card-cover {
    transform: none !important;
  }
`;