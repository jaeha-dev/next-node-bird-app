import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import {
	Overlay,
	Global,
	Header,
	CloseButton,
	SlickWrapper,
	ImageWrapper,
	Indicator,
} from './ImagesZoom.Styled';

function ImagesZoom({ images, onClose }) {
	const [currentSlide, setCurrentSlide] = useState(0);

	return (
		<Overlay>
			<Global/>
			<Header>
				<h1>상세 이미지</h1>
				<CloseButton onClick={onClose}>X</CloseButton>
			</Header>
			{/* Image carousel */}
			<SlickWrapper>
				<div>
					<Slick
						initialSide={0}
						afterChange={(slide) => setCurrentSlide(slide)}
						infinite
						arrows={false}
						slidesToShow={1}
						slidesToScroll={1}
					>
						{images.map((v) => (
							<ImageWrapper key={v.src}>
								<img src={v.src} alt={v.src}/>
							</ImageWrapper>
						))}
					</Slick>
					<Indicator>
						<div>
							{currentSlide + 1} / {images.length}
						</div>
					</Indicator>
				</div>
			</SlickWrapper>
		</Overlay>
	);
}

ImagesZoom.propTypes = {
	images: PropTypes.arrayOf(
		PropTypes.shape({
			src: PropTypes.string,
		}),
	).isRequired,
	onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
